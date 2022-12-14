import { weeks, daysInfo } from "./weeks.js";
import { storageLocation, latAndLong } from "./global.js";
// const SunCalc = require("suncalc2");
import SunCalc from "./suncalc.js";
import { theCurrentDate } from "./calender-setup.js";

let elActive = null;
function planetTimings(latitude, longitude, selectedDate) {
  let allHours = [];
  let theSelectedDay = new Date(selectedDate).getDay();
  let sunCalc = SunCalc.getTimes(new Date(selectedDate), latitude, longitude);
  let sunriseStr =
    sunCalc.sunrise.getHours() + ":" + sunCalc.sunrise.getMinutes();
  let sunsetStr = sunCalc.sunset.getHours() + ":" + sunCalc.sunset.getMinutes();
  let sunrise = sunriseStr.split(":");
  let sunset = sunsetStr.split(":");

  let dayLen = `${
    parseInt(sunsetStr.split(":")[0]) - parseInt(sunriseStr.split(":")[0])
  }:${
    parseInt(sunsetStr.split(":")[1]) - parseInt(sunriseStr.split(":")[1])
  }`.split(":");
  let dayLenLight = parseInt(dayLen[0]) * 60 + parseInt(dayLen[1]);
  let dayLenNight = 1440 - dayLenLight;
  let valuePlusLight = Math.floor((dayLenLight / 12) * 1 - 60);
  let valuePlusNight = Math.floor((dayLenNight / 12) * 1 - 60);
  theSelectedDay = theSelectedDay < 0 ? 0 : theSelectedDay;
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
    if (i == 11) {
      allHours.push({
        start,
        end,
        planet: weeks[`${theSelectedDay}light`][i],
        nextPlanet: weeks[`${(theSelectedDay + 1) % 7}night`][0],
      });
    } else {
      allHours.push({
        start,
        end,
        planet: weeks[`${theSelectedDay}light`][i],
        nextPlanet: weeks[`${theSelectedDay}light`][i + 1],
      });
    }
  }
  for (let i = 0; i < 12; i++) {
    let theHours = parseInt(((dayLenNight / 12) * i) / 60);
    let theMinutes = ((dayLenNight / 12) * i) % 60;
    let hours = parseInt(sunset[0] % 12) + theHours;
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
    if (i == 11) {
      allHours.push({
        start,
        end,
        planet: weeks[`${theSelectedDay}night`][i],
        nextPlanet: weeks[`${theSelectedDay}light`][0],
      });
    } else {
      allHours.push({
        start,
        end,
        planet: weeks[`${theSelectedDay}night`][i],
        nextPlanet: weeks[`${theSelectedDay}night`][i + 1],
      });
    }
  }

  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let timeCheckAmOrPm =
    `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` >=
      parseInt(
        `${sunrise[0].toString().padStart(2, 0)}${sunrise[1]
          .toString()
          .padStart(2, 0)}`
      ) &&
    `${hours.toString().padStart(2, 0)}${minutes.toString().padStart(2, 0)}` <
      parseInt(
        `${sunset[0].toString().padStart(2, 0)}${sunset[1]
          .toString()
          .padStart(2, 0)}`
      )
      ? "am"
      : "pm";
  if (timeCheckAmOrPm === "am") {
    document
      .querySelector(".table-style:nth-of-type(4)")
      .classList.add("style-light");
  } else {
    document
      .querySelector(".table-style:nth-of-type(4)")
      .classList.add("style-night");
  }

  hours = hours === 0 ? 12 : hours;
  hours = hours !== 12 ? hours % 12 : hours;
  hours = hours < 10 ? `0${hours}` : hours;
  for (let i = 0; i < allHours.length; i++) {
    let timeCheckBig = allHours[i].start.split(":").join("");
    let timeCheckLess = allHours[i].end.split(":").join("");
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let amOrPm = date.getHours() > 11 ? "PM" : "AM";
    let check = allHours[i].start.indexOf(amOrPm) !== -1;
    let isBig = parseInt(timeCheckBig) < parseInt(`${hours}${minutes}`);
    let isLess = parseInt(timeCheckLess) >= parseInt(`${hours}${minutes}`);
    let MatchPmOrAm = allHours[i].start.match(/AM|PM/);
    if (
      allHours[i].end.indexOf(MatchPmOrAm[0]) === -1 &&
      parseInt(allHours[i].start.split(":").join("")) <= `${hours}${minutes}`
    ) {
      check = true;
    }
    if (
      allHours[i].start.split(":")[0] <= hours &&
      allHours[i].start.split(":")[0] >= allHours[i].end.split(":")[0] &&
      parseInt(allHours[i].start.split(":").join("")) <= `${hours}${minutes}`
    ) {
      isBig = parseInt(timeCheckBig) < parseInt(`${hours}3${minutes}`);
      isLess =
        parseInt(timeCheckLess.replace("01", "13")) >=
        parseInt(`${hours}${minutes}`);
      if (
        allHours[i].start.indexOf(amOrPm) !== -1 ||
        allHours[i].end.indexOf(amOrPm) !== -1
      )
        check = true;
    }
    if (
      allHours[i].start.indexOf("12") !== -1 &&
      parseInt(allHours[i].end.split(":")[0]) === 1
    ) {
      isBig = parseInt(timeCheckBig) < parseInt(`${hours}3${minutes}`);
    }
    if (check && isBig && isLess) {
      elActive = allHours[i];
    }
  }

  if (elActive) {
    let timeNow = document.getElementById("timeNow");
    let timeNext = document.getElementById("timeNext");
    timeNow.innerHTML = elActive.planet.planet;
    timeNow.classList.add(`status-${elActive.planet.status}`);
    timeNext.innerHTML = elActive.nextPlanet.planet;
    timeNext.classList.add(`status-${elActive.nextPlanet.status}`);

    let minuteStart = elActive.start.split(":");
    let minuteEnd = elActive.end.split(":");
    let hours = date.getHours();
    hours = hours !== 12 ? hours % 12 : hours;
    hours = hours < 1 ? 12 : hours;
    hours = hours < 10 ? `0${hours}` : hours;
    if (parseInt(minuteEnd[0]) === 1 && hours === 12) {
      minuteEnd[0] = 13;
    }
    if (parseInt(minuteEnd[0]) == parseInt(minuteStart[0])) {
      let time =
        parseInt(minuteEnd[0] + minuteEnd[1]) -
        parseInt(minuteStart[0] + minuteStart[1]) -
        date.getMinutes();
      startTimer(time * 60, document.querySelector("#timeNowTimer"));
    } else {
      if (minuteEnd[0] == hours) {
        let time =
          parseInt(minuteEnd[0] + minuteEnd[1]) -
          parseInt(`${hours}${date.getMinutes().toString().padStart(2, 0)}`);
        startTimer(time * 60, document.querySelector("#timeNowTimer"));
      } else {
        let time =
          (parseInt(minuteEnd[0]) - hours) * 60 +
          (parseInt(minuteEnd[1]) - date.getMinutes());
        startTimer(time * 60, document.querySelector("#timeNowTimer"));
      }
    }
  }
}

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
      document.getElementById("timeNowTimer").parentElement.style.display =
        "none";
      setTimeout(() => {
        window.location.reload();
      }, 66000);
    }
  }, 1000);
}

window.addEventListener("DOMContentLoaded", () => {
  getSunriseTime();
});

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
    let currentDate = new Date();
    let hijri = currentDate.toHijri();
    hijri.addDay();
    let tomorrow = hijri.toGregorian();
    theCurrentDate.updateDate();
    planetTimings(
      latAndLong.latitude,
      latAndLong.longitude,
      new Date(tomorrow)
    );
  } else {
    planetTimings(latAndLong.latitude, latAndLong.longitude, new Date());
  }
}
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
  if (hours < 0) {
    hours = 11;
  }
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
