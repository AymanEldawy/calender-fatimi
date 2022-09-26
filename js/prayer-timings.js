import { latAndLong } from "./global.js";
import SunCalc from "./suncalc.js";



export function prayerTimings(selectedDate = new Date()) {
  let sunCalc = SunCalc.getTimes(
    new Date(selectedDate),
    latAndLong.latitude,
    latAndLong.longitude
  );

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

  let fajrCalc = parseInt(sunrise[0]) * 60 + parseInt(sunrise[1]) - 70;
  let fajrHours = parseInt(fajrCalc / 60);
  let fajrCalcMinutes = parseFloat(fajrCalc / 60)
    .toFixed(2)
    .split(".")[1];
  let fajrMinutes = Math.round(parseFloat(`.${fajrCalcMinutes}`) * 60);
  let fajrTime = resetTime(fajrHours, fajrMinutes);
  let sunriseTime = resetTime(sunrise[0], sunrise[1]);
  let duherHours =
    parseInt(sunrise[0]) + parseInt(((dayLenLight / 12) * 6) / 60);
  let duherMinutes = parseInt(sunrise[1]) + (((dayLenLight / 12) * 6) % 60);
  let duherTime = resetTime(parseInt(duherHours), parseInt(duherMinutes));

  let aserHours =
    parseInt(sunrise[0]) + parseInt(((dayLenLight / 12) * 8) / 60);
  let aserMinutes = parseInt(sunrise[1]) + (((dayLenLight / 12) * 8) % 60);
  let aserTime = resetTime(parseInt(aserHours), parseInt(aserMinutes));

  let sunsetTime = resetTime(sunset[0], sunset[1]);
  let ishaCalc = parseInt(sunset[0]) * 60 + parseInt(sunset[1]) + 60;
  let ishaHours = parseInt(ishaCalc / 60);
  let ishaCalcMinutes = parseFloat(ishaCalc / 60)
    .toFixed(2)
    .split(".")[1];
  let ishaMinutes = Math.round(parseFloat(`.${ishaCalcMinutes}`) * 60);
  let ishaTime = resetTime(ishaHours, ishaMinutes);
  
  let midNightHours =
    parseInt(sunset[0]) + parseInt(((dayLenNight / 12) * 6) / 60);
  let midNightMinutes = parseInt(sunset[1]) + (((dayLenNight / 12) * 6) % 60);
  let midNightTime = resetTime(parseInt(midNightHours), parseInt(midNightMinutes));
  return {
    Fajr: fajrTime,
    Sunrise: sunriseTime,
    Duher: duherTime,
    Asr: aserTime,
    Maghrib: sunsetTime,
    Isha: ishaTime,
    MidNight: midNightTime
  };
}

function resetTime(hours, minutes) {
  if (minutes > 59) {
    hours += 1;
    minutes = minutes - 60;
  }
  if (minutes < 0) {
    hours -= 1;
    minutes = 60 - minutes;
  }
  hours = hours % 12;
  hours = hours == 0 ? 12 : hours;
  return `${hours.toString().padStart(2, 0)}:${minutes
    .toString()
    .padStart(2, 0)}`;
}
