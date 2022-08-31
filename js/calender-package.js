// import { storageLocation } from './main.js';
// console.log(storageLocation)
// Let storage
let storeEvents = {
  fetchEvents() {
    let events = JSON.parse(localStorage.getItem("events"));
    return events && events.length ? events : [];
  },
  saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
  },
};
let events = storeEvents.fetchEvents();
const century = {
  1: "ه",
  2: "ب",
  3: "ز",
  4: "د",
  5: "ا",
  6: "و",
  7: "ج",
  8: "ز",
  9: "ه",
  10: "ب",
  11: "ز",
  12: "د",
  13: "ا",
  14: "و",
  15: "ج",
  16: "ز",
  17: "ه",
  18: "ب",
  19: "و",
  20: "د",
  21: "ا",
  22: "و",
  23: "ج",
  24: "ز",
  25: "ه",
  26: "ب",
  27: "و",
  28: "د",
  29: "ا",
  30: "و",
  31: "ج",
  32: "ز",
  33: "ه",
  34: "ب",
  35: "و",
  36: "د",
  37: "ا",
  38: "ه",
  39: "ج",
  40: "ز",
  41: "ه",
  42: "ب",
  43: "و",
  44: "د",
  45: "ا",
  46: "ه",
  47: "ج",
  48: "ز",
  49: "د",
  50: "ب",
  51: "و",
  52: "د",
  53: "ا",
  54: "ه",
  55: "ج",
  56: "ز",
  57: "د",
  58: "ب",
  59: "و",
  60: "د",
  61: "ا",
  62: "ه",
  63: "ج",
  64: "ز",
  65: "د",
  66: "ب",
  67: "و",
  68: "ج",
  69: "ا",
  70: "ه",
  71: "ج",
  72: "ز",
  73: "د",
  74: "ب",
  75: "و",
  76: "ج",
  77: "ا",
  78: "ه",
  79: "ب",
  80: "ز",
  81: "د",
  82: "ب",
  83: "و",
  84: "ج",
  85: "ا",
  86: "ه",
  87: "ب",
  88: "ز",
  89: "د",
  90: "ب",
  91: "و",
  92: "ج",
  93: "ا",
  94: "ه",
  95: "ب",
  96: "ز",
  97: "د",
  98: "ا",
  99: "و",
  100: "ج",
  101: "ا",
  102: "ه",
  103: "ب",
  104: "ز",
  105: "د",
  106: "ا",
  107: "و",
  108: "ج",
  109: "ز",
  110: "ه",
  111: "ب",
  112: "ز",
  113: "د",
  114: "ا",
  115: "و",
  116: "ج",
  117: "ز",
  118: "ه",
  119: "ب",
  120: "ز",
  121: "د",
  122: "ا",
  123: "و",
  124: "ج",
  125: "ز",
  126: "ه",
  127: "ب",
  128: "و",
  129: "د",
  130: "ا",
  131: "و",
  132: "ج",
  133: "ز",
  134: "ه",
  135: "ب",
  136: "و",
  137: "د",
  138: "ا",
  139: "ه",
  140: "ج",
  141: "ز",
  142: "ه",
  143: "ب",
  144: "و",
  145: "د",
  146: "ا",
  147: "ه",
  148: "ج",
  149: "ز",
  150: "ه",

  151: "ب",
  152: "و",
  153: "د",
  154: "ا",
  155: "ه",
  156: "ج",
  157: "ز",
  158: "د",
  159: "ب",
  160: "و",
  161: "د",
  162: "ا",
  163: "ه",
  164: "ج",
  165: "ز",
  166: "د",
  167: "ب",
  168: "و",
  169: "ج",
  170: "ا",
  171: "ه",
  172: "ج",
  173: "ز",
  174: "د",
  175: "ب",
  176: "و",
  177: "ج",
  178: "ا",
  179: "ه",
  180: "ج",
  181: "ز",
  182: "د",
  183: "ب",
  184: "و",
  185: "ج",
  186: "ا",
  187: "ه",
  188: "ب",
  189: "ز",
  190: "د",
  191: "ب",
  192: "و",
  193: "ج",
  194: "ا",
  195: "ه",
  196: "ب",
  197: "ز",
  198: "د",
  199: "ا",
  200: "و",
  201: "ج",
  202: "ا",
  203: "ه",
  204: "ب",
  205: "ز",
  206: "د",
  207: "ا",
  208: "و",
  209: "ج",
  210: "ا",
};
// Every 30 years
const leapYears = [
  2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29, 32, 35, 38, 40, 43, 46, 49, 51, 54,
  57, 59, 62, 65, 68, 70, 73, 76, 79, 81, 84, 87, 89, 92, 95, 98, 100, 103, 106,
  109, 111, 114, 117, 119, 122, 125, 128, 130, 133, 136, 139, 141, 144, 147,
  149, 152, 155, 158, 160, 163, 166, 169, 171, 174, 177, 179, 182, 185, 188,
  190, 193, 196, 199, 201, 204, 207, 209,
];
const daysFormat = {
  ا: { day: "الاحد", count: 0 },
  ب: { day: "الأثنين", count: 1 },
  ج: { day: "الثلاثاء", count: 2 },
  د: { day: "الأربعاء", count: 3 },
  ه: { day: "الخميس", count: 4 },
  و: { day: "الجمعة", count: 5 },
  ز: { day: "السبت", count: 6 },
};
const a2e = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
const oddMonth = 30;
const evenMonth = 29;

