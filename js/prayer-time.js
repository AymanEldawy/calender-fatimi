import SunCalc from "./suncalc.js";
import * as Calender from "./calender-setup.js";
import { storageLocation } from './global.js';
// import { repeatPrayerTime } from "./home-page.js";

const PrayerTimeDefault = {
  month: 0, //current month
  year: 0, //current year
  latitude: "17.5065",
  longitude: "44.1316",
};

let LOCATION = storageLocation.fetchLocation() || PrayerTimeDefault




function repeatPrayerTime(theDate = new Date()) {
  let sunCalc = SunCalc.getTimes(
    /*Date*/ theDate,
    /*Number*/ LOCATION.latitude,
    /*Number*/ LOCATION.longitude
  );
  let sunriseStr =
    sunCalc.sunrise.getHours() + ":" + sunCalc.sunrise.getMinutes();
  let sunsetStr = sunCalc.sunset.getHours() + ":" + sunCalc.sunset.getMinutes();
  let dayLen = `${
    parseInt(sunsetStr.split(":")[0]) - parseInt(sunriseStr.split(":")[0])
  }:${
    parseInt(sunsetStr.split(":")[1]) - parseInt(sunriseStr.split(":")[1])
  }`.split(":");
  // Calculate Fajr Time
  let fajrCalcTime = (parseInt(sunriseStr.split(":")[0]) * 60 )+ parseInt(sunriseStr.split(":")[1]) - 75
  let fajrHours = parseInt(fajrCalcTime / 60);
  let fajrMinutes = parseInt(parseFloat(fajrCalcTime / 60).toFixed(2).split('.')[1] * 60 / 60 ) ;
  let timeFajr = `${fajrHours.toString().padStart(2, 0)}:${fajrMinutes.toString().padStart(2, 0)}`

  // Calculate sunrise Time
  let timeSunrise = `${parseInt(sunriseStr.split(':')[0]).toString().padStart(2, 0)}:${parseInt(sunriseStr.split(':')[1]).toString().padStart(2, 0)}`


  // Calculate Dhuhr Time
  let sunriseFullMinutes = (parseInt(sunriseStr.split(":")[0]) * 60 ) + parseInt(sunriseStr.split(":")[1])
  let dayLenLight = parseInt(dayLen[0]) * 60 + parseInt(dayLen[1]);

  let DhuhrFullTime = (parseInt(((dayLenLight / 12) * 7) + sunriseFullMinutes) / 60)
  let DhuhrHours = parseInt(DhuhrFullTime);
  let DhuhrMintes = Math.round(parseFloat(`.${DhuhrFullTime.toFixed(2).split('.')[1]}`) * 60);
  let timeDhuhr = `${DhuhrHours.toString().padStart(2, 0)}:${DhuhrMintes.toString().padStart(2, 0)}`
  
  // Calculate Aser Time
  let aserHours = (DhuhrHours + 2 ) % 12
  let timeAser = `${aserHours.toString().padStart(2, 0)}:${DhuhrMintes.toString().padStart(2, 0)}`
  
  // Calculate Maghrib Time
  let timeMaghrib = `${(parseInt(sunsetStr.split(':')[0]) % 12).toString().padStart(2, 0)}:${parseInt(sunsetStr.split(':')[1]).toString().padStart(2, 0)}`

  // Calculate Isha Time
  let IshaCalcTime = (parseInt(sunsetStr.split(":")[0]) * 60 ) + parseInt(sunsetStr.split(":")[1]) + 90
  let IshaHours = parseInt(IshaCalcTime / 60) % 12;
  let IshaMinutes = Math.round((`.${parseFloat(IshaCalcTime / 60).toFixed(2).split('.')[1]}`) * 60) ;
  let timeIsha = `${IshaHours.toString().padStart(2, 0)}:${IshaMinutes.toString().padStart(2, 0)}`
  
  return {
    Fajr: timeFajr,
    Sunrise: timeSunrise,
    Dhuhr: timeDhuhr,
    Asr: timeAser,
    Maghrib: timeMaghrib,
    Isha: timeIsha,
  }
} 

// Fetch Prayer Time
async function getPrayTimeByMonth(month, year) {
  let prayerTime = await fetch(
    `http://api.aladhan.com/v1/hijriCalendar?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}&method=2&month=${month}&year=${year}`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return prayerTime;
}

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
  if(document.querySelector(
    ".prayer-list .dateInsideList"
  ))
    document.querySelector(
      ".prayer-list .dateInsideList"
    ).textContent = `${monthName} ${HijriConfiguration.hijriYear}`;

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
  let timePrayerByMonth = await getPrayTimeByMonth(
    HijriConfiguration.hijriMonth,
    HijriConfiguration.hijriYear
  );
  let dyesGrid = document.querySelector(".prayer-list tbody") || undefined;
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
    let timings = repeatPrayerTime(GregorianDateIncrement)
    dyesGrid.innerHTML += `
      <tr class="${activeStyle ? "active" : ""}">
        <th scope="row">${i}</th>
        <td>${
          GregorianDateIncrement.toLocaleDateString("ar-EG", {
            weekday: "long",
          })
          // Calender.daysFormat[Object.keys(Calender.daysFormat)[dayWeek]].day
        }</td>
        
        <td>${timings.Fajr.split(" ")[0]}</td>
        <td>${timings.Sunrise.split(" ")[0]}</td>
        <td>${timings.Dhuhr.split(" ")[0]}</td>
        <td>${timings.Asr.split(" ")[0]}</td>
        <td>${timings.Maghrib.split(" ")[0]}</td>
        <td>${timings.Isha.split(" ")[0]}</td>
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
  if(document.getElementById("goNextMonth")) {
    document.getElementById("goNextMonth").addEventListener("click", goNext);
    document.getElementById("goPrevMonth").addEventListener("click", goPrev);
    document.querySelector('.print').addEventListener('click', () => window.print())
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

