/* Your Code Here */

let createEmployeeRecord = function (empInfoArray) {
  return {
    firstName: empInfoArray[0],
    familyName: empInfoArray[1],
    title: empInfoArray[2],
    payPerHour: empInfoArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function (empArrays) {
  return empArrays.map(empArray => createEmployeeRecord(empArray))
}

let createTimeInEvent = function (dateStamp) {
  this['timeInEvents'].push({
    type: 'TimeIn',
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
    });
  return this;
}

let createTimeOutEvent = function (dateStamp) {
  this['timeOutEvents'].push({
    type: 'TimeOut',
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
    });
  return this;
}

let hoursWorkedOnDate = function (date) {
  const timeInByDate = this.timeInEvents.find(event =>
    event.date === date).hour;
  const timeOutByDate = this.timeOutEvents.find(event =>
    event.date === date).hour;
  return (timeOutByDate-timeInByDate)/100;
}

let wagesEarnedOnDate = function (date) {
  return hoursWorkedOnDate.call(this, date)*this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName  = function (srcArray, firstName) {
  return srcArray.find(emp => emp.firstName === firstName)
}

// let calculatePayroll = function (empRecs) {
//   return empRecs.reduce(function(total, emp){
//     return total + allWagesFor.call(emp)}, 0
//   )
// }

let calculatePayroll = function (empRecs) {
  return empRecs.reduce((total, emp) => total + allWagesFor.call(emp), 0)
}