const months = {
  1: "محرم",
  2: "صفر",
  3: "ربيع الاول",
  4: "ربيع الثاني",
  5: "جمادي الاولي",
  6: "جمادي الثاني",
  7: "رجب",
  8: "شبعان",
  9: "رمضان",
  10: "شوال",
  11: "ذو القعده",
  12: "ذو الحجة",
};

let theCurrentDate = {
  gregorianDate: new Date(),
  currentHijriDate: new Date().toLocaleDateString("ar-SA"),
  getCurrentDateHijri() {
    return parseInt(a2e(this.currentHijriDate.split("/")[0]));
  },
  getCurrentMonthHijri() {
    return parseInt(a2e(this.currentHijriDate.split("/")[1]));
  },
  getCurrentYearHijri() {
    return parseInt(a2e(this.currentHijriDate.split("/")[2]));
  },
};

// Get the century for year
function getCentury(year) {
  switch (true) {
    case year < 31:
      return "القرن الاول";
      break;
    case year > 30 && year < 61:
      return "القرن الثاني";
      break;
    case year > 60 && year < 91:
      return "القرن الثالث";
      break;
    case year > 90 && year < 121:
      return "القرن الرابع";
      break;
    case year > 120 && year < 151:
      return "القرن الخامس";
      break;
    case year > 150 && year < 181:
      return "القرن السادس";
      break;
    case year > 180 && year < 211:
      return "القرن السابع";
      break;
  }
}
// CountOfMonthDays
function countDayOfMoth(month, yearNumber) {
  if (month % 2 == 0) {
    if (month == 12 && leapYears.includes(yearNumber))
      return 30; // Year Is Leap
    else return 29; // Even months
  } else return 30; // odd months
}

function countOfMonthDays(monthCount, yearNumber) {
  let result = 0;
  for (let i = 1; i <= monthCount; i++) {
    if (i % 2 == 0) {
      if (i == 12 && leapYears.includes(yearNumber)) result += 30;
      else result += 29;
    } else result += 30;
  }
  return result;
}
function displayListOfMonths() {
  let listOfMonth = document.getElementById("listOfMonth");
  listOfMonth.innerHTML = "";
  for (const month of Object.keys(months)) {
    listOfMonth.innerHTML += `<option value="${month}">${months[month]}</option>`;
  }
}

