global.$       = global.jQuery = require('jquery');
var moment = require('moment')
var foundation = require('../../node_modules/foundation-sites/dist/js/foundation.js');

$(document).foundation();

var curr = moment();
console.log(curr)

update(curr);

function update(currMoment) {
  updateCalendarHeader(currMoment);
  updateCalendarDays(currMoment);
  updateCurrentDisplay(moment());
}

// var currMoment = moment().subtract(1, 'month');
document.querySelector('.arrows.left').addEventListener('click', function(e) {
  console.log('left');
  curr = curr.subtract(1, 'month');
  update(curr);
});

document.querySelector('.arrows.right').addEventListener('click',function(e) {
  console.log('right');
  curr = curr.add(1, 'month');
  update(curr);
});




function updateCurrentDisplay(currMoment) {
  var col1 = document.querySelector('.calendar > .col-1');
  removeChildren(col1);

  var dayDisplay = document.createElement('p');
  dayDisplay.innerHTML = currMoment.format('dddd');


  var dateDisplay = document.createElement('p');
  dateDisplay.innerHTML = currMoment.format('MMM D');

  col1.appendChild(dayDisplay);
  col1.appendChild(dateDisplay);
}


function updateCalendarHeader(currMoment) {
  var header = document.querySelector('.month-title-name');
  removeChildren(header);
  var headerTitle = document.createElement('div');
  headerTitle.innerHTML = currMoment.format('MMMM YYYY');
  header.appendChild(headerTitle);
}

function updateCalendarDays(currMoment) {
  var daysOfMonth = addDays(currMoment);

  var parent = document.querySelector('ul.month-days');
  removeChildren(parent);

  for(var i = 0; i < daysOfMonth.length; i++) {
    var elem = document.createElement('li');
    elem.innerHTML = daysOfMonth[i].number;
    elem.className += daysOfMonth[i].class;
    parent.appendChild(elem);
  }
}


function removeChildren(node) {
  while(node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

// function updDate(currMoment) {
//   setMonthHeader(currMoment);
//   addDays(currMoment);
// }

function setMonthHeader(currMoment) {
  return moment(currMoment).format('MMMM YYYY');
}

function addDays(currMoment) {
  var monthRange = getMonthRange(currMoment);
  console.log(monthRange.start.day());

  var daysOfMonth = [];
  addPrevMonth(daysOfMonth, monthRange);
  addCurrMonth(daysOfMonth, monthRange);
  addNextMonth(daysOfMonth, monthRange);
  return daysOfMonth;
}



function addPrevMonth(daysOfMonth, monthRange) {
  var monthdaysToAdd = moment(monthRange.start).day();
  var prevMonth = moment(monthRange.start).subtract(1, 'month');
  var monthDays = moment(prevMonth).daysInMonth();

  for (var i = monthDays - monthdaysToAdd; i < monthDays; i++) {
    daysOfMonth.push({
      class: 'inactive',
      number: i + 1
    });
  }
}

function addCurrMonth(daysOfMonth, monthRange) {
  var monthDays = moment(monthRange.start).daysInMonth();

  for ( var i = 1; i <= monthDays; i++) {
    daysOfMonth.push({
      class: 'active',
      number: i
    });
  }
}

function addNextMonth(daysOfMonth, monthRange) {
  var currLen = daysOfMonth.length;
  var maxElements = currLen <= 35 ? 35 : 42; // 6 weeks * 7 days
  for(var i = 1; i + currLen <= maxElements; i++) {
    daysOfMonth.push({
      class: 'inactive',
      number: i
    });
  }
}

function getMonthRange(mom) {
  // make sure to call toDate() for plain JavaScript date type
  return { start: mom.startOf("month"), end: mom.startOf("month") };
}