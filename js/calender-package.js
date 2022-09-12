import * as Calender from "./calender-setup.js";
import {
  calculateDate,
  globalEvents,
  latAndLong,
  storageLocation,
} from "./global.js";
import SunCalc from "./suncalc.js";
// Let storage
let bigCenturyName = ["1", "2", "3", "4", "5", "6", "7"];

export let storeEvents = {
  fetchEvents() {
    let events = JSON.parse(localStorage.getItem("events"));
    return events && events.length ? events : [];
  },
  saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
  },
};
let events = storeEvents.fetchEvents();
const eventsExists = events.filter((event) => event.deletable === false);
if (eventsExists.length < 1) {
  globalEvents.forEach((event) => {
    events.push({
      title: event.title,
      date: event.date,
      deletable: event.deletable,
      color: "#ffc107",
    });
  });
  storeEvents.saveEvents(events);
}

function displayCalenderGrid(
  date = new Date(),
  display = ".calender-list-grid-body"
) {
  // check events by this day
  let HijriConfiguration = returnHijriConfiguration(date);
  const yearNumber = HijriConfiguration.hijriYear % 210;
  displayYearInfo(HijriConfiguration.hijriYear);
  let firstDayOfYear = Calender.daysFormat[Calender.century[yearNumber]];
  let currentYearHijri = Calender.theCurrentDate.getCurrentYearHijri();
  let currentMonthHijri = Calender.theCurrentDate.getCurrentMonthHijri();
  let currentDayNumHijri = Calender.theCurrentDate.getCurrentDateHijri();
  let firstDayNumOfMonth =
    (Calender.countOfMonthDays(HijriConfiguration.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month
  // Display information about date
  if (document.getElementById("theDate")) {
    document.getElementById("theDate").textContent = `${
      Calender.months[HijriConfiguration.hijriMonth]
    } ${HijriConfiguration.hijriYear}`;
  }
  let setMonth = new Set();
  // Loop of month days
  let dyesGrid = document.querySelector(display);
  dyesGrid.innerHTML = "";
  for (let i = 1; i <= firstDayNumOfMonth; i++) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
  for (
    let i = 1;
    i <= Calender.countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber);
    i++
  ) {
    let _hijri = new HijriDate(
      HijriConfiguration.hijriYear,
      HijriConfiguration.hijriMonth,
      i
    );
    let hijri_day = `${_hijri._date} ${Calender.months[_hijri._month]} ${_hijri._year}` 

    let gregorian = _hijri.toGregorian();
    let GregorianDateIncrement = new Date(gregorian);
    let hasEvent = checkIfDateHasEvents(GregorianDateIncrement);
    setMonth.add(
      GregorianDateIncrement.toLocaleDateString("ar-EG", { month: "long" })
    );
    if (
      Calender.theCurrentDate.getCurrentDateHijri() === i &&
      HijriConfiguration.hijriMonth == currentMonthHijri
    ) {
      if (hasEvent) displayEvents(GregorianDateIncrement);
      dyesGrid.innerHTML += `<span data-current_date="${GregorianDateIncrement}" data-has_event="${hasEvent}" class="active">${i} <em> ${GregorianDateIncrement.getDate()} </em>  </span>`;
    } else {
      if (
        HijriConfiguration.hijriYear >= currentYearHijri &&
        HijriConfiguration.hijriMonth == currentMonthHijri &&
        i > currentDayNumHijri
      ) {
        dyesGrid.innerHTML += `<span data-display_hijri="${hijri_day}"  data-current_date="${GregorianDateIncrement}" data-has_event="${hasEvent}" data-event="${GregorianDateIncrement}"> ${i} <em> ${GregorianDateIncrement.getDate()} </em> <i class="icon-add">+</i> </span>`;
      } else if (
        HijriConfiguration.hijriYear >= currentYearHijri &&
        HijriConfiguration.hijriMonth > currentMonthHijri
      ) {
        dyesGrid.innerHTML += `<span data-display_hijri="${hijri_day}"  data-current_date="${GregorianDateIncrement}" data-has_event="${hasEvent}" data-event="${GregorianDateIncrement}"> ${i}  <em> ${GregorianDateIncrement.getDate()} </em> <i class="icon-add">+</i> </span>`;
      } else
        dyesGrid.innerHTML += `<span data-current_date="${GregorianDateIncrement}" data-has_event="${hasEvent}" >${i} <em> ${GregorianDateIncrement.getDate()} </em></span>`;
    }
  }
  for (
    let i = 1;
    i <=
    35 -
      (firstDayNumOfMonth +
        Calender.countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber));
    i++
  ) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
  document.getElementById("theDateGer").textContent = `${Array(
    ...setMonth
  ).join(" - ")} ${new Date(date).getFullYear()}`;
}
function displayYearInfo(year) {
  // Info year
  document.getElementById("yearLeap").innerHTML = Calender.leapYears.includes(
    year % 210
  )
    ? "نعم"
    : "لا";
  document.getElementById("firstDayOfYear").innerHTML =
    Calender.daysFormat[Calender.century[year % 210]].count + 1;
  document.getElementById("smallCentury").innerHTML = Calender.getCentury(
    parseInt(year % 210)
  );
  document.getElementById("bigCentury").innerHTML =
    bigCenturyName[parseInt(year / 210)];
}

