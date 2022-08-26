let date = new Date("2022-08-23");

let smallCentury = 30;
let BigCentury = 210;
let oddMonth = 30;
let evenMonth = 29;
// Every 30 years
let leapYears = [
  2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29, 32, 35, 38, 40, 43, 46, 49, 51, 54,
  57, 59, 62, 65, 68, 70, 73, 76, 79, 81, 84, 87, 89, 92, 95, 98, 100, 103, 106,
  109, 111, 114, 117, 119, 122, 125, 128, 130, 133, 136, 139, 141, 144, 147,
  149, 152, 155, 158, 160, 163, 166, 169, 171, 174, 177, 179, 182, 185, 188,
  190, 193, 196, 199, 201, 204, 207, 209,
];

let simpleYear = [
  1, 3, 4, 6, 7, 9, 11, 12, 14, 15, 17, 18, 20, 22, 23, 25, 26, 28, 30, 31, 33,
  34, 36, 37, 39, 41, 42, 44, 45, 47, 48, 50, 52, 53, 55, 56, 58, 60, 61, 63,
  64, 66, 67, 69, 71, 72, 74, 75, 77, 78, 80, 82, 83, 85, 86, 88, 90, 91, 93,
  94, 96, 97, 99, 101, 102, 104, 105, 107, 108, 110, 112, 113, 115, 116, 118,
  120, 121, 123, 124, 126, 127, 129, 131, 132, 134, 135, 137, 138, 140, 142,
  143, 145, 146, 148, 150, 151, 153, 154, 156, 157, 159, 161, 162, 164, 165,
  167, 168, 170, 172, 173, 175, 176, 178, 180, 181, 183, 184, 186, 187, 189,
  191, 192, 194, 195, 197, 198, 200, 202, 203, 205, 206, 208, 210,
];
let months = {
  1: "محرم",
  2: "صفر",
  3: "ربيع الاول",
  4: "ربيع الثاني",
  5: "جمادي الاولي",
  6: "جمادي الثاني",
  7: "رجب",
  8: "شبعان",
  9: "رمضان",
  10: "ذو القعده",
  11: "شوال",
  12: "ذو الحجة",
};

let days = ["الاحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]
let calender = [];

let todayFatimi = "26/1/1444";
let fatimiCalc = todayFatimi.split("/");

// Increment Date
function incrementDateMonths(num) {
  if (fatimiCalc[0] % num === 0) {
    if (fatimiCalc[1] === 12) {
      // the last month
      fatimiCalc[2] = +fatimiCalc[2] + 1;
      fatimiCalc[1] = 1;
    }
    fatimiCalc[1] = +fatimiCalc[1] + 1;
    fatimiCalc[0] = 1;
  } else {
    fatimiCalc[0] = +fatimiCalc[0] + 1;
  }
  return fatimiCalc
}
function createRow(cal) {
  let el = document.createElement("div");
  let d = new Date(cal.date).toLocaleDateString('ar-EG');
  console.log(d)
  el.innerHTML = `
    <p>
      <kbd>${cal.dayWeek} ${cal.dayNum} ${cal.month} ${cal.year}</kbd>
      الموافق 
      <kbd>${d}</kbd>
    </p>
  `
  return el;
}

let start = 1;
function loadMore(more = 10) {
  let calenderFatimiForward = document.getElementById("calenderFatimiForward")
  for (let i = start; i <= more; i++) {
    let nextDay = date.setDate(date.getDate() + 1);
    start++;
    if (+fatimiCalc[1] % 2 === 0) {
      if (fatimiCalc[1] !== 12) {
        // all leap months except last month
        fatimiCalc = incrementDateMonths(29);
      } else {
        // the last month in leap months
        let calcLeap = parseFloat(+fatimiCalc[2] / 30)
          .toFixed(2)
          .split(".")[1];
        let leapOrSimple = parseInt(parseFloat(`0.${calcLeap}`) * 30); // calculate the year is leap or simple
        if (leapYears.includes(leapOrSimple)) {
          fatimiCalc = incrementDateMonths(30); // Year is leap
        } else {
          fatimiCalc = incrementDateMonths(29); // Year is simple
        }
      }
      // Simple Months
    } else {
      fatimiCalc = incrementDateMonths(30);
    }
    let calenderRow = {
      date: new Date(nextDay),
      dayNum: fatimiCalc[0],
      monthNum: fatimiCalc[1],
      year: fatimiCalc[2],
      day: new Date(nextDay).getDay(),
      dayWeek: new Date(nextDay).toLocaleDateString('ar-SA',{weekday: "long"}),
      month: months[fatimiCalc[1]],
    }
    calender.push(calenderRow);
    calenderFatimiForward.append(createRow(calenderRow))
  }

}

window.addEventListener("DOMContentLoaded", () => {
  loadMore(340);
  
  let calenderFatimiForward = document.getElementById("calenderFatimiForward");
  calenderFatimiForward.addEventListener("scroll", () => {
    let scrollTop = calenderFatimiForward.scrollTop;
    let height = calenderFatimiForward.clientHeight;
    let scrollHeight = calenderFatimiForward.scrollHeight;
    let diff = scrollHeight - scrollTop;
    let lessHight = height + 350;
    if (diff <= lessHight) {
      console.log("run", diff, height);
      loadMore(start+10);
    }
    console.log(diff, height, height);
  });
});

