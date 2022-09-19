import SunCalc from "./suncalc.js";
import * as Calender from "./calender-setup.js";
import { latAndLong, storageLocation } from "./global.js";
import { prayerTimings } from "./prayer-timings.js";
// import { repeatPrayerTime } from "./home-page.js";

const PrayerTimeDefault = {
  month: 0, //current month
  year: 0, //current year
  latitude: "17.5065",
  longitude: "44.1316",
};
let LOCATION = storageLocation.fetchLocation() || PrayerTimeDefault;

// Fetch Prayer Time
// async function getPrayTimeByMonth(city, country, month, year) {
//   let prayerTime = await fetch(
//     // `http://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=8&month=${month}&year=${year}`
//     // `http://api.aladhan.com/v1/calendar?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=8&month=${month}&year=${year}`
//     `http://api.aladhan.com/v1/hijriCalendar?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=4&month=${month}&year=${year}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       return data;
//     });
//   return prayerTime;
// }

// Display Time Prayer
async function displayPryerTime(date = new Date()) {
  // PryerTime Page
  let HijriConfiguration = returnHijriConfiguration(date);
  let monthName = Calender.months[HijriConfiguration.hijriMonth];
  if (HijriConfiguration.hijriMonth == 12) {
    document.getElementById("goNextMonth").setAttribute("disabled", "disabled");
    document.getElementById("goPrevMonth").removeAttribute("disabled");
  } else if (HijriConfiguration.hijriMonth == 1) {
    document.getElementById("goNextMonth").removeAttribute("disabled");
    document.getElementById("goPrevMonth").setAttribute("disabled", "disabled");
  }
  if (document.querySelector(".prayer-list .dateInsideList"))
    document.querySelector(
      ".prayer-list .dateInsideList"
    ).textContent = `${monthName} ${HijriConfiguration.hijriYear}`;
    document.getElementById('monthPrayer').textContent = `${monthName} ${HijriConfiguration.hijriYear}`;
  const yearNumber = HijriConfiguration.hijriYear % 210;
  let firstDayOfYear = Calender.daysFormat[Calender.century[yearNumber]];
  let firstWeekDayOfYear = firstDayOfYear.day; // weekday not used
  let currentYearHijri = Calender.theCurrentDate.getCurrentYearHijri();
  let currentMonthHijri = Calender.theCurrentDate.getCurrentMonthHijri();
  let currentDayNumHijri = Calender.theCurrentDate.getCurrentDateHijri();
  let firstDayNumOfMonth =
    (Calender.countOfMonthDays(HijriConfiguration.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month

  // Loop of month days
  let dyesGrid = document.querySelector(".prayer-list tbody") || undefined;
  dyesGrid.innerHTML = "";
  for (
    let i = 1;
    i <= Calender.countDayOfMonth(HijriConfiguration.hijriMonth, yearNumber);
    i++
  ) {
    let _hijri = new HijriDate(
      HijriConfiguration.hijriYear,
      HijriConfiguration.hijriMonth,
      i
    );
    let gregorian = _hijri.toGregorian();
    let activeStyle = false;
    let GregorianDateIncrement = new Date(gregorian);
    let timePrayerByMonth = prayerTimings(GregorianDateIncrement);
    if (
      Calender.theCurrentDate.getCurrentDateHijri() === i &&
      HijriConfiguration.hijriMonth == currentMonthHijri
    ) {
      activeStyle = true;
    }
    dyesGrid.innerHTML += `
      <tr class="${activeStyle ? "active" : ""}">
        <th scope="row">${i}</th>
        <td>${
          GregorianDateIncrement.toLocaleDateString("ar-EG", {
            weekday: "long",
          })
          // Calender.daysFormat[Object.keys(Calender.daysFormat)[dayWeek]].day
        }</td>
        
        <td>${timePrayerByMonth.Fajr}</td>
        <td>${timePrayerByMonth.Sunrise}</td>
        <td>${timePrayerByMonth.Duher}</td>
        <td>${timePrayerByMonth.Asr}</td>
        <td>${timePrayerByMonth.Maghrib}</td>
        <td>${timePrayerByMonth.Isha}</td>
      </tr>
      `;
  }
  for (
    let i = 1;
    i <=
    35 -
      (firstDayNumOfMonth +
        Calender.countDayOfMonth(HijriConfiguration.hijriMonth, yearNumber));
    i++
  ) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
}

displayPryerTime(); // display calender
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".display button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".display button")
        .forEach((_) => _.classList.remove("active"));
      showControl(btn.dataset.open);
      btn.classList.add("active");
    });
  });
  if (document.getElementById("goNextMonth")) {
    document.getElementById("goNextMonth").addEventListener("click", goNext);
    document.getElementById("goPrevMonth").addEventListener("click", goPrev);
    document
      .querySelector(".print")
      .addEventListener("click", () => window.print());
  }
});

// Go Prev [ Month - year - day]
function goPrev() {
  let date = new Date(Calender.theCurrentDate.gregorianDate);
  let hijri = date.toHijri();
  let dateGregorian = hijri.toGregorian();
  hijri.subtractDays(30);
  dateGregorian = hijri.toGregorian();
  displayPryerTime(dateGregorian);
  Calender.theCurrentDate.gregorianDate = new Date(dateGregorian);
}

function goNext() {
  let date = new Date(Calender.theCurrentDate.gregorianDate);
  let hijri = date.toHijri();
  let dateGregorian = hijri.toGregorian();
  hijri.addDays(30);
  dateGregorian = hijri.toGregorian();
  displayPryerTime(dateGregorian);
  Calender.theCurrentDate.gregorianDate = new Date(dateGregorian);
}
function returnHijriConfiguration(date) {
  let gregorianDate = new Date(date);
  let hijri = gregorianDate.toHijri();
  return {
    hijriMonth: hijri._month,
    hijriDayNum: hijri._date,
    hijriYear: hijri._year,
  };
}
