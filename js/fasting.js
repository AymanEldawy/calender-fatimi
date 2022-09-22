import { countDayOfMonth, theCurrentDate, months } from "./calender-setup.js";
import { calculateDate, storageLocation } from "./global.js";

(function () {
  let fastings = storageLocation.fetchFastings();
  if (fastings.length > 0) return;
  let theYear = theCurrentDate.getCurrentYearHijri();
  const yearNumber = theYear % 210;
  // Loop of month days
  let fastingListYear = [];
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
  storageLocation.saveFastings(fastings);
})();
window.addEventListener("DOMContentLoaded", () => {
  let fastings = storageLocation.fetchFastings();
  let stepOfCondition = 0;
  let fastGrid = document.querySelector(".fasting-grid");
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
  let fastingContainer = document.querySelector("#closestFasting .table-grid");
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
});
