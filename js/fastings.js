import { months, theCurrentDate, countDayOfMonth } from "./calender-setup.js";
import { calculateDate } from "./global.js";

let storageFasting = {
  fetchFastings() {
    let fastings = JSON.parse(localStorage.getItem("fastings"));
    return fastings && fastings.length ? fastings : [];
  },
  saveFastings(fastings) {
    localStorage.setItem("fastings", JSON.stringify(fastings));
  },
};
function insertFasting() {
  let fastings = storageFasting.fetchFastings();
  if (fastings.length > 0) return;
  let theYear = theCurrentDate.getCurrentYearHijri();
  const yearNumber = theYear % 210;
  // Loop of month days
  for (let index = 1; index <= 12; index++) {
    if (index === 9) continue;
    let monthCount = countDayOfMonth(index, yearNumber);
    for (let i = 1; i <= monthCount; i++) {
      let startLastThr = monthCount > 29 ? 24 : 23;
      let _hijri = new HijriDate(theYear, index, i);
      let gregorian = _hijri.toGregorian();
      let GregorianDateIncrement = new Date(gregorian);
      let weekDay = GregorianDateIncrement.toLocaleDateString("ar-SA", {
        weekday: "long",
      });
      if (weekDay === "الخميس" && i <= 7) {
        fastings.push({
          title: "اول خميس",
          date: GregorianDateIncrement,
          month: months[index],
        });
      }
      if (weekDay === "الأربعاء" && i >= 12 && i <= 18) {
        fastings.push({
          title: "اوسط أربعاء",
          date: GregorianDateIncrement,
          month: months[index],
        });
      }
      if (weekDay === "الخميس" && i >= startLastThr && i <= monthCount) {
        fastings.push({
          title: "أخر خميس",
          date: GregorianDateIncrement,
          month: months[index],
        });
      }
    }
  }
  storageFasting.saveFastings(fastings);
}

window.addEventListener("DOMContentLoaded", () => {
  insertFasting();
  let fastings = storageFasting.fetchFastings();
  // Fastings
  let fastGrid = document.getElementById("fastingGrid");
  let count = 0;
  let date = new Date();
  let minusDay = date.setDate(date.getDate() - 1);
  let id = ''
  for (let fasting of fastings) {
    if (Date.parse(fasting.date) >= Date.parse(new Date(minusDay)) && count < 1) {
      count++;
      id = 'closestFastingItem';
    }
    let date = new Date(fasting.date).toLocaleDateString("ar-SA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    fastGrid.innerHTML += `
    <div class="fasting-item" id="${id}">
      <span>${calculateDate(fasting.date)}</span>
      <p>${fasting.title}</p>
      <span>${date}</span>
    </div>
    
  `;
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
      <h4>${fastings[index].title} <small>${fastings[index].month}</small> </h4>
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
