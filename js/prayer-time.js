import * as Calender from "./calender-setup.js";
console.log(Calender);
let storeLocation = {
  fetchLocation: () => {
    let location = localStorage.getItem("TM_location");
    return JSON.parse(location)
      ? JSON.parse(location)
      : {
          lat: "17.5065",
          long: "44.1316",
          country: "SA",
          city: "Najran",
        };
  },
  saveLocation: (location) => {
    localStorage.setItem("TM_location", JSON.stringify(location));
  },
};

const PrayerTimeDefault = {
  month: 0, //current month
  year: 0, //current year
  latitude: "17.5065",
  longitude: "44.1316",
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
}
async function showPosition(position) {
  let currentLocation = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  storeLocation.saveLocation(currentLocation);
}
let LOCATION = storeLocation.fetchLocation();
function showError() {
  if (LOCATION && LOCATION.lat) {
    PrayerTimeDefault.latitude = LOCATION.latitude;
    PrayerTimeDefault.latitude = LOCATION.longitude;
  }
}

function showControl(open) {
  let prayerContainer = document.querySelector(".prayer-content");
  if (open == "open-month")
    prayerContainer.className = "prayer-content open-month";
  else if (open == "open-list")
    prayerContainer.className = "prayer-content open-list";
  else prayerContainer.className = "prayer-content open-single";
}
async function prayerTimingDay(date = new Date()) {
  // if (new Date(Calender.theCurrentDate.gregorianDate).getDate() == new Date(date).getDate() 
  // ) {
  //   document.getElementById("today").classList.remove("hide");
  //   console.log('run///')
  // } else {
  //   console.log('run/...')
  //   document.getElementById("today").classList.add("hide");
  // }
  // console.log(new Date(),Calender.theCurrentDate.gregorianDate , Calender.theCurrentDate.gregorianDate == new Date())
  let prayerTime = await getPrayTimeByDate(date);
  let timings = prayerTime.data.timings;
  document.getElementById("dateDayHijri").textContent = new Date(
    date
  ).toLocaleDateString("ar-SA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  document.getElementById("dateDayGregorian").textContent = new Date(
    date
  ).toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // let timingsList = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha' ]
  let prayGrid = document.querySelector(".prayer-grid");
  prayGrid.innerHTML = `
  <div class="prayer-grid-item">
      <span>الفجر</span>
      <span>${timings.Fajr} </span>
  </div>
  <div class="prayer-grid-item">
      <span>الشروق</span>
      <span>${timings.Sunrise}</span>
  </div>
  <div class="prayer-grid-item">
      <span>الظهر</span>
      <span>${timings.Dhuhr}</span>
  </div>
  <div class="prayer-grid-item">
      <span>العصر</span>
      <span>${timings.Asr}</span>
  </div>
  <div class="prayer-grid-item">
      <span>المغرب</span>
      <span>${timings.Maghrib}</span>
  </div>
  <div class="prayer-grid-item">
      <span>العشاء</span>
      <span>${timings.Isha}</span>
  </div>
  `;
}

