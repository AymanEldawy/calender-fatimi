import * as Calender from "./calender";
console.log(Calender)
const PrayerTimeDefault = {
  month: 0, //current month
  year: 0, //current year
  latitude: "nijran",
  longitude: "nijran",
};

// Fetch Prayer Time
async function getPrayTimeByMonth(month, year) {
  let prayerTime = await fetch(
    `http://api.aladhan.com/v1/hijriCalendar?latitude=${latitude}&longitude=${longitude}&method=2&month=${month}&year=${yeaar}`
  )
    .then((res) => res.json())
    .then((data) => data);
  return prayerTime;
}
async function getPrayTimeByDate(month, year) {
  let prayerTime = await fetch(
    `http://api.aladhan.com/v1/timings/1398332113?latitude=${latitude}&longitude=${longitude}&method=2`
  )
    .then((res) => res.json())
    .then((data) => data);
  return prayerTime;
}

// Display Time Prayer
function displayCalenderGrid(date = new Date()) {
  // check events by this day
  console.log('run')
  let HIJRI_CONFIGURATION = Calender.returnHijriConfiguration(date);
  const yearNumber = HIJRI_CONFIGURATION.hijriYear % 210;
  let firstDayOfYear = Calender.daysFormat[Calender.century[yearNumber]];
  let firstWeekDayOfYear = firstDayOfYear.day; // weekday not used
  let currentYearHijri = Calender.theCurrentDate.getCurrentYearHijri();
  let currentMonthHijri = Calender.theCurrentDate.getCurrentMonthHijri();
  let currentDayNumHijri = Calender.theCurrentDate.getCurrentDateHijri();
  let firstDayNumOfMonth =
    (Calender.countOfMonthDays(HIJRI_CONFIGURATION.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month

  // Loop of month days
  let dyesGrid = document.querySelector(".prayer-list-month tbody");
  dyesGrid.innerHTML = "";
  for (let i = 1; i <= firstDayNumOfMonth; i++) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
  for (
    let i = 1;
    i <= Calender.countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber);
    i++
  ) {
    let gregorianDate = new Date(date);
    let setGregorianDate = gregorianDate.setDate(
      gregorianDate.getDate() +
        i -
        Calender.countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber)
    );
    let GregorianDateIncrement = new Date(setGregorianDate);
    let activeStyle = true;
    if (
      Calender.theCurrentDate.getCurrentDateHijri() === i &&
      HIJRI_CONFIGURATION.hijriMonth == currentMonthHijri
    ) {
    }

    dyesGrid.innerHTML += `
      <tr class="${activeStyle && 'active'}">
        <th scope="row">الاحد</th>
        <td>${i} ${HIJRI_CONFIGURATION.hijriMonth} ${
      HIJRI_CONFIGURATION.hijriYear
    }</td>
        <td>03:25</td>
        <td>05:25</td>
        <td>05:25</td>
        <td>05:25</td>
        <td>05:25</td>
        <td>05:25</td>
      </tr>
      `;
  }
  for (
    let i = 1;
    i <=
    35 -
      (firstDayNumOfMonth +
        Calender.countDayOfMoth(HIJRI_CONFIGURATION.hijriMonth, yearNumber));
    i++
  ) {
    dyesGrid.innerHTML += `<span class="empty"></span>`;
  }
}
console.log('runnn')
displayCalenderGrid(); // display calender
window.addEventListener("DOMContentLoaded", () => {
  // displayListOfMonths(); // display checkbox list of months
  // document
  //   .getElementById("btnChangeByYear")
  //   .addEventListener("click", enterYear); // change by years
  // document.getElementById("today").addEventListener("click", __today); // Back to today
  // // invoke go next and go prev
  // document.getElementById("goNext").addEventListener("click", goNext);
  // document.getElementById("goPrev").addEventListener("click", goPrev);
  // document
  //   .getElementById("listOfMonth")
  //   .addEventListener("change", (e) => changeMonth(e));

  // // Events Actions
  // // document.getElementById('selectedDatePicker').addEventListener('focus', openCalender)
  // document.getElementById("btnAddEvent").addEventListener("click", () => {
  //   document.querySelector(".modal-events").classList.remove("close");
  // });
  // document
  //   .getElementById("eventTitle")
  //   .addEventListener("blur", (e) => checkInputTitle(e.target));
  // document
  //   .getElementById("eventTitle")
  //   .addEventListener("keyup", (e) => checkInputTitle(e.target));
  // document.getElementById("btnSubmitEvent").addEventListener("click", addEvent);
  // Add Event
});
