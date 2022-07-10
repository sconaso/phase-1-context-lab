function createEmployeeRecord(array){
    const firstName = array[0]
    const familyName = array[1]
    const title = array[2]
    const payPerHour = array[3]
    const timeInEvents = []
    const timeOutEvents = []
    const employeeRecord = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents,
        timeOutEvents
    }
    return employeeRecord
}

function createEmployeeRecords(arrays){
    const employeeRecords = arrays.map((array) => createEmployeeRecord(array))
    return employeeRecords
}

function createTimeInEvent(timestamp){
    const timeArray = timestamp.split(' ')
    const date = timeArray[0]
    const time = timeArray[1]
    const hour = parseInt(time, 10)

    this.timeInEvents.push(
        {
            type: 'TimeIn',
            hour: hour,
            date: date
        }
    )
    return this
}

function createTimeOutEvent(timestamp){
    const timeArray = timestamp.split(' ')
    const date = timeArray[0]
    const time = timeArray[1]
    const hour = parseInt(time, 10)
    
    this.timeOutEvents.push(
        {
            type: 'TimeOut',
            hour: hour,
            date: date
        }
    )
    return this
}

function hoursWorkedOnDate(date){
    const targetInObj = this.timeInEvents.find(obj => obj.date === date)
    const timeIn = targetInObj.hour

    const targetOutObj = this.timeOutEvents.find(obj => obj.date === date)
    const timeOut = targetOutObj.hour

    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date){
    // indexTest.js invokes wagesEarnedOnDate.call(cRecord, date)
    // using hoursWorkedOnDate.call(this, date) will use the context of cRecord
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    return hoursWorked * this.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName){
    const matchedEmployee = srcArray.find(emp => emp.firstName === firstName)
    return matchedEmployee
}

function calculatePayroll(empRecords){
    
    const payPerEmp = empRecords.map((emp) => allWagesFor.call(emp))
    const totalPayroll = payPerEmp.reduce((current, total) => current + total, 0)
    return totalPayroll
    
    //const payroll = array.reduce((total, employee) => total + allWagesFor.call(employee), 0)
    //return payroll
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

