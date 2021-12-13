const MINUTES_IN_HOUR = 60;

class DefaultFormater {
    deadlineDateToFormat(deadlineDate) {
        //10.10.2021, 10:00:00 => 10/10/2021 10:00:00

        let resultDeadlineDateFormat = deadlineDate.toLocaleString().replace(/\./g, '/');
        resultDeadlineDateFormat = resultDeadlineDateFormat.replace(',', '');

        return resultDeadlineDateFormat;
    }

    timeToHoursFormat(timeInMinutes) {
        //84m => 1h 24m => 1 + 0.24 => 1.24
        const timeHours = Math.floor(timeInMinutes / MINUTES_IN_HOUR);
        const leadTimeInMinutes = timeInMinutes % MINUTES_IN_HOUR;

        const timeInHoursWithMinutes = timeHours + (leadTimeInMinutes / 100);
        return timeInHoursWithMinutes;
    }
}

module.exports = DefaultFormater;