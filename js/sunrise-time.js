import { weeks, daysInfo } from "./weeks.js";
import { latAndLong } from "./global.js";
import SunCalc from "./suncalc.js";
let days = [
  "الاحد",
  "الاتنين",
  "الثلاثاء",
  "الاربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
export let thePlanetNow = {};

function closePlanetMessage() {
  document.getElementById("planetMessage").innerHTML = "";
  document.body.classList.remove("no-scroll");
}

function openPlanetMessage(planet) {
  document.body.classList.add("no-scroll");
  document.getElementById("planetMessage").innerHTML = `
  <div class="envelope ${planet.status}">
      <div class="content">
        <div class="envelope-content">
        ${planet.msg}
        </div>
      </div>
    </div>
  `;
}

// Main Variables
let backToDate = document.getElementById("backToDate");
let displayDate = document.getElementById("displayDate");
let displayDateHigry = document.getElementById("displayDateHigry");

function resetDateHigry(theDate = new Date()) {
  let date = new Date(theDate);
  let changeHijriDate = document.getElementById("changeHijriDate");
  let { action, countofdays } = changeHijriDate.dataset;
  let dateAfterReset = date.setDate(date.getDate());
  if (action === "ناقص") {
    dateAfterReset = date.setDate(date.getDate() - parseInt(countofdays));
  } else if (action === "زيادة") {
    dateAfterReset = date.setDate(date.getDate() + parseInt(countofdays));
  }
  return new Date(dateAfterReset).toLocaleDateString("ar-SA");
}

window.addEventListener("click", (e) => {
  window.addEventListener("click", (e) => {
    if (e.target.matches(".calender-list-grid-body span")) {
      document
        .querySelector(".calender-picker")
        .classList.add("close-calender");
      let _date = new Date(e.target.dataset.current_date);
      _date.setHours(new Date().getHours());
      backToDate.classList.add("show");
      loadDate(latAndLong.latitude, latAndLong.longitude, _date);
    }
  });
  if (
    e.target.id == "planetMessage" ||
    e.target.classList.contains(".envelope")
  ) {
    closePlanetMessage();
  }
});
window.addEventListener("DOMContentLoaded", () => {
  loadDate(latAndLong.latitude, latAndLong.longitude, latAndLong.dayDate);

  document.getElementById("displayDay").addEventListener("click", (e) => {
    let value = e.target.dataset.day;
    let dayInfo = daysInfo[value];
    let planetLight = weeks[value + "light"];
    let planetNight = weeks[value + "night"];
    console.log(dayInfo, planetLight, planetNight)
    let contentNight = "";
    let contentLight = "";
    for (let i = 0; i < planetNight.length; i++) {
      contentNight += `
      <div class="planet-content-box d-flex mb-3 rounded">
        <span class="d-flex align-items-center mr-1 justify-content-center status-${planetNight[i].status} p-1">${planetNight[i].planet}</span>
        <p>${planetNight[i].msg}</p>
    </div>
        `;
    }
    for (let i = 0; i < planetLight.length; i++) {
      contentLight += `
        <div class="planet-content-box  d-flex mb-3 rounded">
            <span class="d-flex align-items-center mr-1 justify-content-center status-${planetLight[i].status} p-1">${planetLight[i].planet}</span>
            <p>${planetLight[i].msg}</p>
          </div>
        `;
    }
    document.body.classList.add("no-scroll");
    document.getElementById("planetMessage").innerHTML = `
      <div class="popup envelope">
        <div class="popup-content">
        <div class="day-content">
          <h2>${dayInfo.title1}</h2>
          <p>${dayInfo.description1}</p>
          <h2>${dayInfo.title2}</h2>
          <p>${dayInfo.description2}</p>
          <hr>
        </div>
        <div class="planet-content">
          <h3><i class="gg-moon"></i> ساعات الليل</h3>
          ${contentNight}
          <h3><i class="gg-sun"></i> ساعات النهار</h3>
          ${contentLight}
        </div>
        </div>
      </div>
  `;
  });
  // change date next day or perv day
  let nextDay = document.getElementById("nextDay");
  let prevDay = document.getElementById("prevDay");
  prevDay.addEventListener("click", () => {
    let theNextDay = null;
    let date = new Date();
    if (latAndLong.day == "today") {
      let tomorrow = date.setDate(date.getDate() - 1);
      theNextDay = new Date(tomorrow)
        .toLocaleDateString("en-UK")
        .replace(/\//g, "-")
        .split("-")
        .reverse()
        .join("-");
    } else {
      let theNewDate = new Date(latAndLong.day.toString());
      let tomorrow = theNewDate.setDate(theNewDate.getDate() - 1);
      theNextDay = new Date(tomorrow)
        .toLocaleDateString("en-UK")
        .replace(/\//g, "-")
        .split("-")
        .reverse()
        .join("-");
    }
    loadDate(latAndLong.latitude, latAndLong.longitude, theNextDay);
    backToDate.classList.add("show");
  });
  nextDay.addEventListener("click", () => {
    let theNextDay = null;
    let date = new Date();
    if (latAndLong.day == "today") {
      let tomorrow = date.setDate(date.getDate() + 1);
      theNextDay = new Date(tomorrow)
        .toLocaleDateString("en-UK")
        .replace(/\//g, "-")
        .split("-")
        .reverse()
        .join("-");
    } else {
      let theNewDate = new Date(latAndLong.day.toString());
      let tomorrow = theNewDate.setDate(theNewDate.getDate() + 1);
      theNextDay = new Date(tomorrow)
        .toLocaleDateString("en-UK")
        .replace(/\//g, "-")
        .split("-")
        .reverse()
        .join("-");
    }

    loadDate(latAndLong.latitude, latAndLong.longitude, theNextDay);
    backToDate.classList.add("show");
  });
  // Run default function if user not allow location

  setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? "م" : "ص";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    document.getElementById(
      "timeWatch"
    ).innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
  }, 1000);

  getSunriseTime();
});

function createItemOfTable(start, end, planet) {
  let tr = document.createElement("tr");
  tr.innerHTML = `
    <td scope="row">${start}</td>
    <td><span class="status-${planet.status}"> ${planet.planet} </span></td>
    <td>${end}</td>
  `;

  tr.addEventListener("click", (e) => {
    openPlanetMessage(planet);
  });

  return tr;
}

function loadDate(latitude, longitude, selectedDate = latAndLong.dayDate) {
  let theDate = selectedDate === "today" ? new Date() : new Date(selectedDate);
  let sunCalc = SunCalc.getTimes(
    /*Date*/ theDate,
    /*Number*/ latitude,
    /*Number*/ longitude
  );

  let sunriseStr =
    sunCalc.sunrise.getHours() + ":" + sunCalc.sunrise.getMinutes();
  let sunsetStr = sunCalc.sunset.getHours() + ":" + sunCalc.sunset.getMinutes();
  let theDay =
    selectedDate === "today"
      ? new Date().getDay()
      : new Date(selectedDate).getDay();
  latAndLong.day = selectedDate;
  displayDate.innerHTML = new Date(selectedDate).toLocaleDateString("ar-EG");
  if (new Date().getHours() > 18) {
    let date = new Date(selectedDate);
    let theAcusalDate = date.setDate(date.getDate() - 1);
    displayDate.innerHTML = new Date(theAcusalDate).toLocaleDateString("ar-EG");
  } else {
    displayDate.innerHTML = new Date(selectedDate).toLocaleDateString("ar-EG");
  }
  displayDateHigry.innerHTML = resetDateHigry(selectedDate);
  let sunrise = sunriseStr.split(":");
  let sunset = sunsetStr.split(":");
  function changeTheme() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let _sunrise = `${sunrise[0].toString().padStart(2, 0)}${sunrise[1]
      .toString()
      .padStart(2, 0)}`;
    let _sunset = `${sunset[0].toString().padStart(2, 0)}${sunset[1]
      .toString()
      .padStart(2, 0)}`;
    let timeCheckAmOrPm =
      `${hours.toString().padStart(2, 0)}${minutes
        .toString()
        .padStart(2, 0)}` >= parseInt(_sunrise) &&
      `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` <
        parseInt(_sunset)
        ? "am"
        : "pm";
    let thead = document.querySelector("thead");
    if (timeCheckAmOrPm === "am") {
      document.getElementById("displayDay").setAttribute('data-day', theDay);
      document.getElementById("displayDay").innerHTML = days[theDay];
      document.body.classList.add("light");
      thead.className = "thead-light";
      document.getElementById("nav-lighten").classList.add("active");
      document
        .getElementById("nav-lighten-tab")
        .classList.add("active", "show");
      document.getElementById("nav-darken").classList.remove("active");
      document
        .getElementById("nav-darken-tab")
        .classList.remove("active", "show");
    } else {
      document.getElementById("displayDay").setAttribute('data-day', theDay);
      document.getElementById("displayDay").innerHTML = `ليلة ${days[theDay]}`;
      document.getElementById("nav-lighten").classList.remove("active");
      document
        .getElementById("nav-lighten-tab")
        .classList.remove("active", "show");
      document.getElementById("nav-darken").classList.add("active");
      document.getElementById("nav-darken-tab").classList.add("active", "show");
      thead.className = "thead-dark";
      document.body.classList.add("dark");
    }
  }

  changeTheme();

  function endHoursFn(hours, minutes, nightOrLight, value) {
    let amOrPm = "";
    let endHours = parseInt(hours) + 1;

    let endMinutes = parseInt(minutes);
    endMinutes = endMinutes + value;
    if (endMinutes < 0) {
      endMinutes = 60 + endMinutes;
      endHours = endHours - 1;
    }
    if (endMinutes >= 60) {
      endHours = endHours + 1;
      endMinutes = endMinutes - 60;
    }
    if (endHours < 0) {
      endHours == 11;
    }
    if (endHours == 0) {
      endHours == 12;
    }
    if (nightOrLight == "sunrise" && endHours > 11) {
      amOrPm = "PM";
    } else if (nightOrLight == "sunrise" && endHours <= 11) {
      amOrPm = "AM";
    }
    if (nightOrLight == "sunset" && endHours > 11) {
      amOrPm = "AM";
    } else if (nightOrLight == "sunset" && endHours <= 11) {
      amOrPm = "PM";
    }
    if (endHours > 12) {
      endHours = endHours % 12;
    }

    return `${endHours.toString().padStart(2, 0)}:${endMinutes
      .toString()
      .padStart(2, 0)} ${amOrPm}`;
  }

  function resetTime(hours, minutes, nightOrLight) {
    let amOrPm = "";
    if (minutes < 0) {
      minutes = 60 + minutes;
      hours = hours - 1;
    }
    if (minutes >= 60) {
      hours = hours + 1;
      minutes = minutes - 60;
    }
    if (hours < 0) hours = 11;
    if (hours == 0) {
      hours = 12;
    }
    if (nightOrLight == "sunrise" && hours > 11) {
      amOrPm = "PM";
    } else if (nightOrLight == "sunrise" && hours <= 11) {
      amOrPm = "AM";
    }
    if (nightOrLight == "sunset" && hours > 11) {
      amOrPm = "AM";
    } else if (nightOrLight == "sunset" && hours <= 11) {
      amOrPm = "PM";
    }
    if (hours > 12) {
      hours = hours % 12;
    }

    return `${hours.toString().padStart(2, 0)}:${minutes
      .toString()
      .padStart(2, 0)} ${amOrPm}`;
  }
  let tableDaylight = document.querySelector("#nav-lighten-tab tbody");
  let tableNight = document.querySelector("#nav-darken-tab tbody");
  tableDaylight.innerHTML = "";
  let dayLen = `${
    parseInt(sunsetStr.split(":")[0]) - parseInt(sunriseStr.split(":")[0])
  }:${
    parseInt(sunsetStr.split(":")[1]) - parseInt(sunriseStr.split(":")[1])
  }`.split(":");
  let dayLenLight = parseInt(dayLen[0]) * 60 + parseInt(dayLen[1]);
  let dayLenNight = 1440 - dayLenLight;
  let valuePlusLight = Math.floor((dayLenLight / 12) * 1 - 60);
  let valuePlusNight = Math.floor((dayLenNight / 12) * 1 - 60);

  for (let i = 0; i < 12; i++) {
    let theHours = parseInt(((dayLenLight / 12) * i) / 60);
    let theMinutes = ((dayLenLight / 12) * i) % 60;
    let hours = parseInt(sunrise[0]) + theHours;
    let minutes = parseInt(sunrise[1]) + theMinutes;
    let dev = parseInt(minutes / 60);
    hours = hours + dev;
    minutes = minutes - dev * 60;
    let start = resetTime(parseInt(hours), parseInt(minutes), "sunrise");
    let end = endHoursFn(
      parseInt(hours),
      parseInt(minutes),
      "sunrise",
      parseInt(valuePlusLight)
    );

    tableDaylight.append(
      createItemOfTable(start, end, weeks[`${theDay}light`][i])
    );
  }

  let last = document.querySelector(
    "#nav-lighten-tab tr:last-child td:last-child"
  );
  let lastTime = sunset;
  if (lastTime[1] > 1 && lastTime[1] <= 59) lastTime[1] -= 1;
  lastTime[0] = lastTime[0] % 12;
  lastTime[0] =
    parseInt(lastTime[0]) < 10 ? `0${parseInt(lastTime[0])}` : lastTime[0];
  lastTime[1] =
    parseInt(lastTime[1]) < 10 ? `0${parseInt(lastTime[1])}` : lastTime[1];
  last.textContent = `${lastTime.join(":")} PM`;
  tableNight.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    let theHours = parseInt(((dayLenNight / 12) * i) / 60);
    let theMinutes = ((dayLenNight / 12) * i) % 60;
    // let theMisSeconds = parseFloat(theMinutes).toFixed(2).split('.')[1];
    // let theSeconds = (theMisSeconds * 12) / 60
    // theMinutes += parseInt(theSeconds)
    // theSeconds = theMisSeconds - (theSeconds * 60)
    let hours = parseInt(sunset[0]) + theHours;
    let minutes = parseInt(sunset[1]) + theMinutes;
    let dev = parseInt(minutes / 60);
    hours = hours + dev;
    minutes = minutes - dev * 60;
    let start = resetTime(parseInt(hours), parseInt(minutes), "sunset");
    let end = endHoursFn(
      parseInt(hours),
      parseInt(minutes),
      "sunset",
      parseInt(valuePlusNight)
    );
    tableNight.append(
      createItemOfTable(start, end, weeks[`${theDay}night`][i])
    );
  }
  let lastNight = document.querySelector(
    "#nav-darken-tab tr:last-child td:last-child"
  );

  let lastNightTime = sunrise;
  if (lastNightTime[1] > 1 && lastNightTime[1] <= 59) lastNightTime[1] -= 1;
  lastNightTime[0] = lastNightTime[0] % 12;
  lastNightTime[0] =
    parseInt(lastNightTime[0]) < 10
      ? `0${parseInt(lastNightTime[0])}`
      : lastNightTime[0];
  lastNightTime[1] =
    parseInt(lastNightTime[1]) < 10
      ? `0${parseInt(lastNightTime[1])}`
      : lastNightTime[1];
  lastNight.textContent = `${lastNightTime.join(":")} AM`;
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let _sunrise = sunriseStr.split(":");
  let _sunset = sunsetStr.split(":");

  let start =
    `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` >=
      parseInt(
        `${_sunrise[0].toString().padStart(2, 0)}${_sunrise[1]
          .toString()
          .padStart(2, 0)}`
      ) &&
    `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` <
      parseInt(
        `${_sunset[0].toString().padStart(2, 0)}${_sunset[1]
          .toString()
          .padStart(2, 0)}`
      )
      ? Array.from(document.querySelectorAll("#nav-lighten-tab td:first-child"))
      : Array.from(document.querySelectorAll("#nav-darken-tab td:first-child"));
  let end =
    `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` >=
      parseInt(
        `${_sunrise[0].toString().padStart(2, 0)}${_sunrise[1]
          .toString()
          .padStart(2, 0)}`
      ) &&
    `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` <
      parseInt(
        `${_sunset[0].toString().padStart(2, 0)}${_sunset[1]
          .toString()
          .padStart(2, 0)}`
      )
      ? Array.from(document.querySelectorAll("#nav-lighten-tab td:last-child"))
      : Array.from(document.querySelectorAll("#nav-darken-tab td:last-child"));
  hours = hours === 0 ? 12 : hours;
  hours = hours !== 12 ? hours % 12 : hours;
  hours = hours < 10 ? `0${hours}` : hours;
  let __theDayDate =
    selectedDate === "today"
      ? new Date()
          .toLocaleDateString("en-UK")
          .replace(/\//g, "-")
          .split("-")
          .reverse()
          .join("-")
      : new Date(selectedDate)
          .toLocaleDateString("en-UK")
          .replace(/\//g, "-")
          .split("-")
          .reverse()
          .join("-");
  let elActive = null;
  function reActiveElement() {
    if (__theDayDate === latAndLong.dayDate) {
      for (let i = 0; i < start.length; i++) {
        let timeCheckBig = start[i].textContent.split(":").join("");
        let timeCheckLess = end[i].textContent.split(":").join("");
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        let amOrPm = date.getHours() > 11 ? "PM" : "AM";
        let check = start[i].textContent.indexOf(amOrPm) !== -1;
        let isBig = parseInt(timeCheckBig) < parseInt(`${hours}${minutes}`);
        let isLess = parseInt(timeCheckLess) >= parseInt(`${hours}${minutes}`);
        let MatchPmOrAm = start[i].textContent.match(/AM|PM/);
        if (
          end[i].textContent.indexOf(MatchPmOrAm[0]) === -1 &&
          parseInt(start[i].textContent.split(":").join("")) <=
            `${hours}${minutes}`
        ) {
          check = true;
        }
        if (
          start[i].textContent.split(":")[0] <= hours &&
          start[i].textContent.split(":")[0] >=
            end[i].textContent.split(":")[0] &&
          parseInt(start[i].textContent.split(":").join("")) <=
            `${hours}${minutes}`
        ) {
          isBig = parseInt(timeCheckBig) < parseInt(`${hours}3${minutes}`);
          isLess =
            parseInt(timeCheckLess.replace("01", "13")) >=
            parseInt(`${hours}${minutes}`);
          if (
            start[i].textContent.indexOf(amOrPm) !== -1 ||
            end[i].textContent.indexOf(amOrPm) !== -1
          )
            check = true;
        }
        if (
          start[i].textContent.indexOf("12") !== -1 &&
          parseInt(end[i].textContent.split(":")[0]) === 1
        ) {
          isBig = parseInt(timeCheckBig) < parseInt(`${hours}3${minutes}`);
        }
        if (check && isBig && isLess) {
          thePlanetNow = {
            start: start[i].textContent,
            end: end[i].textContent,
          };
          start[i].parentElement.classList.add("active");
          elActive = start[i].parentElement;
          break;
        }
      }
      if (elActive) {
        document
          .querySelector("tr.active td:nth-child(2)")
          .append(createElement());
        let selectedMinuteStart = document.querySelector(
          "tr.active td:nth-child(1)"
        );
        let selectedMinuteEnd = document.querySelector(
          "tr.active td:nth-child(3)"
        );
        let minuteStart = selectedMinuteStart.textContent.split(":");
        let minuteEnd = selectedMinuteEnd.textContent.split(":");
        let hours = date.getHours();
        hours = hours !== 12 ? hours % 12 : hours;
        hours = hours < 1 ? 12 : hours;
        hours = hours < 10 ? `0${hours}` : hours;
        if (parseInt(minuteEnd[0]) === 1 && hours === 12) minuteEnd[0] = 13;
        if (parseInt(minuteEnd[0]) == parseInt(minuteStart[0])) {
          let time =
            parseInt(minuteEnd[0] + minuteEnd[1]) -
            parseInt(minuteStart[0] + minuteStart[1]) -
            date.getMinutes();
          startTimer(time * 60, document.querySelector("#tableTime"));
        } else {
          if (minuteEnd[0] == hours) {
            let time =
              parseInt(minuteEnd[0] + minuteEnd[1]) -
              parseInt(
                `${hours}${date.getMinutes().toString().padStart(2, 0)}`
              );
            startTimer(time * 60, document.querySelector("#tableTime"));
          } else {
            let time =
              (parseInt(minuteEnd[0]) - hours) * 60 +
              (parseInt(minuteEnd[1]) - date.getMinutes());
            startTimer(time * 60, document.querySelector("#tableTime"));
          }
        }
      }
    }
  }
  reActiveElement();
  function startTimer(duration, display) {
    let timer = duration - new Date().getSeconds(),
      minutes,
      seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.innerHTML = `
        <div class="d-flex flex-column">
          <span>${seconds}</span>
        </div>
        <span class="dot">:</span>
        <div class="d-flex flex-column">
          <span>${minutes}</span>
        </div>
      `;

      if (--timer < 0) {
        timer = duration;
        if (document.getElementById("tableTime"))
          document.getElementById("tableTime").remove();
        setTimeout(() => {
          window.location.reload();
        }, 66000);
      }
    }, 1000);
  }
  document.getElementById("dateChecker").addEventListener("click", (e) => {
    document
      .querySelector(".calender-picker")
      .classList.remove("close-calender");
  });

  backToDate.onclick = function (e) {
    e.target.classList.remove("show");
    loadDate(latAndLong.latitude, latAndLong.longitude, latAndLong.dayDate);
  };
  let theDayDate = new Date(selectedDate)
    .toLocaleDateString("en-UK")
    .replace(/\//g, "-")
    .split("-")
    .reverse()
    .join("");
  if (theDayDate == latAndLong.dayDate) {
    backToDate.classList.remove("show");
  }
}

function createElement(el = "div") {
  let element = document.createElement(el);
  element.id = "tableTime";
  return element;
}

function getSunriseTime() {
  let suncalc = SunCalc.getTimes(
    new Date(),
    latAndLong.latitude,
    latAndLong.longitude
  );
  let sunsetStr = suncalc.sunset.getHours() + ":" + suncalc.sunset.getMinutes();
  let sunset = sunsetStr.split(":");
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (
    `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` >
    parseInt(
      `${sunset[0].toString().padStart(2, 0)}${sunset[1]
        .toString()
        .padStart(2, 0)}`
    )
  ) {
    let tomorrow = date.setDate(date.getDate() + 1);
    latAndLong.dayDate = new Date(tomorrow)
      .toLocaleDateString("en-UK")
      .replace(/\//g, "-")
      .split("-")
      .reverse()
      .join("-");
    loadDate(latAndLong.latitude, latAndLong.longitude, latAndLong.dayDate);
    displayDate.innerHTML = new Date().toLocaleDateString("ar-EG");
  }
}
