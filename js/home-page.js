import {
  daysFormat,
  months,
  century,
  getCentury,
  leapYears,
  a2e,
  theCurrentDate,
  countDayOfMonth,
} from "./calender-setup.js";

import { calculateDate, globalEvents, storageLocation } from "./global.js";
import SunCalc from "./suncalc.js";
import { prayerTimings } from "./prayer-timings.js";

const PrayerTimeDefault = {
  month: 0, //current month
  year: 0, //current year
  latitude: "17.5065",
  longitude: "44.1316",
};
let LOCATION = storageLocation.fetchLocation() || PrayerTimeDefault;

export let bigCenturyName = ["1", "2", "3", "4", "5", "6", "7"];

let yearCalc = parseInt(
  a2e(new Date().toLocaleDateString("ar-SA", { year: "numeric" }))
);
const yearNumber = yearCalc % 210;

function createColDate(hijriDate) {
  let div = document.createElement("div");
  let gregorian = hijriDate.toGregorian();
  let GregorianDateIncrement = new Date(gregorian);

  div.innerHTML = `
    <p>الاول من ${months[hijriDate._month]}</p>
    <p>${GregorianDateIncrement.toLocaleDateString("ar-EG", {
      weekday: "long",
    })}</p>
    <p>${GregorianDateIncrement.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
    })}</p>
  `;
  document.querySelector(".row-first-days").append(div);
}

