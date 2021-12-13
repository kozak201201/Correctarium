const MINUTES_IN_HOUR = 60;
const SATURDAY_INDEX = 6;
const SUNDAY_INDEX = 0;

class TaskerHelper {
    startDateInMinutes(startDate) {
        const startDateHoursInMinutes = startDate.getHours() * MINUTES_IN_HOUR;
        const startDateInMinutes = startDateHoursInMinutes + startDate.getMinutes();
        return startDateInMinutes;
    }

    deadlineDateCalculateHelper(startDate, deadlineDays, startWorkDayInHours, finishWorkDayInHours) {
        let finishDate = new Date(startDate)
        let finishDateIncludeStartDay = startDate.getDate() + deadlineDays;

        finishDate.setDate(finishDateIncludeStartDay);

        let weekends = this.numberOfWeekends(startDate, finishDate);

        if (weekends !== 0) {
            startDate = new Date(finishDate);

            if (startDate.getDay() === SATURDAY_INDEX) {
                startDate.setDate(startDate.getDate() + 2);
                weekends--;
            } else if (startDate.getDay() === SUNDAY_INDEX) {
                startDate.setDate(startDate.getDate() + 1);
                weekends--;
            }

            finishDate.setDate(startDate.getDate() + weekends);
            return this.deadlineDateCalculateHelper(startDate, weekends, startWorkDayInHours, finishWorkDayInHours);
        } else {
            return finishDate;
        }
    }

    deadlineDateTimeCalculateHelper(startDate, deadlineLeadTimeInMinutes, startWorkDayInHours, finishWorkDayInHours) {
        const workDayHours = finishWorkDayInHours - startWorkDayInHours;

        let deadlineTimeHours = deadlineLeadTimeInMinutes / MINUTES_IN_HOUR;
        let minutesLeft = deadlineLeadTimeInMinutes % MINUTES_IN_HOUR;
        let workDayCount = deadlineTimeHours / workDayHours;
        let workHoursCount = deadlineTimeHours % workDayHours;

        let deadlineDate = this.deadlineDateCalculateHelper(startDate, workDayCount, startWorkDayInHours, finishWorkDayInHours);
        deadlineDate.setHours(startWorkDayInHours + workHoursCount);
        deadlineDate.setMinutes(minutesLeft)

        return deadlineDate;
    }

    changeDateToStartDay(startDate, daysToAdd = 0, startWorkDayInHours) {
        startDate.setDate(startDate.getDate() + daysToAdd);
        startDate.setHours(startWorkDayInHours);
        startDate.setMinutes(0);
    }

    fileFactor(value, mimeType, fileFactorMap) {

        if (!fileFactorMap.has(mimeType)) {
            throw new Error(`File factor map does not have this type`);
        }

        const fileFactorValue = value * fileFactorMap.get(mimeType);
        value += fileFactorValue;

        return value;
    }

    numberOfWeekends(startDate, finishDate) {
        const days = 1 + Math.round((finishDate.getTime() - startDate.getTime()) / ( 24 * 3600 * 1000 ));
        const sundays = Math.floor((days + (startDate.getDay() + 6) % 7) / 7);
        return 2 * sundays + (finishDate.getDay() === SATURDAY_INDEX) - (startDate.getDay() === SUNDAY_INDEX);
    }
}

module.exports = TaskerHelper;