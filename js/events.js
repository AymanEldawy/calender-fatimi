import { storeEvents } from "./calender-package.js";
import { a2e, countDownTime, leapYears, months } from "./calender-setup.js";

console.log(storeEvents.fetchEvents());

const globalEvents = [
  {
    title: "بداية السنة",
    date: toDateGregorian({ month: 1, day: 1 }),
    deletable: false,
  },
  {
    title: "عاشوراء",
    date: toDateGregorian({ month: 1, day: 10 }),
    deletable: false,
  },
  {
    title: "الاول من رجب",
    date: toDateGregorian({ month: 7, day: 1 }),
    deletable: false,
  },
  {
    title: "نصف رجب",
    date: toDateGregorian({ month: 7, day: 15 }),
    deletable: false,
  },
  {
    title: "السابع و العشرون من رجب",
    date: toDateGregorian({ month: 7, day: 27 }),
    deletable: false,
  },
  {
    title: "نصف شعبان",
    date: toDateGregorian({ month: 8, day: 15 }),
    deletable: false,
  },
  {
    title: "رمضان",
    date: toDateGregorian({ month: 9, day: 1 }),
    deletable: false,
  },
  {
    title: "عيد الفطر",
    date: toDateGregorian({ month: 10, day: 1 }),
    deletable: false,
  },
  {
    title: "يوم عرفة",
    date: toDateGregorian({ month: 12, day: 9 }),
    deletable: false,
  },
  {
    title: "عيد الاضحي",
    date: toDateGregorian({ month: 12, day: 10 }),
    deletable: false,
  },
];
function toDateGregorian(dateList) {
  let date = new Date();
  const hijri = new HijriDate(
    parseInt(
      a2e(new Date(date).toLocaleDateString("ar-SA", { year: "numeric" }))
    ),
    dateList.month,
    dateList.day
  );
  // check date
  const gregorian = hijri.toGregorian();
  return gregorian;
}

function calculateDate(date) {
  let countDownDate = new Date(date).getTime();
  let distance = countDownDate - new Date().getTime();
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  console.log(days);
  if (days <= 0) {
    return `<span class="timerDays completed">مضي</span>`;
  }
  return `<span class="timerDays">باقي ${days > 1 ? `${days} يوم` : "يوم واحد"}</span>`;
}
let eventsContainer = document.querySelector(".events");
globalEvents.forEach((event) => {
  let gregorian = new Date(event.date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let hijri = new Date(event.date).toHijri();
  let _id = Math.floor(Math.random() * hijri._date);
  eventsContainer.innerHTML += `
  <li class="events-item">
    <h4>${event.title}</h4>
    <p class="d-flex align-items justify-content-between">
      <span>${new Date(event.date).toLocaleDateString("ar-SA", {
        weekday: "long",
      })} ${hijri._date} ${months[hijri._month]} ${hijri._year}</span>
      <span>${gregorian}</span>
      </p>
    ${calculateDate(event.date)}
  `;
});
