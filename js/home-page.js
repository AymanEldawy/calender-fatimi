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
import { calculateDate, globalEvents } from "./global.js";
import { prayerTimingDay } from "./prayer-time.js";
import { weeks } from "./weeks.js";

let bigCenturyName = ["1", "2", "3", "4", "5", "6", "7"];

let yearCalc = parseInt(
  a2e(new Date().toLocaleDateString("ar-SA", { year: "numeric" }))
);
const yearNumber = yearCalc % 210;
let firstDayOfYear = daysFormat[century[yearNumber]];
let firstWeekDayOfYear = firstDayOfYear.day; // weekday not used
console.log(firstDayOfYear);
// let currentYearHijri = theCurrentDate.getCurrentYearHijri();
// let currentMonthHijri = theCurrentDate.getCurrentMonthHijri();
// let currentDayNumHijri = theCurrentDate.getCurrentDateHijri();

let firstDayNumOfMonth =
  (countOfMonthDays(2 - 1, yearNumber) + parseInt(firstDayOfYear.count)) % 7; // calculate the first weekDay of month
console.log(firstDayNumOfMonth);
console.log(daysFormat[Object.keys(daysFormat)[firstDayNumOfMonth]]);

function createColDate(hijriDate) {
  let div = document.createElement("div");
  let gregorian = hijriDate.toGregorian();
  let GregorianDateIncrement = new Date(gregorian);
  console.log(
    GregorianDateIncrement.toLocaleDateString("ar-SA", { weekday: "long" })
  );

  div.innerHTML = `
    <p>${ GregorianDateIncrement.toLocaleDateString("ar-EG", { weekday: "long"})}</p>
    <p>1 ${months[hijriDate._month]}</p>
    <p>${ GregorianDateIncrement.toLocaleDateString("ar-EG", { day: "numeric", month: "long" })}</p>
  `;
  document.querySelector('.row-first-days').append(div)
}

function displayRowFirstDayOfMonth() {
  for (let i = 1; i <= 12; i++) {
    let _hijri = new HijriDate(yearCalc, i, 1);
    createColDate(_hijri)
  }
}

window.addEventListener("DOMContentLoaded", () => {
  
  displayRowFirstDayOfMonth();
  document.getElementById(
    "date"
  ).textContent = `${new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  })}`;
  document.getElementById("yearLeap").innerHTML = leapYears.includes(
    new Date().toLocaleDateString("ar-SA") % 210
  )
    ? "نعم"
    : "لا";
  document.getElementById("firstDayOfYear").innerHTML =
    daysFormat[century[yearCalc % 210]].day;
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
  if (hours > 5 && hours < 18) {
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
    let planetNow = weeks[`${day}night`][(hours + 6) % 12];
    let planetNext = weeks[`${day}night`][(hours + 7) % 12];
    if (hours == 0 && hours + 7 > 18) {
      planetNext = weeks[`${day}night`][(hours + 18) % 12];
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

window.addEventListener('click', (e) => {
  if(e.target.matches('._modal-days')){
    e.target.classList.add('hide')
  }
  if(e.target.matches('.table-style:first-of-type .table-style-item .table-style-value')){
    document.querySelector('._modal-days').classList.remove('hide')
  }
})