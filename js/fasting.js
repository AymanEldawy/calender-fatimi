import * as Calender from "./calender-setup.js";
import { calculateDate } from "./global.js";

function getFastingDays(month) {
  let FastingDays = [];
  let theYear = Calender.theCurrentDate.getCurrentYearHijri();
  const yearNumber = theYear % 210;
  let monthCount = Calender.countDayOfMonth(month, yearNumber);
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
        month: Calender.months[month],
      });
    }
    if (weekDay === "الأربعاء" && i >= 12 && i <= 18) {
      FastingDays.push({
        title: "اوسط أربعاء",
        date: GregorianDateIncrement,
        month: Calender.months[month],
      });
    }
    if (weekDay === "الخميس" && i >= startLastThr && i <= monthCount) {
      FastingDays.push({
        title: "أخر خميس",
        date: GregorianDateIncrement,
        month: Calender.months[month],
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
  let fastingContainer = document.getElementById("closestFasting");
  let count = fasting.length > 3 ? 3 : fasting.length;
  for (let i = 0; i < count; i++) {
    let grid = document.createElement("div");
    grid.className = "table-style-grid";
    grid.innerHTML = `
      <h4>${fasting[i].title} <small>${fasting[i].month}</small> </h4>
      <span class="timer-style timer ${
        Date.parse(fasting[i].date) > Date.parse(new Date()) ? "" : "completed"
      } ">${calculateDate(fasting[i].date)}</span>
    `;
    fastingContainer.append(grid);
  }
}

function displayGridFasting() {
  let fastingList = closestFast(true);
  let fastGrid = document.createElement("div");
  fastGrid.className = "fasting-grid";

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
  document.querySelector("._modal-fasting").appendChild(fastGrid);
}

window.addEventListener("DOMContentLoaded", () => {
  displayClosestFasting();
  displayGridFasting();
});
