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

const fastings = [
  { title: "اول خميس", date: "2022-08-03T22:00:00.000Z", month: "محرم" },
  { title: "اوسط أربعاء", date: "2022-08-09T22:00:00.000Z", month: "محرم" },
  { title: "أخر خميس", date: "2022-08-24T22:00:00.000Z", month: "محرم" },
  { title: "اول خميس", date: "2022-08-31T22:00:00.000Z", month: "صفر" },
  { title: "اوسط أربعاء", date: "2022-09-13T22:00:00.000Z", month: "صفر" },
  { title: "أخر خميس", date: "2022-09-21T22:00:00.000Z", month: "صفر" },
  { title: "اول خميس", date: "2022-09-28T22:00:00.000Z", month: "ربيع الاول" },
  {
    title: "اوسط أربعاء",
    date: "2022-10-11T22:00:00.000Z",
    month: "ربيع الاول",
  },
  { title: "أخر خميس", date: "2022-10-19T22:00:00.000Z", month: "ربيع الاول" },
  { title: "اول خميس", date: "2022-10-26T22:00:00.000Z", month: "ربيع الثاني" },
  {
    title: "اوسط أربعاء",
    date: "2022-11-08T22:00:00.000Z",
    month: "ربيع الثاني",
  },
  { title: "أخر خميس", date: "2022-11-16T22:00:00.000Z", month: "ربيع الثاني" },
  {
    title: "اول خميس",
    date: "2022-11-23T22:00:00.000Z",
    month: "جمادي الاولي",
  },
  {
    title: "اوسط أربعاء",
    date: "2022-12-06T22:00:00.000Z",
    month: "جمادي الاولي",
  },
  {
    title: "أخر خميس",
    date: "2022-12-21T22:00:00.000Z",
    month: "جمادي الاولي",
  },
  {
    title: "اول خميس",
    date: "2022-12-28T22:00:00.000Z",
    month: "جمادي الثاني",
  },
  {
    title: "اوسط أربعاء",
    date: "2023-01-03T22:00:00.000Z",
    month: "جمادي الثاني",
  },
  {
    title: "أخر خميس",
    date: "2023-01-18T22:00:00.000Z",
    month: "جمادي الثاني",
  },
  { title: "اول خميس", date: "2023-01-25T22:00:00.000Z", month: "رجب" },
  { title: "اوسط أربعاء", date: "2023-02-07T22:00:00.000Z", month: "رجب" },
  { title: "أخر خميس", date: "2023-02-15T22:00:00.000Z", month: "رجب" },
  { title: "اول خميس", date: "2023-02-22T22:00:00.000Z", month: "شبعان" },
  { title: "اوسط أربعاء", date: "2023-03-07T22:00:00.000Z", month: "شبعان" },
  { title: "أخر خميس", date: "2023-03-15T22:00:00.000Z", month: "شبعان" },
  { title: "اول خميس", date: "2023-04-26T22:00:00.000Z", month: "شوال" },
  { title: "اوسط أربعاء", date: "2023-05-02T22:00:00.000Z", month: "شوال" },
  { title: "أخر خميس", date: "2023-05-17T22:00:00.000Z", month: "شوال" },
  { title: "اول خميس", date: "2023-05-24T22:00:00.000Z", month: "ذو القعده" },
  {
    title: "اوسط أربعاء",
    date: "2023-05-30T22:00:00.000Z",
    month: "ذو القعده",
  },
  { title: "أخر خميس", date: "2023-06-14T22:00:00.000Z", month: "ذو القعده" },
  { title: "اول خميس", date: "2023-06-21T22:00:00.000Z", month: "ذو الحجة" },
  { title: "اوسط أربعاء", date: "2023-07-04T22:00:00.000Z", month: "ذو الحجة" },
  { title: "أخر خميس", date: "2023-07-12T22:00:00.000Z", month: "ذو الحجة" },
];
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

  // Fastings
  let fastGrid = document.getElementById("fastingGrid");
  if (fastings.length > 0) {
    for (let fasting of fastings) {
      // All fasting days in year
      let date = new Date(fasting.date).toLocaleDateString("ar-SA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      fastGrid.innerHTML += `
      <div class="fasting-item">
        <span>${calculateDate(fasting.date)}</span>
        <p>${fasting.title}</p>
        <span>${date}</span>
      </div>
      
    `;
    }
  } else {
    fastGrid.style.background = "#f00";
  }
  let stepOfCondition = 0;
  let fastingContainer = document.getElementById("closestFastingGrid");
  if (fastings.length > 0) {
    for (let index = 0; index < fastings.length; index++) {
      // three closest fasting days
      if (
        Date.parse(fastings[index].date) > Date.parse(new Date()) &&
        stepOfCondition < 3
      ) {
        stepOfCondition++;
        fastingContainer.innerHTML += `<div class= "table-style-grid">
        <h4>${fastings[index].title} <small>${
          fastings[index].month
        }</small> </h4>
        <span class="timer-style timer ${
          Date.parse(fastings[index].date) > Date.parse(new Date())
            ? ""
            : "completed"
        } ">${calculateDate(fastings[index].date)}</span>
      </div>`;
      }
    }
  } else {
    document.getElementById("closestFasting").style.background = "#fff022";
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