function displayCalenderGrid(date = new Date()) {
  // check events by this day
  let HijriConfiguration = returnHijriConfiguration(date);
  const yearNumber = HijriConfiguration.hijriYear % 210;
  const theSmallCentury = getCentury(yearNumber);
  let firstDayOfYear = daysFormat[century[yearNumber]];
  let firstWeekDayOfYear = firstDayOfYear.day; // weekday not used
  let currentYearHijri = theCurrentDate.getCurrentYearHijri();
  let currentMonthHijri = theCurrentDate.getCurrentMonthHijri();
  let currentDayNumHijri = theCurrentDate.getCurrentDateHijri();
  let firstDayNumOfMonth =
    (countOfMonthDays(HijriConfiguration.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month
  // Display information about date
  if (document.getElementById("theDate")) {
    document.getElementById("theDate").textContent = `${
      months[HijriConfiguration.hijriMonth]
    } ${HijriConfiguration.hijriYear}`;
  }
  // Loop of month days
  if (document.querySelector(".calender-list-grid-body")) {
    let dyesGrid = document.querySelector(".calender-list-grid-body");
    dyesGrid.innerHTML = "";
    for (let i = 1; i <= firstDayNumOfMonth; i++) {
      dyesGrid.innerHTML += `<span class="empty"></span>`;
    }
    for (
      let i = 1;
      i <= countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber);
      i++
    ) {
      // let gregorianDate = new Date(date);
      // let datePlus = 0;
      // let dateMinus = 0
      // if(i > 1) {
      //   datePlus = i;
      //   console.log(datePlus, dateMinus)
      // }
      //   dateMinus = theCurrentDate.getCurrentDateHijri();
      // let setGregorianDate = gregorianDate.setDate(
      //   gregorianDate.getDate() + datePlus - dateMinus
      //     // - theCurrentDate.getCurrentDateHijri()
      //     // countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber)
      // );
      
      let __date__day = `${HijriConfiguration.hijriYear}-${HijriConfiguration.hijriMonth}-${i}`;
      let _hijri = new HijriDate(HijriConfiguration.hijriYear, HijriConfiguration.hijriMonth, i);
      let gregorian = _hijri.toGregorian();
      let hasEvent = checkIfDateHasEvents(
        `${HijriConfiguration.hijriYear}-${HijriConfiguration.hijriMonth}-${i}`
      );
      let GregorianDateIncrement = new Date(gregorian);
      if (
        theCurrentDate.getCurrentDateHijri() === i &&
        HijriConfiguration.hijriMonth == currentMonthHijri
      )
        dyesGrid.innerHTML += `<span data-current_date="${__date__day}" data-has_event="${hasEvent}" class="active">${i} <em> ${GregorianDateIncrement.getDate()} </em>  </span>`;
      else {
        if (
          HijriConfiguration.hijriYear >= currentYearHijri &&
          HijriConfiguration.hijriMonth == currentMonthHijri &&
          i > currentDayNumHijri
        ) {
          dyesGrid.innerHTML += `<span data-current_date="${__date__day}" data-has_event="${hasEvent}" data-event="${__date__day}"> ${i} <em> ${GregorianDateIncrement.getDate()} </em> <i class="icon-add">+</i> </span>`;
        } else if (
          HijriConfiguration.hijriYear >= currentYearHijri &&
          HijriConfiguration.hijriMonth > currentMonthHijri
        ) {
          dyesGrid.innerHTML += `<span data-current_date="${__date__day}" data-has_event="${hasEvent}" data-event="${__date__day}"> ${i}  <em> ${GregorianDateIncrement.getDate()} </em> <i class="icon-add">+</i> </span>`;
        } else
          dyesGrid.innerHTML += `<span data-current_date="${__date__day}" data-has_event="${hasEvent}" >${i} <em> ${GregorianDateIncrement.getDate()} </em></span>`;
      }
    }
    for (
      let i = 1;
      i <=
      35 -
        (firstDayNumOfMonth +
          countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber));
      i++
    ) {
      dyesGrid.innerHTML += `<span class="empty"></span>`;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  displayCalenderGrid(); // display calender
  document
    .getElementById("btnChangeByYear")
    .addEventListener("click", enterYear); // change by years
  document.getElementById("today").addEventListener("click", __today); // Back to today
  // invoke go next and go prev
  document.getElementById("goNext").addEventListener("click", goNext);
  document.getElementById("goPrev").addEventListener("click", goPrev);
  document
    .getElementById("listOfMonth")
    .addEventListener("change", (e) => changeMonth(e));

  // Events Actions
  // document.getElementById('selectedDatePicker').addEventListener('focus', openCalender)
  document.getElementById("btnAddEvent").addEventListener("click", () => {
    document.querySelector(".modal-events").classList.remove("close");
  });
  document
    .getElementById("eventTitle")
    .addEventListener("blur", (e) => checkInputTitle(e.target));
  document
    .getElementById("eventTitle")
    .addEventListener("keyup", (e) => checkInputTitle(e.target));
  document.getElementById("btnSubmitEvent").addEventListener("click", addEvent);
  // Add Event
});
window.addEventListener("click", (e) => {
  if (e.target.matches("span[data-event] .icon-add")) {
    console.log(e.target.parentElement.dataset);
    document.getElementById("datePicker").value =
      e.target.parentElement.dataset.current_date;
    document.querySelector(".modal-events").classList.remove("close");
  }

  if (e.target.matches(".calender-list-grid-body span")) {
    if (e.target.dataset.has_event) {
      displayEvents(e.target.dataset.current_date);
    } else {
      document.querySelector(
        ".events"
      ).innerHTML = `<p class="m-0 text-danger">لا يوجد مناسبات لهذا اليوم</p>`;
    }
    Array.from(
      document.querySelectorAll(".calender-list-grid-body span")
    ).forEach((_) => _.classList.remove("visited"));
    e.target.classList.add("visited");
  }
  if (e.target.matches(".modal-events")) {
    e.target.classList.add("close");
  }
});

let listOfControls = document.getElementById("listOfControls");

// Go Prev [ Month - year - day]
function goPrev() {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(
    theCurrentDate.gregorianDate
  );
  switch (listOfControls.value) {
    case "month":
      HIJRI_CONFIGURATION.hijriMonth -= 1;
      break;
    case "year":
      HIJRI_CONFIGURATION.hijriYear -= 1;
      break;
  }
  //
  let date = new Date(theCurrentDate.gregorianDate);
  let theNewDate = date.setDate(
    date.getDate() -
      countDayOfMoth(
        HIJRI_CONFIGURATION.hijriMonth + 1,
        theCurrentDate.getCurrentYearHijri()
      )
  );
  displayCalenderGrid(theNewDate);
  theCurrentDate.gregorianDate = new Date(theNewDate);
}
function goNext() {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(
    theCurrentDate.gregorianDate
  );

  switch (listOfControls.value) {
    case "month":
      HIJRI_CONFIGURATION.hijriMonth += 1;
      break;
    case "year":
      HIJRI_CONFIGURATION.hijriYear += 1;
      break;
  }

  let date = new Date(theCurrentDate.gregorianDate);
  let theNewDate = date.setDate(
    date.getDate() +
      countDayOfMoth(
        HIJRI_CONFIGURATION.hijriMonth,
        theCurrentDate.getCurrentYearHijri()
      )
  );
  displayCalenderGrid(theNewDate);
  theCurrentDate.gregorianDate = new Date(theNewDate);
}
function returnHijriConfiguration(date) {
  let dateHijri = new Date(date).toLocaleDateString("ar-SA");
  return {
    hijriMonth: parseInt(a2e(dateHijri.split("/")[1])),
    hijriDayNum: parseInt(a2e(dateHijri.split("/")[0])),
    hijriYear: parseInt(a2e(dateHijri.split("/")[2])),
  };
}

function enterYear() {
  let year = document.getElementById("changeByYear");
  let hijri = new HijriDate(+year.value, 1, 1);
  let gregorian = hijri.toGregorian();
  displayCalenderGrid(gregorian);
  theCurrentDate.gregorianDate = gregorian;
}
function changeMonth(e) {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(
    theCurrentDate.gregorianDate
  );
  let hijri = new HijriDate(
    HIJRI_CONFIGURATION.hijriYear,
    +listOfMonth.value,
    HIJRI_CONFIGURATION.hijriDayNum
  );
  let theGerDate = new Date(hijri.toGregorian());
  displayCalenderGrid(theGerDate);
  theCurrentDate.gregorianDate = new Date(theGerDate);
}
function __today() {
  displayCalenderGrid();
  theCurrentDate.gregorianDate = new Date();
}
// Events
function openCalender() {
  document.querySelector(".calender-picker").classList.remove("close-calender");
}
function checkInputTitle(inputTitle) {
  if (inputTitle.value == "") {
    inputTitle.classList.add("error");
    document.getElementById("titleError").style.display = "block";
  } else {
    inputTitle.classList.remove("error");
    document.getElementById("titleError").style.display = "none";
  }
}

function addEvent() {
  let title = document.getElementById("eventTitle");
  checkInputTitle(title);
  let color = document.getElementById("eventColor").value;
  // let theDateEvent = document.getElementById('selectedDatePicker').value // 0000-00-00
  let theDateEvent = document.getElementById("datePicker").value; // 0000-00-00
  let event = {
    title: title.value,
    date: theDateEvent,
    color,
  };
  // Check If Event date > the current date

  events.push(event);
  theDateEvent.value = "";
  color.value = "";
  title.value = "";
  storeEvents.saveEvents(events);
}
function createEventItem(event) {
  let div = document.createElement("div");
  div.className = "events-item";
  div.style.borderColor = event.color;
  div.innerHTML = `
  <p class="text-success events-item-title">${event.title}</p>
  <div
    class="d-flex align-items-center justify-content-between"
  >
    <p class="events-item-date">${event.date}</p>
    <span>باقي من الايام 23 يوم</span>
    <span class="events-item-circle" style="background:${event.color}"></span>
  </div>
  `;
  return div;
}

function displayEvents(theEventDate) {
  let containerEvent = document.querySelector(".events");
  containerEvent.innerHTML = "";
  let listOfEvents = events.filter((event) => event.date == theEventDate);
  if (listOfEvents.length > 0) {
    listOfEvents.forEach((event) => {
      containerEvent.append(createEventItem(event));
    });
  } else {
    containerEvent.innerHTML = `<p class="m-0 text-danger">لا يوجد مناسبات لهذا اليوم</p>`;
  }
}
function checkIfDateHasEvents(theEventDate) {
  let listOfEvents = events.filter((event) => event.date == theEventDate);
  return listOfEvents.length > 0;
}
