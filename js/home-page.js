import {
  daysFormat,
  months,
  century,
  getCentury,
  leapYears,
  a2e,
  theCurrentDate,
  countDayOfMoth
} from "./calender-setup.js";
import { globalEvents } from "./global.js";
import { prayerTimingDay } from "./prayer-time.js";
import { weeks } from "./weeks.js";

let bigCenturyName = [
  "الاول",
  "الثاني",
  "الثالث",
  "الرابع",
  "الخامس",
  "السادس",
  "السابع",
];
window.addEventListener("DOMContentLoaded", () => {
  let yearCalc = parseInt(
    a2e(new Date().toLocaleDateString("ar-SA", { year: "numeric" }))
  );
  document.getElementById(
    "date"
  ).textContent = `${new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  })}`;
  document.getElementById("yearLeap").innerHTML = `السنة <span>${
    leapYears.includes(new Date().toLocaleDateString("ar-SA") % 210)
      ? "كبيسة"
      : "غير كبيسة"
  }</span>`;
  document.getElementById("bigCentury").innerHTML = `القرن <span>${getCentury(
    parseInt(yearCalc % 210)
  )}</span> الاصغر من القرن <span>${
    bigCenturyName[parseInt(yearCalc / 210)]
  }</span> الاكبر`;
  prayerTimingDay();


  let hours = new Date().getHours();
  let day = new Date().getDay();
  if (hours > 5 && hours <= 18) {
    let planetNow = weeks[`${day}light`][(hours + 6) % 12];
    displayPlanetNow(planetNow)
   
  } else {
    let planetNow = weeks[`${day}night`][(hours + 6) % 12];
    displayPlanetNow(planetNow)
  }
});

function displayPlanetNow(planetNow) {
  let timeNowElement = document.getElementById("timeNow")
  timeNowElement.classList.add(`border-${planetNow.status}`);
  timeNowElement.innerHTML = `
  <span class="status-${planetNow.status}">${planetNow.planet}</span>
  <p>${planetNow.msg}</p>
`;
}

function testMonthDays() {
  const yearNumber = theCurrentDate.getCurrentYearHijri() % 210;
  let theMonth = countDayOfMoth(theCurrentDate.getCurrentMonthHijri(), yearNumber)
  console.log(theMonth)
  let listOfDateEvents = []
  for(let eventDate of globalEvents) {
    if(!(Date.parse(new Date()) > Date.parse(eventDate.date))) {
      console.log(eventDate.date, eventDate.title);
      break;
    }
  }
  // var arr = [new Date(2012, 7, 1), new Date(2012, 7, 4), new Date(2012, 7, 5), new Date(2013, 2, 20)];
  // var diffdate = new Date(2012, 7, 11);
  
  // arr.sort(function(a, b) {
  //     var distancea = Math.abs(diffdate - a);
  //     var distanceb = Math.abs(diffdate - b);
  //     return distancea - distanceb; // sort a before b when the distance is smaller
  // });
  

} 

testMonthDays()