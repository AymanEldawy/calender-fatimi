import { countries, cities, getCitiesByCountryCode } from "./cities.js";
import { months } from "./calender-setup.js";

// مجموع ساعات النهار / 12
// مجموع وقت الشروق + (رقم الساعة * الباقي من القسمة)
// باقي القسمة * 60 = عدد الدقائق المتبقية
// نطرحه من وقت الساعة القادمة و يظل هذا عدد الدقائق
// الوقت الحالي نطرح من الساعة القادمة

export let storageLocation = {
  fetchLocation: () => {
    let location = localStorage.getItem("TM_location");
    return JSON.parse(location)
      ? JSON.parse(location)
      : {
          latitude: "17.5065",
          longitude: "44.1316",
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
  fetchEvents() {
    let events = JSON.parse(localStorage.getItem("events"));
    return events && events.length ? events : [];
  },
  saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
  },
};

let theme = storageLocation.fetchTheme();

let LOCATION = storageLocation.fetchLocation();

export let latAndLong = {
  latitude: LOCATION.latitude || "17.5065",
  longitude: LOCATION.longitude || "44.1316",
  city: LOCATION.city || "Najran",
  country: LOCATION.country || "Saudi Arabia",
  day: "today",
  code: LOCATION.code || "SA",
  dayDate: new Date()
    .toLocaleDateString("en-UK")
    .replace(/\//g, "-")
    .split("-")
    .reverse()
    .join("-"),
};

let links = [
  { fileName: "index.html", title: "الصفحة الرئيسية" },
  { fileName: "calender.html", title: "التقويم السليماني" },
  { fileName: "times.html", title: "ساعات الليل و النهار" },
  { fileName: "prayer-time.html", title: "مواقيت الصلاة" },
  { fileName: "smath.html", title: "حساب الجمل" },
  { fileName: "towers.html", title: "اعرف برجك" },
  { fileName: "compare.html", title: "المقارنة بين الابراج" },
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
    title: "الاول من شهر رمضان",
    date: toDateGregorian({ month: 9, day: 1 }),
    deletable: false,
  },
  {
    title: "السابع عشر من شهر رمضان",
    date: toDateGregorian({ month: 9, day: 17 }),
    deletable: false,
  },
  {
    title: "التاسع عشر من شهر رمضان",
    date: toDateGregorian({ month: 9, day: 19 }),
    deletable: false,
  },
  {
    title: "الواحد و العشرون من شهر رمضان",
    date: toDateGregorian({ month: 9, day: 21 }),
    deletable: false,
  },
  {
    title: "الاخر من رمضان",
    date: toDateGregorian({ month: 9, day: 30 }),
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
  {
    title: "عيد الغدير المواف",
    date: toDateGregorian({ month: 12, day: 18 }),
    deletable: false,
  },
];
let events = storageLocation.fetchEvents();
const eventsExists = events.filter((event) => event.deletable === false);
if (eventsExists.length < 1) {
  globalEvents.forEach((event) => {
    events.push({
      title: event.title,
      date: event.date,
      deletable: event.deletable,
      color: "#ffc107",
    });
  });
  storageLocation.saveEvents(events);
}

function toDateGregorian(dateList) {
  let date = new Date();
  let year = date.toHijri()._year;
  const hijri = new HijriDate(year, dateList.month, dateList.day);
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
  let themeList = document.querySelector(".themes");
  themeList.innerHTML = `
    <li class="theme-color" data-theme="dark"></li>
    <li class="theme-color" data-theme="light"></li>
    <li class="theme-color" data-theme="red"></li>
    <li class="theme-color" data-theme="blue"></li>
    <li class="theme-color" data-theme="yellow"></li>
    <li class="theme-color" data-theme="green"></li>
    <li class="theme-color" data-theme="purple"></li>
  `;

  if (theme) {
    document.body.style.background = theme.bg;
    document
      .querySelector(`[data-theme="${theme.data}"]`)
      .classList.add("active");
  }

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
  if (document.querySelector(".events-page .events")) {
    let eventsContainer = document.querySelector(".events-page .events");
    let daysContainer = document.getElementById("tab-days");
    globalEvents.forEach((event) => {
      let gregorian = new Date(event.date).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      let hijri = new Date(event.date).toHijri();
      eventsContainer.innerHTML += `
      <li class="events-item __counter">
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
    let events = storageLocation.fetchEvents();
    let specificEvents = events.filter((event) => event.deletable === true);
    if (specificEvents.length < 1)
      daysContainer.innerHTML = `<div class="alert alert-info">لاضافة اي مناسبة خاصة عن طريق التقويم الفاطمي</div>`;
    specificEvents.forEach((event) => {
      let gregorian = new Date(event.date).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      let hijri = new Date(event.date).toHijri();
      daysContainer.innerHTML += `
      <li class="events-item __counter">
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
window.addEventListener("click", (e) => {
  if (
    document.getElementById("collapsibleNavId").classList.contains("show") &&
    !e.target.matches("#collapsibleNavId")
  ) {
    document.getElementById("collapsibleNavId").classList.remove("show");
  }
  if (e.target.classList.contains("theme-color")) {
    let siblings = [...e.target.parentElement.children];
    siblings.forEach((sibling) => sibling.classList.remove("active"));
    e.target.classList.add("active");
    let bg = window
      .getComputedStyle(e.target, null)
      .getPropertyValue("background-color");
    document.body.style.background = bg;
    storageLocation.saveTheme({ bg, data: e.target.dataset.theme });
    document.querySelector(".themes").classList.add("hide");
  }

  if (e.target.matches("#changeTheme")) {
    document.querySelector(".themes").classList.toggle("hide");
  }
  if (e.target.matches("#autoLocation")) {
    getLocation();
  }
  if (e.target.matches("#chooseLocation")) {
    defaultLocation();
    overlayPopup.classList.add("open");
  }
  if (e.target.matches("#closeLocation")) {
    overlayPopup.classList.remove("open");
  }
  if (e.target.matches("#addLocation")) {
    setLocation();
  }
  if (e.target.matches("._modal")) {
    document.querySelector("._modal").classList.add("hide");
  }
  if (e.target.matches("#tab-events-btn")) {
    document.querySelector("#tab-events-btn").classList.add("active");
    document.querySelector("#tab-days-btn").classList.remove("active");
    document.querySelector(
      ".tab-toggler"
    ).className = `tab-toggler open-events-tab `;
  }
  if (e.target.matches("#tab-days-btn")) {
    document.querySelector("#tab-days-btn").classList.add("active");
    document.querySelector("#tab-events-btn").classList.remove("active");
    document.querySelector(
      ".tab-toggler"
    ).className = `tab-toggler open-days-tab `;
  }
  if (e.target.matches(".open-events-modal")) {
    document.querySelector("._modal").classList.remove("hide");
  }
});

// window.onload = function () {
openChooseLocation();
createEventModal();
displayCountry();
document.querySelector("#country").addEventListener("change", (e) => {
  changeCountry(e.target.value.split("%")[1]);
});

function openChooseLocation() {
  let div = document.createElement("div");
  div.className = `overlay`;
  div.id = `overlayPopup`;
  div.innerHTML = `
  <div class="manual-location" id="manualLocation">
    <span id="closeLocation" data-title="اغلاق" class="custom_tooltip close-location">
      <i class="gg-close"></i>
    </span>
    <p>اختار موقعك:</p>
    <div class="d-flex align-items-center">
      <div class="form-group">
        <label for="">الدولة</label>
        <select
          translate="yes"
          class="form-control"
          name=""
          id="country"
        ></select>
      </div>
      <div class="form-group cities">
        <label for="">المدينة</label>
        <select
          translate="yes"
          class="form-control"
          name=""
          id="city"
        ></select>
      </div>
      <button
        type="button"
        id="addLocation"
        class="btn btn-success"
        title="حفظ الموقع"
      >
        <i class="gg-bookmark"></i>
      </button>
    </div>
</div>`;
  document.body.prepend(div);
}

function createEventModal() {
  let eventModal = document.createElement("div");
  eventModal.className = "_modal hide";
  eventModal.innerHTML = `
    <div class="events-page">
      <div class="modal-tabs">
        <button id="tab-events-btn" class="active">المناسبات</button>
        <button id="tab-days-btn">المناسبات الخاصة</button>
      </div>
      <div class="tab-toggler open-events-tab">
        <ul id="tab-events" class="events text-center"></ul>
        <ul id="tab-days" class="events text-center"><ul>
      </div>
  </div>
 `;
  document.body.prepend(eventModal);
}

function setLocation() {
  let country = document.getElementById("country").value.split("%");
  let cityInfo = document.getElementById("city").value;
  let cityLocation = cityInfo.split("__");
  let latitude = cityLocation[0];
  let longitude = cityLocation[1];
  let city = cityLocation[2];
  let currentLocation = {
    country: country[0],
    city,
    latitude,
    longitude,
    code: country[1],
  };
  latAndLong = { ...latAndLong, ...currentLocation };
  storageLocation.saveLocation(currentLocation);
  window.location.reload();
  document.getElementById("overlayPopup").classList.remove("open");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
async function showPosition(position) {
  let countryInfo = await fetch(`https://api.db-ip.com/v2/free/self`)
    .then((data) => data.json())
    .then((d) => d);
  let currentLocation = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    city: countryInfo.city,
    country: countryInfo.countryName,
    code: countryInfo.countryCode,
  };
  latAndLong = { ...latAndLong, ...currentLocation };
  if (
    window.location.pathname == "/prayer-time.html" ||
    window.location.pathname == "/times.html" ||
    window.location.pathname == "/index.html"
  ) {
    window.location.reload();
  }
  storageLocation.saveLocation(currentLocation);
}

function defaultLocation() {
  let LOCATION = storageLocation.fetchLocation();
  latAndLong.latitude = LOCATION.latitude;
  latAndLong.longitude = LOCATION.longitude;
  if (LOCATION && LOCATION.country) {
    document.querySelectorAll("#country option").forEach((e) => {
      if (LOCATION.country == e.value) {
        e.setAttribute("selected", "selected");
        changeCountry(LOCATION.country);
        document.querySelectorAll("#city option").forEach((e) => {
          if (LOCATION.city == e.value.split("-")[2]) {
            e.setAttribute("selected", "selected");
          }
        });
      }
    });
  }
}

function changeCountry(countryCode = "SA") {
  let citiesSelected = getCitiesByCountryCode(countryCode);
  document.querySelector("#city").innerHTML = "";
  citiesSelected.forEach((city) => {
    document.querySelector(
      "#city"
    ).innerHTML += `<option value="${city.lat}__${city.lng}__${city.name}">${city.name}</option>`;
  });
}

function displayCountry() {
  document.querySelector("#country").innerHTML = "";
  countries.forEach((country) => {
    document.querySelector(
      "#country"
    ).innerHTML += `<option value="${country.Name}%${country.Alpha2Code}">${country.Name}</option>`;
  });
  changeCountry(countries[0].Alpha2Code);
}
