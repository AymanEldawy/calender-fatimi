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

import { calculateDate, globalEvents, storageLocation } from "./global.js";
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
let firstDayOfYear = daysFormat[century[yearNumber]];
let firstWeekDayOfYear = firstDayOfYear.day; // weekday not used
// let currentYearHijri = theCurrentDate.getCurrentYearHijri();
// let currentMonthHijri = theCurrentDate.getCurrentMonthHijri();
// let currentDayNumHijri = theCurrentDate.getCurrentDateHijri();

let firstDayNumOfMonth =
  (countOfMonthDays(2 - 1, yearNumber) + parseInt(firstDayOfYear.count)) % 7; // calculate the first weekDay of month

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
  let sunCalc = SunCalc.getTimes(new Date(),LOCATION.latitude,LOCATION.longitude)
  console.log(parseInt(`${sunCalc.sunset.getHours()}${sunCalc.sunset.getMinutes()}`))
  console.log(sunCalc.sunset.getHours(), sunCalc.sunset.getMinutes())
  console.log(new Date().getHours(),new Date().getMinutes())
  console.log(parseInt(`${new Date().getHours()}${new Date().getMinutes()}`) )
  if (
    parseInt(`${new Date().getHours().toString().padStart(2,0)}${new Date().getMinutes().toString().padStart(2,0)}`) >
    parseInt(`${sunCalc.sunset.getHours().toString().padStart(2,0)}${sunCalc.sunset.getMinutes().toString().padStart(2,0)}`)
  ) {
    let setDate = theNewDate.setDate(theNewDate.getDate() + 1)
    console.log(theNewDate)
    console.log(setDate)
    return new Date(setDate)
  } else {
    return theNewDate
  }
}

window.addEventListener("DOMContentLoaded", () => {
  displayRowFirstDayOfMonth();
  let theHours = new Date().getHours();
  document.getElementById(
    "date"
  ).textContent = `${resetDate(new Date()).toLocaleDateString("ar-SA", {
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
  document.getElementById("dayWeek").innerHTML = theHours > 5 && theHours < 18 ? `يوم ${resetDate(new Date()).toLocaleDateString(
    "ar-SA",
    { weekday: "long" }
  )}` : `ليلة ${resetDate(new Date()).toLocaleDateString(
    "ar-SA",
    { weekday: "long" }
  )}`;
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
      ".table-style:first-of-type .table-style-item .table-style-value"
    )
  ) {
    document.querySelector("._modal-days").classList.remove("hide");
  }
});

// Prayer time
function repeatPrayerTime(AfterSunset = new Date()) {
  let sunCalc = SunCalc.getTimes(
    /*Date*/ AfterSunset,
    /*Number*/ LOCATION.latitude,
    /*Number*/ LOCATION.longitude
  );
  let sunsetStr = sunCalc.sunset.getHours() + ":" + sunCalc.sunset.getMinutes();
  let sunriseStr =
    sunCalc.sunrise.getHours() + ":" + sunCalc.sunrise.getMinutes();
  let dayLen = `${
    parseInt(sunsetStr.split(":")[0]) - parseInt(sunriseStr.split(":")[0])
  }:${
    parseInt(sunsetStr.split(":")[1]) - parseInt(sunriseStr.split(":")[1])
  }`.split(":");

  function resetPrayerTime(hours, minutes) {
    if (minutes > 59) {
      hours += 1;
      minutes = minutes % 60;
    }
    if (minutes < 0) {
      hours -= 1;
      minutes = 60 - minutes;
    }

    return `${hours.toString().padStart(2, 0)}:${minutes
      .toString()
      .padStart(2, 0)}`;
  }
  // Calculate Fajr Time
  let fajrCalcTime =
    parseInt(sunriseStr.split(":")[0]) * 60 +
    parseInt(sunriseStr.split(":")[1]) -
    75;
  let fajrHours = parseInt(fajrCalcTime / 60);
  let fajrMinutes = parseInt(
    (parseFloat(fajrCalcTime / 60)
      .toFixed(2)
      .split(".")[1] *
      60) /
      60
  );
  let timeFajr = resetPrayerTime(fajrHours, fajrMinutes);

  // Calculate sunrise Time
  let timeSunrise = `${parseInt(sunriseStr.split(":")[0])
    .toString()
    .padStart(2, 0)}:${parseInt(sunriseStr.split(":")[1])
    .toString()
    .padStart(2, 0)}`;

  // Calculate Dhuhr Time
  let sunriseFullMinutes =
    parseInt(sunriseStr.split(":")[0]) * 60 +
    parseInt(sunriseStr.split(":")[1]);
  let dayLenLight = parseInt(dayLen[0]) * 60 + parseInt(dayLen[1]);

  let DhuhrFullTime =
    parseInt((dayLenLight / 12) * 7 + sunriseFullMinutes) / 60;
  let DhuhrHours = parseInt(DhuhrFullTime);
  let DhuhrMinutes = Math.round(
    parseFloat(`.${DhuhrFullTime.toFixed(2).split(".")[1]}`) * 60
  );
  let timeDhuhr = resetPrayerTime(DhuhrHours, DhuhrMinutes);

  // Calculate Aser Time
  let aserHours = (DhuhrHours + 2) % 12;
  let timeAser = resetPrayerTime(aserHours, DhuhrMinutes);

  // Calculate Maghrib Time
  let timeMaghrib = `${(parseInt(sunsetStr.split(":")[0]) % 12)
    .toString()
    .padStart(2, 0)}:${parseInt(sunsetStr.split(":")[1])
    .toString()
    .padStart(2, 0)}`;

  // Calculate Isha Time
  let IshaCalcTime =
    parseInt(sunsetStr.split(":")[0]) * 60 +
    parseInt(sunsetStr.split(":")[1]) +
    90;
  let IshaHours = parseInt(IshaCalcTime / 60) % 12;
  let IshaMinutes = Math.round(
    `.${
      parseFloat(IshaCalcTime / 60)
        .toFixed(2)
        .split(".")[1]
    }` * 60
  );
  let timeIsha = resetPrayerTime(IshaHours, IshaMinutes);

  return {
    Fajr: timeFajr,
    Sunrise: timeSunrise,
    Dhuhr: timeDhuhr,
    Asr: timeAser,
    Maghrib: timeMaghrib,
    Isha: timeIsha,
  };
}

async function prayerTimingDay(date = new Date()) {
  // let prayerTime = await getPrayTimeByDate(date);
  let prayerTime = repeatPrayerTime();
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
      <span>${prayerTime.Dhuhr}</span>
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