function displayRowFirstDayOfMonth() {
  for (let i = 1; i <= 12; i++) {
    let _hijri = new HijriDate(yearCalc, i, 1);
    createColDate(_hijri);
  }
}
function resetDate(theNewDate) {
  let sunCalc = SunCalc.getTimes(
    new Date(),
    LOCATION.latitude,
    LOCATION.longitude
  );
  if (
    parseInt(
      `${new Date().getHours().toString().padStart(2, 0)}${new Date()
        .getMinutes()
        .toString()
        .padStart(2, 0)}`
    ) >
    parseInt(
      `${sunCalc.sunset.getHours().toString().padStart(2, 0)}${sunCalc.sunset
        .getMinutes()
        .toString()
        .padStart(2, 0)}`
    )
  ) {
    let setDate = theNewDate.setDate(theNewDate.getDate() + 1);
    return new Date(setDate);
  } else {
    return theNewDate;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let theHours = new Date().getHours();
  document.getElementById("date").textContent = `${resetDate(
    new Date()
  ).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
  document.getElementById("yearLeap").innerHTML = leapYears.includes(
    resetDate(new Date()).toLocaleDateString("ar-SA") % 210
  )
    ? "نعم"
    : "لا";
  document.getElementById("firstDayOfYear").innerHTML =
    daysFormat[century[yearCalc % 210]].count + 1;
  document.getElementById("dayWeek").innerHTML =
    theHours > 5 && theHours < 18
      ? `يوم ${resetDate(new Date()).toLocaleDateString("ar-SA", {
          weekday: "long",
        })}`
      : `ليلة ${resetDate(new Date()).toLocaleDateString("ar-SA", {
          weekday: "long",
        })}`;
  document.getElementById("smallCentury").innerHTML = getCentury(
    parseInt(yearCalc % 210)
  );
  document.getElementById("bigCentury").innerHTML =
    bigCenturyName[parseInt(yearCalc / 210)];
  prayerTimingDay();
  displayGridFasting();
  displayClosestFasting();
  displayRowFirstDayOfMonth();
  getAllFastingDays();
});

function displayClosestEvent(events) {
  let eventsContainer = document.getElementById("closestEvent");
  let count = events.length > 3 ? 3 : events.length;
  for (let i = 0; i < count; i++) {
    let grid = document.createElement("div");
    grid.className = "table-style-grid";
    grid.innerHTML = `
      <h4>${events[i].title}</h4>
      <span class="timer-style timer">${calculateDate(events[i].date)}</span>
    `;
    eventsContainer.append(grid);
  }
}
function getAllFastingDays() {
  let list = [];
  for (let eventDate of globalEvents) {
    if (!(Date.parse(new Date()) > Date.parse(eventDate.date))) {
      list.push(eventDate);
    }
  }
  displayClosestEvent(list);
}

window.addEventListener("click", (e) => {
  if (e.target.matches("._modal-days")) {
    e.target.classList.add("hide");
  }
  if (e.target.matches(".table-style:first-of-type .table-style-item")) {
    document.querySelector("._modal-days").classList.remove("hide");
  }
  if (e.target.matches("._modal-fasting")) {
    e.target.classList.add("hide");
  }
  if (e.target.matches(".table-style .table-style-item#closestFasting")) {
    document.querySelector("._modal-fasting").classList.remove("hide");
  }
});

async function prayerTimingDay(date = new Date()) {
  // let prayerTime = await getPrayTimeByDate(date);
  let prayerTime = prayerTimings();
  if (!prayerTime) return;
  let prayGrid = document.querySelector(".prayer-grid");
  prayGrid.innerHTML = `
  <div class="prayer-grid-item">
      <span>الفجر</span>
      <span>${prayerTime.Fajr} </span>
  </div>
  <div class="prayer-grid-item">
      <span>الشروق</span>
      <span>${prayerTime.Sunrise}</span>
  </div>
  <div class="prayer-grid-item">
      <span>الظهر</span>
      <span>${prayerTime.Duher}</span>
  </div>
  <div class="prayer-grid-item">
      <span>العصر</span>
      <span>${prayerTime.Asr}</span>
  </div>
  <div class="prayer-grid-item">
      <span>المغرب</span>
      <span>${prayerTime.Maghrib}</span>
  </div>
  <div class="prayer-grid-item">
      <span>العشاء</span>
      <span>${prayerTime.Isha}</span>
  </div>
  `;
}

// Fasting

function getFastingDays(month) {
  let FastingDays = [];
  let theYear = theCurrentDate.getCurrentYearHijri();
  const yearNumber = theYear % 210;
  let monthCount = countDayOfMonth(month, yearNumber);
  // Loop of month days
  for (let i = 1; i <= monthCount; i++) {
    let startLastThr = monthCount > 29 ? 24 : 23;
    let _hijri = new HijriDate(theYear, month, i);
    let gregorian = _hijri.toGregorian();
    let GregorianDateIncrement = new Date(gregorian);
    let weekDay = GregorianDateIncrement.toLocaleDateString("ar-SA", {
      weekday: "long",
    });
    if (weekDay === "الخميس" && i <= 7) {
      FastingDays.push({
        title: "اول خميس",
        date: GregorianDateIncrement,
        month: months[month],
      });
    }
    if (weekDay === "الأربعاء" && i >= 12 && i <= 18) {
      FastingDays.push({
        title: "اوسط أربعاء",
        date: GregorianDateIncrement,
        month: months[month],
      });
    }
    if (weekDay === "الخميس" && i >= startLastThr && i <= monthCount) {
      FastingDays.push({
        title: "أخر خميس",
        date: GregorianDateIncrement,
        month: months[month],
      });
    }
  }
  return FastingDays;
}

function closestFast(all = false) {
  let fastingListYear = [];
  for (let i = 1; i <= 12; i++) {
    if (i === 9) continue;
    fastingListYear.push(...getFastingDays(i));
  }
  let storage = [];
  let stepOfCondition = 0;
  for (let index = 0; index < fastingListYear.length; index++) {
    if (
      Date.parse(fastingListYear[index].date) > Date.parse(new Date()) &&
      stepOfCondition < 3
    ) {
      storage.push(fastingListYear[index]);
      stepOfCondition++;
    }
  }
  if (storage.length > 0 && !all) return storage;
  else return fastingListYear;
}

function displayClosestFasting() {
  let fasting = closestFast();
  let fastingContainer = document.getElementById("closestFasting");
  let count = fasting.length > 3 ? 3 : fasting.length;
  for (let i = 0; i < count; i++) {
    let grid = document.createElement("div");
    grid.className = "table-style-grid";
    grid.innerHTML = `
      <h4>${fasting[i].title} <small>${fasting[i].month}</small> </h4>
      <span class="timer-style timer ${
        Date.parse(fasting[i].date) > Date.parse(new Date()) ? "" : "completed"
      } ">${calculateDate(fasting[i].date)}</span>
    `;
    fastingContainer.append(grid);
  }
}

function displayGridFasting() {
  let fastingList = closestFast(true);
  let fastModal = document.createElement("div");
  let fastGrid = document.createElement("div");
  fastModal.className = "fasting-modal";
  fastGrid.className = "fasting-grid";
  fastModal.innerHTML = `<div class="modal-tabs"><h4 class="_modal-title">الصيام</h4></div>`;
  for (let fast of fastingList) {
    let date = new Date(fast.date).toLocaleDateString("ar-SA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    fastGrid.innerHTML += `
      <div class="fasting-item">
        <span>${calculateDate(fast.date)}</span>
        <p>${fast.title}</p>
        <span>${date}</span>
      </div>
      
    `;
  }
  fastModal.appendChild(fastGrid);
  document.querySelector("._modal-fasting").appendChild(fastModal);
}
