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

let bigCenturyName = ["1", "2", "3", "4", "5", "6", "7"];

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
    <p>${GregorianDateIncrement.toLocaleDateString("ar-EG", {
      weekday: "long",
    })}</p>
    <p>1 ${months[hijriDate._month]}</p>
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

window.addEventListener("DOMContentLoaded", () => {
  displayRowFirstDayOfMonth();
  document.getElementById(
    "date"
  ).textContent = `${new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
  document.getElementById("yearLeap").innerHTML = leapYears.includes(
    new Date().toLocaleDateString("ar-SA") % 210
  )
    ? "نعم"
    : "لا";
  document.getElementById("firstDayOfYear").innerHTML =
    daysFormat[century[yearCalc % 210]].count + 1;
  document.getElementById("dayWeek").innerHTML = new Date().toLocaleDateString(
    "ar-SA",
    { weekday: "long" }
  );
  document.getElementById("smallCentury").innerHTML = getCentury(
    parseInt(yearCalc % 210)
  );
  document.getElementById("bigCentury").innerHTML =
    bigCenturyName[parseInt(yearCalc / 210)];
  prayerTimingDay();

  let hours = new Date().getHours();
  let day = new Date().getDay();
  let timeNow = document.getElementById("timeNow");
  let timeNext = document.getElementById("timeNext");

  // Times
  let sunCalc = SunCalc.getTimes(
    /*Date*/ new Date(),
    /*Number*/ LOCATION.latitude,
    /*Number*/ LOCATION.longitude
  );
  let sunriseStr =
    sunCalc.sunrise.getHours() + ":" + sunCalc.sunrise.getMinutes();
  let sunsetStr = sunCalc.sunset.getHours() + ":" + sunCalc.sunset.getMinutes();

  let dayLen = `${
    parseInt(sunsetStr.split(":")[0]) - parseInt(sunriseStr.split(":")[0])
  }:${
    parseInt(sunsetStr.split(":")[1]) - parseInt(sunriseStr.split(":")[1])
  }`.split(":");
  let dayLenLight = parseInt(dayLen[0]) * 60 + parseInt(dayLen[1]);
  let dayLenNight = 1440 - dayLenLight;
  let date = new Date();

  if (
    hours > parseInt(sunriseStr.split(":")[0]) &&
    hours < parseInt(sunsetStr.split(":")[0])
  ) {
    let theHoursNext = parseInt(((dayLenLight / 12) * (hours + 1)) / 60);
    let theMinutesNext = ((dayLenLight / 12) * (hours + 1)) % 60;
    let finallyMinutes =
      (theHoursNext - date.getHours()) * 60 +
      (theMinutesNext - date.getMinutes());
    // console.log(theHoursNext, theMinutesNext);
    // console.log(finallyMinutes);

    let planetNow = weeks[`${day}light`][(hours + 18) % 12];
    let planetNext = weeks[`${day}light`][(hours + 19) % 12];
    if (hours + 18 < 24) {
      planetNext = weeks[`${day}night`][(hours + 6) % 12];
    }
    timeNow.innerHTML = planetNow.planet;
    timeNow.classList.add(`status-${planetNow.status}`);
    timeNext.innerHTML = planetNext.planet;
    timeNext.classList.add(`status-${planetNext.status}`);
  } else {
    let theHoursNight = parseInt(((dayLenNight / 12) * hours) / 60);
    let theMinutesNight = ((dayLenNight / 12) * hours) % 60;
    // console.log(theHoursNight, theMinutesNight);

    let planetNow = weeks[`${(day + 1 ) % 7}night`][(hours + 6) % 12];
    let planetNext = weeks[`${(day + 1 ) % 7}night`][(hours + 7) % 12];
    if (hours == 0 && hours + 7 > 18) {
      planetNext = weeks[`${(day + 1 ) % 7}night`][(hours + 18) % 12];
    }
    timeNow.innerHTML = planetNow.planet;
    timeNow.classList.add(`status-${planetNow.status}`);
    timeNext.innerHTML = planetNext.planet;
    timeNext.classList.add(`status-${planetNext.status}`);
  }
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
export function repeatPrayerTime(theDate = new Date()) {
  let sunCalc = SunCalc.getTimes(
    /*Date*/ theDate,
    /*Number*/ LOCATION.latitude,
    /*Number*/ LOCATION.longitude
  );
  let sunriseStr =
    sunCalc.sunrise.getHours() + ":" + sunCalc.sunrise.getMinutes();
  let sunsetStr = sunCalc.sunset.getHours() + ":" + sunCalc.sunset.getMinutes();
  let dayLen = `${
    parseInt(sunsetStr.split(":")[0]) - parseInt(sunriseStr.split(":")[0])
  }:${
    parseInt(sunsetStr.split(":")[1]) - parseInt(sunriseStr.split(":")[1])
  }`.split(":");
  // Calculate Fajr Time
  let fajrCalcTime = (parseInt(sunriseStr.split(":")[0]) * 60 )+ parseInt(sunriseStr.split(":")[1]) - 75
  let fajrHours = parseInt(fajrCalcTime / 60);
  let fajrMinutes = parseInt(parseFloat(fajrCalcTime / 60).toFixed(2).split('.')[1] * 60 / 60 ) ;
  let timeFajr = `${fajrHours.toString().padStart(2, 0)}:${fajrMinutes.toString().padStart(2, 0)}`

  // Calculate sunrise Time
  let timeSunrise = `${parseInt(sunriseStr.split(':')[0]).toString().padStart(2, 0)}:${parseInt(sunriseStr.split(':')[1]).toString().padStart(2, 0)}`


  // Calculate Dhuhr Time
  let sunriseFullMinutes = (parseInt(sunriseStr.split(":")[0]) * 60 ) + parseInt(sunriseStr.split(":")[1])
  let dayLenLight = parseInt(dayLen[0]) * 60 + parseInt(dayLen[1]);

  let DhuhrFullTime = (parseInt(((dayLenLight / 12) * 7) + sunriseFullMinutes) / 60)
  let DhuhrHours = parseInt(DhuhrFullTime);
  let DhuhrMintes = Math.round(parseFloat(`.${DhuhrFullTime.toFixed(2).split('.')[1]}`) * 60);
  let timeDhuhr = `${DhuhrHours.toString().padStart(2, 0)}:${DhuhrMintes.toString().padStart(2, 0)}`
  
  // Calculate Aser Time
  let aserHours = (DhuhrHours + 2 ) % 12
  let timeAser = `${aserHours.toString().padStart(2, 0)}:${DhuhrMintes.toString().padStart(2, 0)}`
  
  // Calculate Maghrib Time
  let timeMaghrib = `${(parseInt(sunsetStr.split(':')[0]) % 12).toString().padStart(2, 0)}:${parseInt(sunsetStr.split(':')[1]).toString().padStart(2, 0)}`

  // Calculate Isha Time
  let IshaCalcTime = (parseInt(sunsetStr.split(":")[0]) * 60 ) + parseInt(sunsetStr.split(":")[1]) + 90
  let IshaHours = parseInt(IshaCalcTime / 60) % 12;
  let IshaMinutes = Math.round((`.${parseFloat(IshaCalcTime / 60).toFixed(2).split('.')[1]}`) * 60) ;
  let timeIsha = `${IshaHours.toString().padStart(2, 0)}:${IshaMinutes.toString().padStart(2, 0)}`
  
  return {
    Fajr: timeFajr,
    Sunrise: timeSunrise,
    Dhuhr: timeDhuhr,
    Asr: timeAser,
    Maghrib: timeMaghrib,
    Isha: timeIsha,
  }
} 



// async function getPrayTimeByDate(date = new Date()) {
//   let prayerTime = await fetch(
//     `https://api.aladhan.com/v1/timings/${date}?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=2`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     });
//   return prayerTime;
// }

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