// Fetch Prayer Time
async function getPrayTimeByMonth(month, year) {
  let prayerTime = await fetch(
    `http://api.aladhan.com/v1/hijriCalendar?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=2&month=${month}&year=${year}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return prayerTime;
}
async function getPrayTimeByDate(date = new Date()) {
  let prayerTime = await fetch(
    `https://api.aladhan.com/v1/timings/${date}?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=2`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return prayerTime;
}

// Display Time Prayer
async function displayPryerTime(date = new Date(), displayElement = ".prayer-list-month tbody") {
  // PryerTime Page
  let HijriConfiguration = returnHijriConfiguration(date);
  let monthName = Calender.months[HijriConfiguration.hijriMonth]
  if(displayElement == '.prayer-list tbody'){
    if(HijriConfiguration.hijriMonth == 12) {
      document.getElementById('goNextMonth').setAttribute('disabled', 'disabled')
      document.getElementById('goPrevMonth').removeAttribute('disabled')
    } else if(HijriConfiguration.hijriMonth == 1) {
      document.getElementById('goNextMonth').removeAttribute('disabled')
      document.getElementById('goPrevMonth').setAttribute('disabled', 'disabled')
      
    }
    document.querySelector('.prayer-list .dateInsideList').textContent = `${monthName} ${HijriConfiguration.hijriYear}`
  } else {
    document.querySelector('.prayer-list-month .dateInsideList').textContent = `${monthName} ${HijriConfiguration.hijriYear}`
  }
  
  const yearNumber = HijriConfiguration.hijriYear % 210;
  let firstDayOfYear = Calender.daysFormat[Calender.century[yearNumber]];
  let firstWeekDayOfYear = firstDayOfYear.day; // weekday not used
  let currentYearHijri = Calender.theCurrentDate.getCurrentYearHijri();
  let currentMonthHijri = Calender.theCurrentDate.getCurrentMonthHijri();
  let currentDayNumHijri = Calender.theCurrentDate.getCurrentDateHijri();
  console.log(Calender.countDayOfMoth(HijriConfiguration.hijriMonth, yearNumber))
  let firstDayNumOfMonth =
    (Calender.countOfMonthDays(HijriConfiguration.hijriMonth - 1, yearNumber) +
      parseInt(firstDayOfYear.count)) %
    7; // calculate the first weekDay of month

  // Loop of month days
  let timePrayerByMonth = await getPrayTimeByMonth(
    HijriConfiguration.hijriMonth,
    HijriConfiguration.hijriYear
  );
  let dyesGrid = document.querySelector(displayElement);
  dyesGrid.innerHTML = "";
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
    let activeStyle = false;
    let GregorianDateIncrement = new Date(gregorian);
    if (
      Calender.theCurrentDate.getCurrentDateHijri() === i &&
      HijriConfiguration.hijriMonth == currentMonthHijri
    ) {
      activeStyle = true;
    }

    let dayWeek = (parseInt(firstDayOfYear.count) + i - 1) % 7;
    dyesGrid.innerHTML += `
      <tr class="${activeStyle && "active"}">
        <th scope="row">${
          GregorianDateIncrement.toLocaleDateString('ar-EG', {weekday : "long"})
          // Calender.daysFormat[Object.keys(Calender.daysFormat)[dayWeek]].day
        }</th>
        
        <td>${i} ${monthName} ${
      HijriConfiguration.hijriYear
    }</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Fajr.replace(
          "(EET)",
          ""
        )}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Sunrise.replace(
          "(EET)",
          ""
        )}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Dhuhr.replace(
          "(EET)",
          ""
        )}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Asr.replace(
          "(EET)",
          ""
        )}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Maghrib.replace(
          "(EET)",
          ""
        )}</td>
        <td>${timePrayerByMonth.data[i - 1].timings.Isha.replace(
          "(EET)",
          ""
        )}</td>
      </tr>
      `;
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

displayPryerTime(); // display calender
displayPryerTime(new Date(), '.prayer-list tbody'); // display calender
prayerTimingDay();
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.display button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.display button').forEach(_ => _.classList.remove('active') )
      showControl(btn.dataset.open)
      btn.classList.add('active')
    })
    
  })
  document.getElementById("goNext").addEventListener("click", () => goNext('day'));
  document.getElementById("goPrev").addEventListener("click", () => goPrev('day'));
  document.getElementById("goNextMonth").addEventListener("click", () => goNext("month"));
  document.getElementById("goPrevMonth").addEventListener("click", () => goPrev("month"));
  document.getElementById("today").addEventListener("click", (e) => {
    e.target.classList.add("hide");
    prayerTimingDay();
  }); // Back to today
  // displayListOfMonths(); // display checkbox list of months
  // document
  //   .getElementById("btnChangeByYear")
  //   .addEventListener("click", enterYear); // change by years
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


// Go Prev [ Month - year - day]
function goPrev(size) {
  document.getElementById('today').classList.remove("hide");
  let date = new Date(Calender.theCurrentDate.gregorianDate);
  let hijri = date.toHijri();
  let dateGregorian = hijri.toGregorian();
  if(size == 'day') {
    hijri.subtractDay();
    dateGregorian = hijri.toGregorian();
    prayerTimingDay(dateGregorian);
  } else {
    hijri.subtractDays(30);
    dateGregorian = hijri.toGregorian();
    displayPryerTime(dateGregorian, '.prayer-list tbody');
  }
  Calender.theCurrentDate.gregorianDate = new Date(dateGregorian);
}

function goNext(size) {
  document.getElementById('today').classList.remove("hide");
  let date = new Date(Calender.theCurrentDate.gregorianDate);
  let hijri = date.toHijri();
  let dateGregorian = hijri.toGregorian();
  if(size == 'day') {
    hijri.addDay();
    dateGregorian = hijri.toGregorian();
    prayerTimingDay(dateGregorian);
  } else {
    hijri.addDays(30);
    dateGregorian = hijri.toGregorian();
    displayPryerTime(dateGregorian, '.prayer-list tbody');
  }
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