window.addEventListener("DOMContentLoaded", () => {
  displayCalenderGrid()
  displayCalenderYear()
  document.getElementById('theYear').textContent = `${Calender.theCurrentDate.yearHijri} هـ`;
  document.getElementById("btnChangeByYear").addEventListener("click", () => {
    enterYear();
  }); // change by years
  if (document.querySelector(".calender-page")) {
    Object.keys(Calender.months).forEach((month) => {
      document.getElementById("listOfMonth").innerHTML += `
      <button data-month="${month}" class="${
        month == Calender.theCurrentDate.getCurrentMonthHijri() ? "active" : ""
      }" >${Calender.months[month]}</button>
    `;
    });
    // Events Actions
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
    Array.from(document.querySelectorAll("#listOfMonth button")).forEach(
      (btn) => {
        btn.addEventListener("click", (e) => {
          Array.from(document.querySelectorAll("#listOfMonth button")).forEach(
            (_) => _.classList.remove("active")
          );
          changeMonth(e);
          btn.classList.add("active");
        });
      }
    );
  }
  document.getElementById("today").addEventListener("click", __today); // Back to today
  // invoke go next and go prev
  document.getElementById("goNext").addEventListener("click", goNext);
  document.getElementById("goPrev").addEventListener("click", goPrev);
  document.getElementById("goNextYear").addEventListener("click", goNextYear);
  document.getElementById("goPrevYear").addEventListener("click", goPrevYear);
});

