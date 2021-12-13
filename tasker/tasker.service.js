const TaskerHelper = require('./tasker-helper');
const DefaultFormatter = require('../formater/default-formater');

const MINUTES_IN_HOUR = 60;
const MINIMUM_DEADLINE_MINUTES = 60;
const START_WORK_DAY = 10;
const FINISH_WORK_DAY = 19;
const DEADLINE_FACTOR_IN_MINUTES = 30
const SATURDAY_INDEX = 6;
const SUNDAY_INDEX = 0;

class TaskerService {

    #taskerHelper
    #formatter
    #fileFactorMap
    #pricePerWordMap
    #wordsPerHourMap

    constructor() {
        this.#taskerHelper = new TaskerHelper();
        this.#formatter = new DefaultFormatter();
        this.fileFactorMap = new Map();
        this.pricePerWordMap = new Map();
        this.wordsPerHourMap = new Map();
    }

    useTaskToText(countOfWords, language, mimeType, startDate=new Date()) {
        const price = this.priceCalculate(countOfWords, language, mimeType);
        const timeInMinutes = this.leadTimeCalculate(countOfWords, language, mimeType);
        const deadlineDate = this.deadlineDateCalculate(startDate, timeInMinutes);
        const deadlineInUnix = deadlineDate.getTime();


        const timeInHoursWithMinutes = this.formatter.timeToHoursFormat(timeInMinutes)
        const deadlineDateToFormat = this.formatter.deadlineDateToFormat(deadlineDate);

        return {price, time: timeInHoursWithMinutes, deadline: deadlineInUnix, deadline_date: deadlineDateToFormat};
    }

    priceCalculate(countOfWords, language, mimeType) {

        if (!this.pricePerWordMap.has(language)) {
            throw new Error(`This language doesn't support`);
        }

        let pricePerWordObj = this.pricePerWordMap.get(language);

        let cost = countOfWords * pricePerWordObj.pricePerWord;
        cost = this.#taskerHelper.fileFactor(cost, mimeType, this.fileFactorMap);

        let minimumPrice = pricePerWordObj.minimumPrice;

        if (cost < minimumPrice) {
            cost = minimumPrice;
        }

        cost = Math.ceil(cost * 100) / 100;
        return cost;
    }

    leadTimeCalculate(countOfWords, language, mimeType) {

        if (!this.wordsPerHourMap.has(language)) {
            throw new Error(`Language ${language} doesn't support`);
        }

        let wordsPerHour = this.wordsPerHourMap.get(language);
        let leadTime = countOfWords / (wordsPerHour / MINUTES_IN_HOUR);

        leadTime = this.#taskerHelper.fileFactor(leadTime, mimeType, this.fileFactorMap);
        leadTime = Math.ceil(leadTime);

        if (leadTime < MINUTES_IN_HOUR) {
            leadTime = MINUTES_IN_HOUR;
        }

        return leadTime;
    }

    deadlineDateCalculate(startDate, leadTime) {
        startDate = new Date(startDate);
        startDate.setSeconds(0);

        let deadlineLeadTimeInMinutes = leadTime + DEADLINE_FACTOR_IN_MINUTES;

        if (deadlineLeadTimeInMinutes < MINUTES_IN_HOUR) {
            deadlineLeadTimeInMinutes = MINIMUM_DEADLINE_MINUTES;
        }

        let currentDayIndex = startDate.getDay();

        if (currentDayIndex !== SATURDAY_INDEX && currentDayIndex !== SUNDAY_INDEX) {
            let nextDayIndex = currentDayIndex + 1;

            if (startDate.getHours() >= FINISH_WORK_DAY) {

                if (nextDayIndex === SATURDAY_INDEX) {
                    this.#taskerHelper.changeDateToStartDay(startDate, 3, START_WORK_DAY);
                } else {
                    this.#taskerHelper.changeDateToStartDay(startDate, 1, START_WORK_DAY);
                }

            } else {

                if (startDate.getHours() < START_WORK_DAY) {
                    this.#taskerHelper.changeDateToStartDay(startDate, 0, START_WORK_DAY);
                }

                const finishWorkDayInMinutes = FINISH_WORK_DAY * MINUTES_IN_HOUR;
                let timeLeft = finishWorkDayInMinutes - this.#taskerHelper.startDateInMinutes(startDate);

                if (deadlineLeadTimeInMinutes > timeLeft) {
                    deadlineLeadTimeInMinutes -=  timeLeft;

                    if (nextDayIndex === SATURDAY_INDEX) {
                        this.#taskerHelper.changeDateToStartDay(startDate, 3, START_WORK_DAY);
                    } else {
                        this.#taskerHelper.changeDateToStartDay(startDate, 1, START_WORK_DAY);
                    }

                    return this.#taskerHelper.deadlineDateTimeCalculateHelper(startDate,
                        deadlineLeadTimeInMinutes,
                        START_WORK_DAY,
                        FINISH_WORK_DAY);
                } else {
                    let finishDate = new Date(startDate);
                    finishDate.setMinutes(startDate.getMinutes() + deadlineLeadTimeInMinutes);
                    return finishDate;
                }
            }
            return this.#taskerHelper.deadlineDateTimeCalculateHelper(startDate,
                deadlineLeadTimeInMinutes,
                START_WORK_DAY,
                FINISH_WORK_DAY);
        } else {

            if (currentDayIndex === SATURDAY_INDEX) {
                this.#taskerHelper.changeDateToStartDay(startDate, 2, START_WORK_DAY);
            } else {
                this.#taskerHelper.changeDateToStartDay(startDate, 1, START_WORK_DAY);
            }

            return this.#taskerHelper.deadlineDateTimeCalculateHelper(startDate,
                deadlineLeadTimeInMinutes,
                START_WORK_DAY,
                FINISH_WORK_DAY);
        }
    }

    set fileFactorMap(fileFactorMap) {
        if (fileFactorMap === null) {
            throw new Error(`you can't set null or undefined value`)
        }
        this.#fileFactorMap = fileFactorMap;
    }

    get fileFactorMap() {
        return this.#fileFactorMap;
    }

    set pricePerWordMap(pricePerWordMap) {
        if (pricePerWordMap === null) {
            throw new Error(`you can't set null or undefined value`)
        }

        this.#pricePerWordMap = pricePerWordMap;
    }

    get pricePerWordMap() {
        return this.#pricePerWordMap;
    }

    set wordsPerHourMap(wordsPerHourMap) {
        if (wordsPerHourMap === null) {
            throw new Error(`you can't set null or undefined value`)
        }

        this.#wordsPerHourMap = wordsPerHourMap;
    }

    get wordsPerHourMap() {
        return this.#wordsPerHourMap;
    }

    set formatter(formatter) {
        if (formatter == null) {
            throw new Error(`you can't set null or undefined value`)
        }

        this.#formatter = formatter
    }

    get formatter() {
        return this.#formatter;
    }
}

module.exports = TaskerService;