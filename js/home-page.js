import {
  daysFormat,
  months,
  century,
  getCentury,
  leapYears,
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
    let currentDate = new Date(theNewDate);
    let hijri = currentDate.toHijri();
    hijri.addDay();
    let tomorrow = hijri.toGregorian();
    return new Date(tomorrow);
  } else {
    return theNewDate;
  }
}

function resetDateHijri() {
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
    let currentDate = new Date();
    let hijri = currentDate.toHijri();
    hijri.addDay();
    return `${hijri._date} ${months[hijri._month]} ${hijri._year}`;
  } else {
    let currentDate = new Date();
    let hijri = currentDate.toHijri();
    return `${hijri._date} ${months[hijri._month]} ${hijri._year}`;
  }
}

let theCurrentYearHijri = 1444;
window.addEventListener("DOMContentLoaded", () => {
  let date = new Date();
  let yearCalc = date.toHijri()._year;
  theCurrentYearHijri = yearCalc;
  let theHours = new Date().getHours();
  document.getElementById("date").textContent = resetDateHijri();
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
    parseInt(yearCalc / 210) + 1;
  prayerTimingDay();
  starterMonthOfYear(theCurrentYearHijri);
  document.getElementById("goPrevYear").addEventListener("click", () => {
    theCurrentYearHijri -= 1;
    starterMonthOfYear(theCurrentYearHijri);
  });
  document.getElementById("goNextYear").addEventListener("click", () => {
    theCurrentYearHijri += 1;
    starterMonthOfYear(theCurrentYearHijri);
  });
  // display the closest events
  let eventsContainer = document.querySelector("#closestEvent .table-grid");
  let MAX_STEPS = 0;
  for (let index = 0; index < globalEvents.length; index++) {
    if (
      !(Date.parse(new Date()) > Date.parse(globalEvents[index].date)) &&
      MAX_STEPS < 3
    ) {
      MAX_STEPS++;
      eventsContainer.innerHTML += `
      <div class="table-style-grid">
        <h4>${globalEvents[index].title}</h4>
        <span class="timer-style timer">${calculateDate(
          globalEvents[index].date
        )}</span>
      </div>`;
    }
  }
});

function starterMonthOfYear(yearCalc) {
  // Display first day in every month
  let date = new Date();
  let theCurrentYear = date.toHijri()._year;
  if (yearCalc === theCurrentYear) {
    document.getElementById("backToStarterYear").classList.add("hide");
  } else {
    document.getElementById("backToStarterYear").classList.remove("hide");
  }
  document.querySelector(".row-first-days").innerHTML = "";
  document.querySelector(
    "._modal-days ._modal-title span"
  ).innerHTML = `بداية شهور السنة (${yearCalc})`;
  for (let i = 1; i <= 12; i++) {
    let _hijri = new HijriDate(yearCalc, i, 1);
    let gregorian = _hijri.toGregorian();
    let GregorianDateIncrement = new Date(gregorian);
    document.querySelector(".row-first-days").innerHTML += `
      <div>
        <p>الاول من ${months[_hijri._month]}</p>
        <p>${GregorianDateIncrement.toLocaleDateString("ar-EG", {
          weekday: "long",
        })}</p>
        <p>${GregorianDateIncrement.toLocaleDateString("ar-EG", {
          day: "numeric",
          month: "long",
        })}</p>
      </div>
    `;
  }
}

window.addEventListener("click", (e) => {
  if (e.target.matches("._modal-days")) {
    e.target.classList.add("hide");
  }
  if (e.target.matches("._modal-days ._modal-title .btn")) {
    let date = new Date();
    let yearCalc = date.toHijri()._year;
    starterMonthOfYear(yearCalc);
  }
  if (e.target.matches(".table-style:first-of-type .table-style-item")) {
    let date = new Date();
    let yearCalc = date.toHijri()._year;
    starterMonthOfYear(yearCalc);
    document.querySelector("._modal-days").classList.remove("hide");
  }
  if (e.target.matches("._modal-fasting")) {
    e.target.classList.add("hide");
  }
  if (e.target.matches(".table-style .table-style-item#closestFasting")) {
    document.querySelector("._modal-fasting").classList.remove("hide");
  }
});

function prayerTimingDay(date = new Date()) {
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
  <div class="prayer-grid-item">
      <span>منتصف الليل</span>
      <span>${prayerTime.MidNight}</span>
  </div>
  `;
}