window.addEventListener("click", (e) => {
  if (e.target.matches(".tab-control button:first-child")) {
    document.getElementById('calenderTabs').classList.remove('__month')
    document.getElementById('calenderTabs').classList.add('__year')
    document.querySelector(".tab-control button:last-child").classList.remove('active')
    e.target.classList.add('active')
  }
  if (e.target.matches(".tab-control button:last-child")) {
    document.getElementById('calenderTabs').classList.remove('__year')
    document.getElementById('calenderTabs').classList.add('__month')
    document.querySelector(".tab-control button:first-child").classList.remove('active')
    e.target.classList.add('active')
  }
  if (e.target.matches("#closeEventsBox .gg-close")) {
    document.getElementById("eventsGrid").innerHTML = "";
  }
  if (e.target.matches(".delete-event .gg-close")) {
    deleteEvent(e.target.parentElement.dataset.title);
    e.target.parentElement.parentElement.remove();
  }

  if (e.target.matches("span[data-event] .icon-add")) {
    document.getElementById("datePicker").value =
      e.target.parentElement.dataset.display_hijri;
    document.getElementById("datePicker").dataset.date =
      e.target.parentElement.dataset.current_date;
    
    document.querySelector(".modal-events").classList.remove("close");
  }

  if (e.target.matches(".calender-list-grid-body span")) {
    if (e.target.dataset.has_event) {
      displayEvents(e.target.dataset.current_date);
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

// Go Prev [ Month - year - day]
export function goPrev() {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(
    Calender.theCurrentDate.gregorianDate
  );
  let date = new Date(Calender.theCurrentDate.gregorianDate);
  let theNewDate = date;
  HIJRI_CONFIGURATION.hijriMonth -= 1;
  theNewDate = date.setDate(
    date.getDate() -
      Calender.countDayOfMoth(
        HIJRI_CONFIGURATION.hijriMonth + 1,
        Calender.theCurrentDate.getCurrentYearHijri()
      )
  );
  displayCalenderGrid(theNewDate);
  Calender.theCurrentDate.gregorianDate = new Date(theNewDate);
  if (
    Calender.theCurrentDate.currentHijriDate ==
    new Date(theNewDate).toLocaleDateString("ar-SA")
  ) {
    document.getElementById("today").classList.add("hide");
  } else {
    document.getElementById("today").classList.remove("hide");
  }
}
export function goNext() {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(
    Calender.theCurrentDate.gregorianDate
  );
  let date = new Date(Calender.theCurrentDate.gregorianDate);
  let theNewDate = date;
  HIJRI_CONFIGURATION.hijriMonth += 1;
  theNewDate = date.setDate(
    date.getDate() +
      Calender.countDayOfMoth(
        HIJRI_CONFIGURATION.hijriMonth,
        Calender.theCurrentDate.getCurrentYearHijri()
      )
  );

  displayCalenderGrid(theNewDate);
  if (
    Calender.theCurrentDate.currentHijriDate ==
    new Date(theNewDate).toLocaleDateString("ar-SA")
  ) {
    document.getElementById("today").classList.add("hide");
  } else {
    document.getElementById("today").classList.remove("hide");
  }

  Calender.theCurrentDate.gregorianDate = new Date(theNewDate);
}
function returnHijriConfiguration(date) {
  let gregorianDate = new Date(date);
  let hijri = gregorianDate.toHijri();
  return {
    hijriMonth: hijri._month,
    hijriDayNum: hijri._date,
    hijriYear: hijri._year,
  };
}
function enterYear() {
  let year = document.getElementById("changeByYear");
  let hijri = new HijriDate(+year.value, 1, 1);
  let gregorian = hijri.toGregorian();
  displayCalenderGrid(gregorian);
  Calender.theCurrentDate.gregorianDate = gregorian;
}
function changeMonth(e) {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(
    Calender.theCurrentDate.gregorianDate
  );
  let hijri = new HijriDate(
    HIJRI_CONFIGURATION.hijriYear,
    +e.target.dataset.month,
    HIJRI_CONFIGURATION.hijriDayNum
  );
  let theGerDate = new Date(hijri.toGregorian());
  displayCalenderGrid(theGerDate);
  Calender.theCurrentDate.gregorianDate = new Date(theGerDate);
  if (
    Calender.theCurrentDate.currentHijriDate ==
    new Date(theGerDate).toLocaleDateString("ar-SA")
  ) {
    document.getElementById("today").classList.add("hide");
  } else {
    document.getElementById("today").classList.remove("hide");
  }
}
export function __today() {
  document.getElementById("today").classList.add("hide");
  displayCalenderGrid();
  Calender.theCurrentDate.gregorianDate = new Date();
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
  let theDateEvent = document.getElementById("datePicker"); // 0000-00-00
  let event = {
    title: title.value,
    date: theDateEvent.dataset.date,
    color,
    deletable: true,
  };
  // Check If Event date > the current date

  events.push(event);
  storeEvents.saveEvents(events);
  if (title.value !== "")
    document.querySelector(".modal-events").classList.add("close");
  theDateEvent.value = "";
  title.value = "";
}
function createEventItem(event) {
  let gregorian = new Date(event.date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let hijri = new Date(event.date).toHijri();
  let div = document.createElement("div");
  div.className = "events-item";
  div.style.background = event.color;
  div.innerHTML = `
  ${
    event.deletable
      ? `<span data-title="${event.title}" class="delete-event"><i class="gg-close"></i></span>`
      : ""
  }
  <h4>${event.title}</h4>
  <p class="d-flex align-items justify-content-between">
    <span>${new Date(event.date).toLocaleDateString("ar-SA", {
      weekday: "long",
    })} ${hijri._date} ${Calender.months[hijri._month]} ${hijri._year}</span>
    <span>${gregorian}</span>
    </p>
  ${calculateDate(event.date)}
  `;
  return div;
}

function displayEvents(theEventDate) {
  if (document.querySelector(".calender-page")) {
    let containerEvent = document.getElementById("eventsGrid");
    containerEvent.innerHTML = "";
    let listOfEvents = events.filter(
      (event) => Date.parse(event.date) == Date.parse(theEventDate)
    );
    if (listOfEvents.length > 0) {
      listOfEvents.forEach((event) => {
        containerEvent.append(createEventItem(event));
      });
    } else {
      containerEvent.innerHTML = `
      <p class="m-0 text-danger">لا يوجد مناسبات لهذا اليوم <span id="closeEventsBox"><i class="gg-close"></i></span></p>
      `;
    }
  }
}
function checkIfDateHasEvents(theEventDate) {
  let listOfEvents = events.filter(
    (event) => Date.parse(event.date) == Date.parse(theEventDate)
    );
  return listOfEvents.length > 0;
}

function deleteEvent(title) {
  let newEvents = events.filter((event) => event.title !== title);
  storeEvents.saveEvents(newEvents);
}

function getSunriseTime() {
  let suncalc = SunCalc.getTimes(
    new Date(),
    latAndLong.latitude,
    latAndLong.longitude
  );
  let sunsetStr = suncalc.sunset.getHours() + ":" + suncalc.sunset.getMinutes();
  let sunset = sunsetStr.split(":").join("");
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (
    `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` >
    parseInt(sunset)
  ) {
    let tomorrow = date.setDate(date.getDate() + 1);
    Calender.theCurrentDate.gregorianDate = new Date(tomorrow);
    Calender.theCurrentDate.currentHijriDate = new Date(
      tomorrow
    ).toLocaleDateString("ar-SA");
    displayCalenderGrid(tomorrow);
  }
}
getSunriseTime();

function displayCalenderGridYear(
  date = new Date(),
  display
) {
  // check events by this day
  let HijriConfiguration = returnHijriConfiguration(date);
  const yearNumber = HijriConfiguration.hijriYear % 210;
  displayYearInfo(HijriConfiguration.hijriYear);
  let firstDayOfYear = Calender.daysFormat[Calender.century[yearNumber]];
  let currentMonthHijri = Calender.theCurrentDate.getCurrentMonthHijri();
  let firstDayNumOfMonth =
    (Calender.countOfMonthDays(HijriConfiguration.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month
  // Display information about date
  let dyesGrid = display;
  dyesGrid.innerHTML = `<h4>${Calender.months[HijriConfiguration.hijriMonth]}</h4>`;
  dyesGrid.innerHTML += `<span class="text-primary">اح</span>`;
  dyesGrid.innerHTML += `<span class="text-primary">اث</span>`;
  dyesGrid.innerHTML += `<span class="text-primary">ث</span>`;
  dyesGrid.innerHTML += `<span class="text-primary">ار</span>`;
  dyesGrid.innerHTML += `<span class="text-primary">خ</span>`;
  dyesGrid.innerHTML += `<span class="text-primary">ج</span>`;
  dyesGrid.innerHTML += `<span class="text-primary">س</span>`;
  for (let i = 1; i <= firstDayNumOfMonth; i++) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
  for (
    let i = 1;
    i <= Calender.countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber);
    i++
  ) {
    let _hijri = new HijriDate(
      HijriConfiguration.hijriYear,
      HijriConfiguration.hijriMonth,
      i
    );
    let gregorian = _hijri.toGregorian();
    let GregorianDateIncrement = new Date(gregorian);
    let hasEvent = checkIfDateHasEvents(GregorianDateIncrement);
    if (
      Calender.theCurrentDate.getCurrentDateHijri() === i &&
      HijriConfiguration.hijriMonth == currentMonthHijri
    ) {
      dyesGrid.innerHTML += `<span data-current_date="${GregorianDateIncrement}" data-has_event="${hasEvent}" class="active">${i} <em> ${GregorianDateIncrement.getDate()} </em>  </span>`;
    } else {
      dyesGrid.innerHTML += `<span data-current_date="${GregorianDateIncrement}" data-has_event="${hasEvent}" >${i} <em> ${GregorianDateIncrement.getDate()} </em></span>`;
    }
  }
  for (
    let i = 1;
    i <=
    35 -
      (firstDayNumOfMonth +
        Calender.countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber));
    i++
  ) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
}
let item = ""

function displayCalenderYear (year) {

  let theYear = year ? year : Calender.theCurrentDate.yearHijri;
  for (let i = 0; i < 12; i++) {
    let _hijri = new HijriDate(
      theYear,
      i + 1,
      1
    );
    let gregorian = _hijri.toGregorian();
    item = document.getElementById(`month-box-${i+ 1}`)
    displayCalenderGridYear(gregorian,item)
  }
  document.getElementById('theYear').textContent = `${Calender.theCurrentDate.yearHijri} هـ`
}




function goNextYear() {
  Calender.theCurrentDate.yearHijri += 1
  displayCalenderYear(Calender.theCurrentDate.yearHijri )
}
function goPrevYear() {
  Calender.theCurrentDate.yearHijri -= 1
  displayCalenderYear(Calender.theCurrentDate.yearHijri )
}
