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
};
insertFasting()


let fastings = storageFasting.fetchFastings();
// Fastings
let fastGrid = document.getElementById("fastingGrid");
if (fastings.length > 0) {
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
} else {
  fastGrid.style.background = "#f00";
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
} else {
  document.getElementById("closestFasting").style.background = "#fff022";
}


// const fastings = [
//   { title: "اول خميس", date: "2022-08-03T22:00:00.000Z", month: "محرم" },
//   { title: "اوسط أربعاء", date: "2022-08-09T22:00:00.000Z", month: "محرم" },
//   { title: "أخر خميس", date: "2022-08-24T22:00:00.000Z", month: "محرم" },
//   { title: "اول خميس", date: "2022-08-31T22:00:00.000Z", month: "صفر" },
//   { title: "اوسط أربعاء", date: "2022-09-13T22:00:00.000Z", month: "صفر" },
//   { title: "أخر خميس", date: "2022-09-21T22:00:00.000Z", month: "صفر" },
//   { title: "اول خميس", date: "2022-09-28T22:00:00.000Z", month: "ربيع الاول" },
//   {
//     title: "اوسط أربعاء",
//     date: "2022-10-11T22:00:00.000Z",
//     month: "ربيع الاول",
//   },
//   { title: "أخر خميس", date: "2022-10-19T22:00:00.000Z", month: "ربيع الاول" },
//   { title: "اول خميس", date: "2022-10-26T22:00:00.000Z", month: "ربيع الثاني" },
//   {
//     title: "اوسط أربعاء",
//     date: "2022-11-08T22:00:00.000Z",
//     month: "ربيع الثاني",
//   },
//   { title: "أخر خميس", date: "2022-11-16T22:00:00.000Z", month: "ربيع الثاني" },
//   {
//     title: "اول خميس",
//     date: "2022-11-23T22:00:00.000Z",
//     month: "جمادي الاولي",
//   },
//   {
//     title: "اوسط أربعاء",
//     date: "2022-12-06T22:00:00.000Z",
//     month: "جمادي الاولي",
//   },
//   {
//     title: "أخر خميس",
//     date: "2022-12-21T22:00:00.000Z",
//     month: "جمادي الاولي",
//   },
//   {
//     title: "اول خميس",
//     date: "2022-12-28T22:00:00.000Z",
//     month: "جمادي الثاني",
//   },
//   {
//     title: "اوسط أربعاء",
//     date: "2023-01-03T22:00:00.000Z",
//     month: "جمادي الثاني",
//   },
//   {
//     title: "أخر خميس",
//     date: "2023-01-18T22:00:00.000Z",
//     month: "جمادي الثاني",
//   },
//   { title: "اول خميس", date: "2023-01-25T22:00:00.000Z", month: "رجب" },
//   { title: "اوسط أربعاء", date: "2023-02-07T22:00:00.000Z", month: "رجب" },
//   { title: "أخر خميس", date: "2023-02-15T22:00:00.000Z", month: "رجب" },
//   { title: "اول خميس", date: "2023-02-22T22:00:00.000Z", month: "شبعان" },
//   { title: "اوسط أربعاء", date: "2023-03-07T22:00:00.000Z", month: "شبعان" },
//   { title: "أخر خميس", date: "2023-03-15T22:00:00.000Z", month: "شبعان" },
//   { title: "اول خميس", date: "2023-04-26T22:00:00.000Z", month: "شوال" },
//   { title: "اوسط أربعاء", date: "2023-05-02T22:00:00.000Z", month: "شوال" },
//   { title: "أخر خميس", date: "2023-05-17T22:00:00.000Z", month: "شوال" },
//   { title: "اول خميس", date: "2023-05-24T22:00:00.000Z", month: "ذو القعده" },
//   {
//     title: "اوسط أربعاء",
//     date: "2023-05-30T22:00:00.000Z",
//     month: "ذو القعده",
//   },
//   { title: "أخر خميس", date: "2023-06-14T22:00:00.000Z", month: "ذو القعده" },
//   { title: "اول خميس", date: "2023-06-21T22:00:00.000Z", month: "ذو الحجة" },
//   { title: "اوسط أربعاء", date: "2023-07-04T22:00:00.000Z", month: "ذو الحجة" },
//   { title: "أخر خميس", date: "2023-07-12T22:00:00.000Z", month: "ذو الحجة" },
// ];