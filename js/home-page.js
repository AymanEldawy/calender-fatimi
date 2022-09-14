import {
  daysFormat,
  months,
  century,
  getCentury,
  leapYears,
  a2e,
  theCurrentDate,
  countDayOfMoth,
  countOfMonthDays,
} from "./calender-setup.js";

import {
  calculateDate,
  globalEvents,
  latAndLong,
  storageLocation,
} from "./global.js";
import { weeks } from "./weeks.js";
import SunCalc from "./suncalc.js";

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
  displayRowFirstDayOfMonth();
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
});
function displayClosestEvent(event) {
  document.getElementById("closestEvent").innerHTML = `
    <span>${event.title}</span>
    <div class="timer">
      باقي من الوقت
      <span class="timer-style">${calculateDate(event.date)}</span>
    </div>
  `;
}
function testMonthDays() {
  const yearNumber = theCurrentDate.getCurrentYearHijri() % 210;
  let theMonth = countDayOfMoth(
    theCurrentDate.getCurrentMonthHijri(),
    yearNumber
  );
  for (let eventDate of globalEvents) {
    if (!(Date.parse(new Date()) > Date.parse(eventDate.date))) {
      displayClosestEvent(eventDate);
      break;
    }
  }
}

testMonthDays();

window.addEventListener("click", (e) => {
  if (e.target.matches("._modal-days")) {
    e.target.classList.add("hide");
  }
  if (
    e.target.matches(
      ".table-style:first-of-type .table-style-item"
    )
  ) {
    document.querySelector("._modal-days").classList.remove("hide");
  }
});

function getAserTime(timeDhuhr) {

  let timeAsr = timeDhuhr.split(':') 
  timeAsr[0] = parseInt(timeAsr[0]) + 2  

  return timeAsr.join(":");
}

// // Fetch Prayer Time
async function getPrayTimeByDate(month, year) {

  // // `https://api.aladhan.com/v1/calendarByCity?city=${latAndLong.city}&country=${latAndLong.country}%20Kingdom&method=2&month=${month}&year=${year}`
  // `http://api.aladhan.com/v1/timings/1398332113?latitude=${latitude}&longitude=${longitude}&method=2`
  let prayerTime = await fetch(
    `http://api.aladhan.com/v1/timings/${1662997324305 / 1000}?latitude=${latAndLong.latitude}&longitude=${latAndLong.longitude}&method=4`
    // `http://api.aladhan.com/v1/timingsByCity?city=${latAndLong.city}&country=${latAndLong.country}&method=8`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return prayerTime;
}

async function prayerTimingDay(date = new Date()) {
  // let prayerTime = await getPrayTimeByDate(date);
  let prayerTime = await getPrayTimeByDate(
    theCurrentDate.getCurrentMonthHijri(),
    theCurrentDate.getCurrentYearHijri()
  );
  if (!prayerTime) return;
  let prayGrid = document.querySelector(".prayer-grid");
  prayGrid.innerHTML = `
  <div class="prayer-grid-item">
      <span>الفجر</span>
      <span>${prayerTime.data.timings.Fajr} </span>
  </div>
  <div class="prayer-grid-item">
      <span>الشروق</span>
      <span>${prayerTime.data.timings.Sunrise}</span>
  </div>
  <div class="prayer-grid-item">
      <span>الظهر</span>
      <span>${prayerTime.data.timings.Dhuhr}</span>
  </div>
  <div class="prayer-grid-item">
      <span>العصر</span>
      <span>${getAserTime(prayerTime.data.timings.Dhuhr)}</span>
  </div>
  <div class="prayer-grid-item">
      <span>المغرب</span>
      <span>${prayerTime.data.timings.Maghrib}</span>
  </div>
  <div class="prayer-grid-item">
      <span>العشاء</span>
      <span>${prayerTime.data.timings.Isha}</span>
  </div>
  `;
}
