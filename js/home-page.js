import { daysFormat, months, century, getCentury, leapYears, a2e } from './calender-setup.js';
import { prayerTimingDay } from './prayer-time.js';

let bigCenturyName = ["الاول","الثاني","الثالث","الرابع","الخامس","السادس", "السابع"];
window.addEventListener('DOMContentLoaded', () => {
  let yearCalc = parseInt(a2e(new Date().toLocaleDateString('ar-SA', {year: 'numeric'})))
  console.log(new Date().toLocaleDateString('ar-SA', {year: 'numeric'}))
  document.getElementById('date').textContent = `${new Date().toLocaleDateString('ar-SA', { year: 'numeric', month:"long", weekday: "long", day: "numeric" })}`
  document.getElementById('bigCentury').innerHTML = `القرن <span>${bigCenturyName[parseInt(yearCalc / 210)]}</span> الاكبر`
  document.getElementById('smallCentury').innerHTML = `القرن <span>${getCentury(parseInt(yearCalc % 210))}</span> الاصغر`
  document.getElementById('yearLeap').innerHTML = `السنة <span>${leapYears.includes(new Date().toLocaleDateString('ar-SA') % 210) ? 'كبيسة' : 'بسيطة'}</span>`
  prayerTimingDay();

})