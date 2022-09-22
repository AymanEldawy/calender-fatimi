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
  let yearCalc = parseInt(
    a2e(new Date().toLocaleDateString("ar-SA", { year: "numeric" }))
  );
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
  document.getElementById("bigCentury").innerHTML = parseInt(yearCalc / 210);
  prayerTimingDay();

  // Display first day in every month
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
  // display the closest events
  let eventsContainer = document.querySelector(".table-grid");
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
  // Fasting
  let theYear = theCurrentDate.getCurrentYearHijri();
  const yearNumber = theYear % 210;
  // Loop of month days
  function getDaysMonth(month) {
    let FastingDays = [];
    let monthCount = countDayOfMonth(month, yearNumber);

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
  let fastingListYear = [];
  for (let i = 1; i <= 12; i++) {
    if (i === 9) continue;
    fastingListYear.push(...getDaysMonth(i));
  }

  let stepOfCondition = 0;
  let fastGrid = document.querySelector(".fasting-grid");
  let fastingContainer = document.querySelector("#closestFasting .table-grid");
  for (let index = 0; index < fastingListYear.length; index++) {
    // three closest fasting days
    if (
      Date.parse(fastingListYear[index].date) > Date.parse(new Date()) &&
      stepOfCondition < 3
    ) {
      stepOfCondition++;
      fastingContainer.innerHTML += `<div class= "table-style-grid">
          <h4>${fastingListYear[index].title} <small>${
        fastingListYear[index].month
      }</small> </h4>
          <span class="timer-style timer ${
            Date.parse(fastingListYear[index].date) > Date.parse(new Date())
              ? ""
              : "completed"
          } ">${calculateDate(fastingListYear[index].date)}</span>
        </div>`;
    }
    // All fasting days in year
    let date = new Date(fastingListYear[index].date).toLocaleDateString(
      "ar-SA",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
    fastGrid.innerHTML += `
      <div class="fasting-item">
        <span>${calculateDate(fastingListYear[index].date)}</span>
        <p>${fastingListYear[index].title}</p>
        <span>${date}</span>
      </div>
      
    `;
  }
});

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
  `;
}
