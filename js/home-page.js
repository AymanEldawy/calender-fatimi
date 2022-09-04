import {
  daysFormat,
  months,
  century,
  getCentury,
  leapYears,
  a2e,
  theCurrentDate,
  countDayOfMoth,
} from "./calender-setup.js";
import { calculateDate, globalEvents } from "./global.js";
import { prayerTimingDay } from "./prayer-time.js";
import { weeks } from "./weeks.js";

let bigCenturyName = ["1", "2", "3", "4", "5", "6", "7"];
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
    console.log("run", hours);
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
    console.log("run n", hours);

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

function displayPlanetNow(planetNow) {
  let timeNowElement = document.getElementById("timeNow");
  timeNowElement.classList.add(`border-${planetNow.status}`);
  timeNowElement.innerHTML = `
  <span class="status-${planetNow.status}">${planetNow.planet}</span>
  <p>${planetNow.msg}</p>
`;
}

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
  console.log(theMonth);
  for (let eventDate of globalEvents) {
    if (!(Date.parse(new Date()) > Date.parse(eventDate.date))) {
      displayClosestEvent(eventDate);
      break;
    }
  }
}

testMonthDays();
