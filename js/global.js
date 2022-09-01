
import { a2e, months } from "./calender-setup.js";

export let storageLocation = {
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
  fetchTheme: () => {
    let theme = localStorage.getItem("TM_theme");
    return JSON.parse(theme) ? JSON.parse(theme) : "";
  },
  saveTheme: (theme) => {
    localStorage.setItem("TM_theme", JSON.stringify(theme));
  },
};


let links = [
  { fileName: "index.html", title: "الصفحة الرئيسية" },
  { fileName: "times.html", title: "ساعات الليل و النهار" },
  { fileName: "towers.html", title: "اعرف برجك" },
  { fileName: "compare.html", title: "مقارنة بين الابراج" },
  { fileName: "smath.html", title: "حساب الجمل" },
  { fileName: "calender.html", title: "التقويم الفاطمي" },
  { fileName: "prayer-time.html", title: "مواقيت الصلاة" },
];

export const globalEvents = [
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

export function calculateDate(date) {
  const calculateDaysFormat = (days) => {
    switch (true) {
      case days === 1:
        return "باقي يوم";
        break;
      case days === 2:
        return "باقي يومان ";
        break;
      case days > 2 && days < 11:
        return `باقي ${days} أيام`;
        break;
      case days > 10:
        return `باقي ${days} يوم`;
        break;
      case days === 0:
        return "اليوم";
        break;
      case days === -1:
        return "منذ يوم";
        break;
      case days === -2:
        return "منذ يومان ";
        break;
      case days < -2 && days > -11:
        return `منذ ${Math.abs(days)} أيام`;
        break;
      case days < -10:
        return `منذ ${Math.abs(days)} يوم`;
        break;
    }
  };

  let countDownDate = new Date(date).getTime() + 1000 * 60 * 60 * 24;
  let distance = countDownDate - new Date().getTime();
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return `<span class="timerDays ${
    days < 0 && "completed"
  }">${calculateDaysFormat(days)}</span>`;
}

window.addEventListener("DOMContentLoaded", () => {
  function createEventModal() {
    let eventModal = document.createElement("div");
    eventModal.className = "_modal hide";
    eventModal.innerHTML = `
      <div class="events-page">
        <h2 class="text-center">المناسبات</h2>
        <ul class="events text-center">
        </ul>
    </div>
   `;
    document.body.prepend(eventModal);
  }
  createEventModal();
  let menu = document.querySelector(".navbar-nav");
  menu.innerHTML = "";
  links.forEach((link) => {
    menu.innerHTML += `
    <li class="nav-item ${
      "/" + link.fileName === location.pathname && "active"
    }" >
      <a class="nav-link" href="${link.fileName}">${link.title}</a>
    </li>
    `;
  });
  menu.innerHTML += `<span class="open-events-modal">المناسبات</span>`;

  if (document.querySelector(".events-page .events")) {
    let eventsContainer = document.querySelector(".events-page .events");
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
  }
});
window.addEventListener('click', (e) => {
  if(e.target.matches('._modal')) {
    document.querySelector('._modal').classList.add('hide')
  } 
  if(e.target.matches('li .open-events-modal')) {
    document.querySelector('._modal').classList.remove('hide')
  }
})