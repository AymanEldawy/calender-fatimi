import * as Calender from "./calender-setup.js";
import { prayerTimings } from "./prayer-timings.js";

window.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("backToCurrentMonth")
    .addEventListener("click", () => {
      Calender.theCurrentDate.gregorianDate = new Date();
      displayPryerTime();
    });
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
  displayPryerTime(); // display calender
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

// Display Time Prayer
function displayPryerTime(date = new Date()) {
  // PryerTime Page
  let HijriConfiguration = returnHijriConfiguration(date);
  let monthName = Calender.months[HijriConfiguration.hijriMonth];
  if (
    HijriConfiguration.hijriMonth ===
    Calender.theCurrentDate.getCurrentMonthHijri()
  ) {
    document.getElementById("backToCurrentMonth").classList.add("hide");
  } else {
    document.getElementById("backToCurrentMonth").classList.remove("hide");
  }
  if (HijriConfiguration.hijriMonth == 12) {
    document.getElementById("goNextMonth").setAttribute("disabled", "disabled");
  } else if (HijriConfiguration.hijriMonth == 1) {
    document.getElementById("goPrevMonth").setAttribute("disabled", "disabled");
  } else {
    document.getElementById("goPrevMonth").removeAttribute("disabled");
    document.getElementById("goNextMonth").removeAttribute("disabled");
  }
  if (document.querySelector(".prayer-list .dateInsideList"))
    document.querySelector(
      ".prayer-list .dateInsideList span:first-child"
    ).textContent = `${monthName} ${HijriConfiguration.hijriYear}`;
  document.getElementById(
    "monthPrayer"
  ).textContent = `${monthName} ${HijriConfiguration.hijriYear}`;
  const yearNumber = HijriConfiguration.hijriYear % 210;
  let firstDayOfYear = Calender.daysFormat[Calender.century[yearNumber]];
  let currentMonthHijri = Calender.theCurrentDate.getCurrentMonthHijri();
  let firstDayNumOfMonth =
    (Calender.countOfMonthDays(HijriConfiguration.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month
  let setMonth = new Set();

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
    setMonth.add(
      GregorianDateIncrement.toLocaleDateString("ar-EG", { month: "long" })
    );
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
        <td>${GregorianDateIncrement.toLocaleDateString("ar-EG", {
          weekday: "long",
        })}</td>
        
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

  // document.getElementById("monthPrayerGor").textContent = Array(
  //   ...setMonth
  // ).join(" - ");
  document.querySelector(
    ".prayer-list .dateInsideList span:last-child"
  ).textContent = Array(...setMonth).join(" - ");
}
