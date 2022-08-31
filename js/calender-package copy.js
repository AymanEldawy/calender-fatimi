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
  fetchLocation: () => {
    let location = localStorage.getItem("TM_location");
    return JSON.parse(location)
      ? JSON.parse(location)
      : {
          lat: "17.5065",
          long: "44.1316",
          country: "SA",
          city: "Najran",
        };
  },
  saveLocation: (location) => {
    localStorage.setItem("TM_location", JSON.stringify(location));
  },
};
const PrayerTimeDefault = {
  month: 0, //current month
  year: 0, //current year
  latitude: "17.5065",
  longitude: "44.1316",
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}
async function showPosition(position) {
  let currentLocation = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  storeEvents.saveLocation(currentLocation);
}
let LOCATION = storeEvents.fetchLocation();
function showError() {
  if (LOCATION && LOCATION.lat) {
    PrayerTimeDefault.latitude = LOCATION.latitude
    PrayerTimeDefault.latitude =  LOCATION.longitude
  } 
}

// Fetch Prayer Time
async function getPrayTimeByMonth(month, year) {
  let prayerTime = await fetch(
    `http://api.aladhan.com/v1/hijriCalendar?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=2&month=${month}&year=${year}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      return data
    });
  return prayerTime;
}
async function getPrayTimeByDate(date = new Date()) {
  let prayerTime = await fetch(
    `https://api.aladhan.com/v1/timings/${date}?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=2`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      return data
    });
  return prayerTime;
}
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
  // theCurrentMonthHijri: ,
  // theCurrentYearHijri: ,
};
console.log(theCurrentDate.getCurrentDateHijri())
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
  let HIJRI_CONFIGURATION = returnHijriConfiguration(date);
  const yearNumber = HIJRI_CONFIGURATION.hijriYear % 210;
  const theSmallCentury = getCentury(yearNumber);
  let firstDayOfYear = daysFormat[century[yearNumber]];
  let firstWeekDayOfYear = firstDayOfYear.day; // weekday not used
  let currentYearHijri = theCurrentDate.getCurrentYearHijri();
  let currentMonthHijri = theCurrentDate.getCurrentMonthHijri();
  let currentDayNumHijri = theCurrentDate.getCurrentDateHijri();
  let firstDayNumOfMonth =
    (countOfMonthDays(HIJRI_CONFIGURATION.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month
  // Display information about date
  if (document.getElementById("theDate")) {
    document.getElementById("theDate").textContent = `${
      months[HIJRI_CONFIGURATION.hijriMonth]
    } ${HIJRI_CONFIGURATION.hijriYear}`;
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
      i <= countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber);
      i++
    ) {
      let gregorianDate = new Date(date);
      let setGregorianDate = gregorianDate.setDate(
        gregorianDate.getDate() +
          i -
          countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber)
      );
      let __date__day = `${HIJRI_CONFIGURATION.hijriYear}-${HIJRI_CONFIGURATION.hijriMonth}-${i}`;
      let hasEvent = checkIfDateHasEvents(
        `${HIJRI_CONFIGURATION.hijriYear}-${HIJRI_CONFIGURATION.hijriMonth}-${i}`
      );
      let GregorianDateIncrement = new Date(setGregorianDate);
      console.log(theCurrentDate.getCurrentDateHijri())
      if (
        theCurrentDate.getCurrentDateHijri() === i &&
        HIJRI_CONFIGURATION.hijriMonth == currentMonthHijri
      )
        dyesGrid.innerHTML += `<span data-current_date="${__date__day}" data-has_event="${hasEvent}" class="active">${i} <em> ${GregorianDateIncrement.getDate()} </em>  </span>`;
      else {
        if (
          HIJRI_CONFIGURATION.hijriYear >= currentYearHijri &&
          HIJRI_CONFIGURATION.hijriMonth == currentMonthHijri &&
          i > currentDayNumHijri
        ) {
          console.log('01')
          dyesGrid.innerHTML += `<span data-current_date="${__date__day}" data-has_event="${hasEvent}" data-event="${__date__day}>${i} <em> ${GregorianDateIncrement.getDate()} </em> <i class="icon-add">+</i> </span>`;
        } else if (
          HIJRI_CONFIGURATION.hijriYear >= currentYearHijri &&
          HIJRI_CONFIGURATION.hijriMonth > currentMonthHijri
        ) {
          console.log('02')
          dyesGrid.innerHTML += `<span data-current_date="${__date__day}" data-has_event="${hasEvent}" data-event="${__date__day}">${i}  <em> ${GregorianDateIncrement.getDate()} </em> <i class="icon-add">+</i> </span>`;
        } else
          console.log('03')

          dyesGrid.innerHTML += `<span data-current_date="${__date__day}" data-has_event="${hasEvent}" >${i} <em> ${GregorianDateIncrement.getDate()} </em></span>`;
      }
    }
    for (
      let i = 1;
      i <=
      35 -
        (firstDayNumOfMonth +
          countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber));
      i++
    ) {
      dyesGrid.innerHTML += `<span class="empty"></span>`;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if(document.querySelector('.display button')) {
    getLocation()
    displayPryerTime();
    prayerTimingDay()
    document.querySelectorAll('.display button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.display button').forEach(_ => _.classList.remove('active') )
        showControl(btn.dataset.open)
        btn.classList.add('active')
      })
      
    })
  }
  // autoLocation.addEventListener("click", getLocation);

  // displayListOfMonths(); // display checkbox list of months
  if (document.querySelector(".calender-page")) {
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
    document
      .getElementById("btnSubmitEvent")
      .addEventListener("click", addEvent);
    // Add Event
  }
});
window.addEventListener("click", (e) => {
  if (e.target.matches("span[data-event] .icon-add")) {
    console.log(e.target.parentElement.dataset)
    document.getElementById("datePicker").value = e.target.parentElement.dataset.current_date;
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

// PryerTime Page
async function displayPryerTime(date = new Date()) {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(date);
  const yearNumber = HIJRI_CONFIGURATION.hijriYear % 210;
  let firstDayOfYear = daysFormat[century[yearNumber]];
  let firstWeekDayOfYear = firstDayOfYear.day; // weekday not used
  let currentYearHijri = theCurrentDate.getCurrentYearHijri();
  let currentMonthHijri = theCurrentDate.getCurrentMonthHijri();
  let currentDayNumHijri = theCurrentDate.getCurrentDateHijri();
  let firstDayNumOfMonth =
    (countOfMonthDays(HIJRI_CONFIGURATION.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month

  // Loop of month days
  let timePrayerByMonth = await getPrayTimeByMonth(HIJRI_CONFIGURATION.hijriMonth, HIJRI_CONFIGURATION.hijriYear)
  let dyesGrid = document.querySelector(".prayer-list-month tbody");
  dyesGrid.innerHTML = "";
  for (let i = 1; i <= firstDayNumOfMonth; i++) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
  for (
    let i = 1;
    i <= countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber);
    i++
  ) {

    let gregorianDate = new Date(date);
    let setGregorianDate = gregorianDate.setDate(
      gregorianDate.getDate() +
        i -
        countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber)
    );
    let activeStyle = false;
    let GregorianDateIncrement = new Date(setGregorianDate);
    if (
      theCurrentDate.getCurrentDateHijri() === i &&
      HIJRI_CONFIGURATION.hijriMonth == currentMonthHijri
    ) {
      activeStyle = true;
    }
    let dayWeek = (parseInt(firstDayOfYear.count) + i - 1 ) % 7;
    dyesGrid.innerHTML += `
      <tr class="${activeStyle && "active"}">
        <th scope="row">${daysFormat[Object.keys(daysFormat)[dayWeek]].day}</th>
        <td>${i} ${HIJRI_CONFIGURATION.hijriMonth} ${
      HIJRI_CONFIGURATION.hijriYear
    }</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Fajr.replace("(EET)", "")}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Sunrise.replace("(EET)", "")}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Dhuhr.replace("(EET)", "")}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Asr.replace("(EET)", "")}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Maghrib.replace("(EET)", "")}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Isha.replace("(EET)", "")}</td>
      </tr>
      `;
  }
  for (
    let i = 1;
    i <=
    35 -
      (firstDayNumOfMonth +
        countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber));
    i++
  ) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
}

function showControl (open) {
  let prayerContainer = document.querySelector('.prayer-content');
  if(open == 'open-month')
    prayerContainer.className = "prayer-content open-month"
  else if(open == 'open-list')
    prayerContainer.className = "prayer-content open-list"
  else 
    prayerContainer.className = "prayer-content open-single"

}
async function prayerTimingDay () {
  let prayerTime = await getPrayTimeByDate()
  let timings = prayerTime.data.timings;
  // let timingsList = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha' ]
  let prayGrid = document.querySelector('.prayer-grid');
  prayGrid.innerHTML = `
  <div class="prayer-grid-item">
      <span>الفجر</span>
      <span>${timings.Fajr} </span>
  </div>
  <div class="prayer-grid-item">
      <span>الشروق</span>
      <span>${timings.Sunrise}</span>
  </div>
  <div class="prayer-grid-item">
      <span>الظهر</span>
      <span>${timings.Dhuhr}</span>
  </div>
  <div class="prayer-grid-item">
      <span>العصر</span>
      <span>${timings.Asr}</span>
  </div>
  <div class="prayer-grid-item">
      <span>المغرب</span>
      <span>${timings.Maghrib}</span>
  </div>
  <div class="prayer-grid-item">
      <span>العشاء</span>
      <span>${timings.Isha}</span>
  </div>
  `
  // for(let pray of Object.keys(timings)){
  //   if(timingsList.includes(pray)) {
  //   }
  // }
  
}
