// import { months, theCurrentDate, countDayOfMonth } from "./calender-setup.js";
// import { calculateDate } from "./global.js";

// let storageFasting = {
//   fetchFastings() {
//     let fastings = JSON.parse(localStorage.getItem("fastings"));
//     return fastings && fastings.length ? fastings : [];
//   },
//   saveFastings(fastings) {
//     localStorage.setItem("fastings", JSON.stringify(fastings));
//   },
// };
// function insertFasting() {
//   let fastings = storageFasting.fetchFastings();
//   if (fastings.length > 0) return;
//   let theYear = theCurrentDate.getCurrentYearHijri();
//   const yearNumber = theYear % 210;
//   // Loop of month days
//   for (let index = 1; index <= 12; index++) {
//     if (index === 9) continue;
//     let monthCount = countDayOfMonth(index, yearNumber);
//     for (let i = 1; i <= monthCount; i++) {
//       let startLastThr = monthCount > 29 ? 24 : 23;
//       let _hijri = new HijriDate(theYear, index, i);
//       let gregorian = _hijri.toGregorian();
//       let GregorianDateIncrement = new Date(gregorian);
//       let weekDay = GregorianDateIncrement.toLocaleDateString("ar-SA", {
//         weekday: "long",
//       });
//       if (weekDay === "الخميس" && i <= 7) {
//         fastings.push({
//           title: "اول خميس",
//           date: GregorianDateIncrement,
//           month: months[index],
//         });
//       }
//       if (weekDay === "الأربعاء" && i >= 12 && i <= 18) {
//         fastings.push({
//           title: "اوسط أربعاء",
//           date: GregorianDateIncrement,
//           month: months[index],
//         });
//       }
//       if (weekDay === "الخميس" && i >= startLastThr && i <= monthCount) {
//         fastings.push({
//           title: "أخر خميس",
//           date: GregorianDateIncrement,
//           month: months[index],
//         });
//       }
//     }
//   }
//   storageFasting.saveFastings(fastings);
// };
// insertFasting()


// let fastings = storageFasting.fetchFastings();
// Fasting

