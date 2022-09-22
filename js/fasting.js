import { a2e, countDayOfMonth, months, theCurrentDate } from "./calender-setup.js";
import { calculateDate, globalEvents } from "./global.js";

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
  let fastingContainer = document.querySelector("#closestFasting .table-grid");
  let count = fasting.length > 3 ? 3 : fasting.length;
  for (let i = 0; i < count; i++) {
    fastingContainer.innerHTML += `<div class= "table-style-grid">
      <h4>${fasting[i].title} <small>${fasting[i].month}</small> </h4>
      <span class="timer-style timer ${
        Date.parse(fasting[i].date) > Date.parse(new Date()) ? "" : "completed"
      } ">${calculateDate(fasting[i].date)}</span>
    </div>`;
  }
}

function displayGridFasting() {
  let fastingList = closestFast(true);
  let fastGrid = document.querySelector(".fasting-grid");
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
}

function displayClosestEvent(events) {
  let eventsContainer = document.querySelector(".table-grid");
  let count = events.length > 3 ? 3 : events.length;
  for (let i = 0; i < count; i++) {
    eventsContainer.innerHTML += `
    <div class="table-style-grid">
      <h4>${events[i].title}</h4>
      <span class="timer-style timer">${calculateDate(events[i].date)}</span>
    </div>`;
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
  return div;
}

function displayRowFirstDayOfMonth() {
  let yearCalc = parseInt(
    a2e(new Date().toLocaleDateString("ar-SA", { year: "numeric" }))
  );
  for (let i = 1; i <= 12; i++) {
    let _hijri = new HijriDate(yearCalc, i, 1);
    document.querySelector(".row-first-days").append(createColDate(_hijri));
  }
}
window.addEventListener("DOMContentLoaded", () => {
  displayGridFasting();
  displayClosestFasting();
  getAllFastingDays();
  displayRowFirstDayOfMonth();
});
