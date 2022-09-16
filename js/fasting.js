import * as Calender from "./calender-setup.js";
import { calculateDate } from "./global.js";

function getFastingDays(nextMonth) {
  let FastingDays = [];
  let currentMonth = Calender.theCurrentDate.getCurrentMonthHijri();
  let theMonth = nextMonth ? currentMonth + 1 : currentMonth;
  let theYear = Calender.theCurrentDate.getCurrentYearHijri();
  if (nextMonth > 12) {
    theYear++;
    nextMonth = 1;
  } else if (nextMonth == 8) {
    nextMonth = 9;
  }
  const yearNumber = theYear % 210;
  let monthCount = Calender.countDayOfMonth(theMonth, yearNumber);
  // Loop of month days
  for (let i = 1; i <= monthCount; i++) {
    let _hijri = new HijriDate(theYear, theMonth, i);
    let gregorian = _hijri.toGregorian();
    let GregorianDateIncrement = new Date(gregorian);
    let weekDay = GregorianDateIncrement.toLocaleDateString("ar-SA", {
      weekday: "long",
    });
    if (weekDay === "الخميس" && i <= 6) {
      FastingDays.push({ title: "اول خميس", date: GregorianDateIncrement });
    }
    if (weekDay === "الأربعاء" && i > 12 && i <= 18) {
      FastingDays.push({ title: "اوسط أربعاء", date: GregorianDateIncrement });
    }
    if (weekDay === "الخميس" && i >= 22 && i <= monthCount) {
      FastingDays.push({ title: "أخر خميس", date: GregorianDateIncrement });
    }
  }
  console.log(FastingDays);
  return FastingDays;
}

function closestFast(nextMonth) {
  let fastingList = getFastingDays(nextMonth);
  console.log(fastingList);
  let theClosestF = "";
  let storage = [];
  for (let index = 0; index < fastingList.length; index++) {
    if (Date.parse(fastingList[index].date) > Date.parse(new Date())) {
      storage.push(fastingList[index]);
    }
  }
  if (storage.length) theClosestF = storage[0];
  return theClosestF ? theClosestF : closestFast(true);
}

function displayClosestFasting() {
  let fast = closestFast();
  console.log(fast);
  document.querySelector("#closestFasting h4").textContent = fast.title;
  document.querySelector("#closestFasting .timer").innerHTML = `
      <span class="timer-style">${calculateDate(fast.date)}</span>
  `;
}

function displayGridFasting() {
  let fastingList = getFastingDays();
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
