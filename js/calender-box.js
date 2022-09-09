import * as Calender from "./calender-setup.js";
function openCalender() {
  document.querySelector(".calender-picker").classList.remove("close-calender");
}

function displayCalenderGrid(date = new Date()) {
  // check events by this day
  let HijriConfiguration = returnHijriConfiguration(date);
  const yearNumber = HijriConfiguration.hijriYear % 210;
  let firstDayOfYear = Calender.daysFormat[Calender.century[yearNumber]];
  let currentMonthHijri = Calender.theCurrentDate.getCurrentMonthHijri();
  let firstDayNumOfMonth =
    (Calender.countOfMonthDays(HijriConfiguration.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month
  // Display information about date
  if (document.getElementById("theDate")) {
    document.getElementById("theDate").textContent = `${
      Calender.months[HijriConfiguration.hijriMonth]
    } ${HijriConfiguration.hijriYear}`;
  }
  // Loop of month days
  if (document.querySelector(".calender-list-grid-body")) {
    let dyesGrid = document.querySelector(".calender-list-grid-body");
    dyesGrid.innerHTML = "";
    for (let i = 1; i <= firstDayNumOfMonth; i++) {
      dyesGrid.innerHTML += `<span class="empty"></span>`;
    }
    for (
      let i = 1;
      i <= Calender.countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber);
      i++
    ) {
      let _hijri = new HijriDate(
        HijriConfiguration.hijriYear,
        HijriConfiguration.hijriMonth,
        i
      );
      let gregorian = _hijri.toGregorian();
      let GregorianDateIncrement = new Date(gregorian);
      if (
        Calender.theCurrentDate.getCurrentDateHijri() === i &&
        HijriConfiguration.hijriMonth == currentMonthHijri
      ) {
        dyesGrid.innerHTML += `<span data-current_date="${GregorianDateIncrement}" class="active">${i} <em> ${GregorianDateIncrement.getDate()} </em>  </span>`;
      } else {
        dyesGrid.innerHTML += `<span data-current_date="${GregorianDateIncrement}">${i} <em> ${GregorianDateIncrement.getDate()} </em>  </span>`;
      }
    }
    for (
      let i = 1;
      i <=
      35 -
        (firstDayNumOfMonth +
          Calender.countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber));
      i++
    ) {
      dyesGrid.innerHTML += `<span class="empty"></span>`;
    }
  }
}

// Go Prev [ Month - year - day]
function goPrev() {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(
    Calender.theCurrentDate.gregorianDate
  );
  let date = new Date(Calender.theCurrentDate.gregorianDate);
  let theNewDate = date;
  HIJRI_CONFIGURATION.hijriMonth -= 1;
  theNewDate = date.setDate(
    date.getDate() -
      Calender.countDayOfMoth(
        HIJRI_CONFIGURATION.hijriMonth + 1,
        Calender.theCurrentDate.getCurrentYearHijri()
      )
  );
  displayCalenderGrid(theNewDate);
  Calender.theCurrentDate.gregorianDate = new Date(theNewDate);
  if (
    Calender.theCurrentDate.currentHijriDate ==
    new Date(theNewDate).toLocaleDateString("ar-SA")
  ) {
    document.getElementById("today").classList.add("hide");
  } else {
    document.getElementById("today").classList.remove("hide");
  }
}
function goNext() {
  let HIJRI_CONFIGURATION = returnHijriConfiguration(
    Calender.theCurrentDate.gregorianDate
  );
  let date = new Date(Calender.theCurrentDate.gregorianDate);
  let theNewDate = date;
  HIJRI_CONFIGURATION.hijriMonth += 1;
  theNewDate = date.setDate(
    date.getDate() +
      Calender.countDayOfMoth(
        HIJRI_CONFIGURATION.hijriMonth,
        Calender.theCurrentDate.getCurrentYearHijri()
      )
  );
  displayCalenderGrid(theNewDate);
  if (
    Calender.theCurrentDate.currentHijriDate ==
    new Date(theNewDate).toLocaleDateString("ar-SA")
  ) {
    document.getElementById("today").classList.add("hide");
  } else {
    document.getElementById("today").classList.remove("hide");
  }

  Calender.theCurrentDate.gregorianDate = new Date(theNewDate);
}
function returnHijriConfiguration(date) {
  let gregorianDate = new Date(date);
  let hijri = gregorianDate.toHijri();
  return {
    // hijriMonth: parseInt(Calender.a2e(dateHijri.split("/")[1])),
    // hijriDayNum: parseInt(Calender.a2e(dateHijri.split("/")[0])),
    // hijriYear: parseInt(Calender.a2e(dateHijri.split("/")[2])),
    hijriMonth: hijri._month,
    hijriDayNum: hijri._date,
    hijriYear: hijri._year,
  };
}

function enterYear() {
  let year = document.getElementById("changeByYear");
  let hijri = new HijriDate(+year.value, 1, 1);
  let gregorian = hijri.toGregorian();
  displayCalenderGrid(gregorian);
  Calender.theCurrentDate.gregorianDate = gregorian;
}
function __today() {
  document.getElementById("today").classList.add("hide");
  displayCalenderGrid();
  Calender.theCurrentDate.gregorianDate = new Date();
}

// Events

window.addEventListener("DOMContentLoaded", () => {
  displayCalenderGrid(); // display calender
  document
    .getElementById("btnChangeByYear")
    .addEventListener("click", enterYear); // change by years

  document.getElementById("today").addEventListener("click", __today); // Back to today
  // invoke go next and go prev
  document.getElementById("goNext").addEventListener("click", goNext);
  document.getElementById("goPrev").addEventListener("click", goPrev);
  if(document.getElementById('dateChecker'))
    document.getElementById('dateChecker').addEventListener('click', openCalender)
});
