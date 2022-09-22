import { countDayOfMonth, theCurrentDate, months } from "./calender-setup.js";
import { calculateDate } from "./global.js";

const getAllFastingDays = new Promise((resolve, reject) => {
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
        fastingListYear.push({
          title: "اول خميس",
          date: GregorianDateIncrement,
          month: months[index],
        });
      }
      if (weekDay === "الأربعاء" && i >= 12 && i <= 18) {
        fastingListYear.push({
          title: "اوسط أربعاء",
          date: GregorianDateIncrement,
          month: months[index],
        });
      }
      if (weekDay === "الخميس" && i >= startLastThr && i <= monthCount) {
        fastingListYear.push({
          title: "أخر خميس",
          date: GregorianDateIncrement,
          month: months[index],
        });
      }
    }
  }
  resolve(fastingListYear);
});
// Fasting
getAllFastingDays.then((fastingListYear) => {
  let stepOfCondition = 0;
  let fastGrid = document.querySelector(".fasting-grid");
  let fastingContainer = document.querySelector("#closestFasting .table-grid");
  for (let index = 0; index < fastingListYear.length; index++) {
    // three closest fasting days
    if (
      Date.parse(fastingListYear[index].date) > Date.parse(new Date()) &&
      stepOfCondition < 3
    ) {
      stepOfCondition++;
      fastingContainer.innerHTML += `<div class= "table-style-grid">
         <h4>${fastingListYear[index].title} <small>${
        fastingListYear[index].month
      }</small> </h4>
         <span class="timer-style timer ${
           Date.parse(fastingListYear[index].date) > Date.parse(new Date())
             ? ""
             : "completed"
         } ">${calculateDate(fastingListYear[index].date)}</span>
       </div>`;
    }
    // All fasting days in year
    let date = new Date(fastingListYear[index].date).toLocaleDateString(
      "ar-SA",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
    fastGrid.innerHTML += `
     <div class="fasting-item">
       <span>${calculateDate(fastingListYear[index].date)}</span>
       <p>${fastingListYear[index].title}</p>
       <span>${date}</span>
     </div>
     
   `;
  }
});
