function createEmployeeRecord(array) {
    let employeeObject = {}
    employeeObject.firstName = array[0]
    employeeObject.familyName = array[1]
    employeeObject.title = array[2]
    employeeObject.payPerHour = array[3]
    employeeObject.timeInEvents = []
    employeeObject.timeOutEvents = []
    return employeeObject
}

function createEmployeeRecords(arrayOfArrays) {
    const employeeArrayOfObjects = arrayOfArrays.map(createEmployeeRecord)
    return employeeArrayOfObjects
}

function createTimeInEvent(employeeObject, timeInString) {
    const timeInObject = {}
    timeInObject.type = "TimeIn"
    timeInObject.date = timeInString.split(" ")[0]
    timeInObject.hour = parseInt(timeInString.split(" ")[1], 10)
    employeeObject.timeInEvents.push(timeInObject)
    return employeeObject;
}

function createTimeOutEvent(employeeObject, timeOutString) {
    const timeInObject = {}
    timeInObject.type = "TimeOut"
    timeInObject.date = timeOutString.split(" ")[0]
    timeInObject.hour = parseInt(timeOutString.split(" ")[1], 10)
    employeeObject.timeOutEvents.push(timeInObject)
    return employeeObject;
}

function findTimeIn(employeeObject, date) {
    for (const timeInEvent of employeeObject.timeInEvents) {
        if (timeInEvent.date === date) {
            return timeInEvent.hour
        }
    }
}

function findTimeOut(employeeObject, date) {
    for (const timeOutEvent of employeeObject.timeOutEvents) {
        if (timeOutEvent.date === date) {
            return timeOutEvent.hour
        }
    }
}

function hoursWorkedOnDate(employeeObject, date) {
    return (findTimeOut(employeeObject, date) - findTimeIn(employeeObject, date))/100
}

function wagesEarnedOnDate(employeeObject, date) {
    return hoursWorkedOnDate(employeeObject, date)*employeeObject.payPerHour
}

function allWagesFor(employeeObject) {
    const avaliableDates = employeeObject.timeInEvents.map((log) => log.date)

    const total = avaliableDates.reduce((total, log) => {
        return total + wagesEarnedOnDate(employeeObject, log)
    }, 0)
    
    return total
}

function calculatePayroll(arrayOfEmployees) {
    const total = arrayOfEmployees.reduce((total, employee) => {
        return total + allWagesFor(employee)
    },0)

    return total;
}
