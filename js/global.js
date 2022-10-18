import { countries, getCitiesByCountryCode } from "./cities.js";
import { months } from "./calender-setup.js";

export let storageLocation = {
  fetchLocation: () => {
    let location = localStorage.getItem("TM_location");
    return JSON.parse(location) ? JSON.parse(location) : {};
  },
  saveLocation: (location) => {
    localStorage.setItem("TM_location", JSON.stringify(location));
  },
  fetchTheme: () => {
    let theme = localStorage.getItem("TM_theme");
    return JSON.parse(theme)
      ? JSON.parse(theme)
      : { bg: "rgb(215, 222, 225)", data: "light", item: "blue" };
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
  day: "today",
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
  // { fileName: "compare.html", title: "المقارنة بين الابراج" },
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
function createModalLocation() {
  document.body.style.overflow = "hidden";
  let div = document.createElement("div");
  div.className = `_modal modal-location`;
  div.innerHTML = `
    <div class="modal-location-content">
      <div id="userDenied" class="hidden alert alert-danger mb-3"></div>
      <div class="location-msg">
        <h2>لتجربة أفضل  من فضلك قم بادخال الموقع</h2>
        <div class="mt-4">
        <button class="btn btn-primary mx-2" class="m_location">أختيار الموقع يدوي</button>
        <button class="btn btn-outline-primary" class="a_location">تحديد الموقع تلقائي</button>
        </div>
      </div>
    </div>
  `;
  document.body.append(div);
}
console.log("run") 

function displayEvents(event, id) {
  let li = document.createElement("li");
  let gregorian = new Date(event.date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let hijri = new Date(event.date).toHijri();
  li.className = "events-item __counter";
  li.id = id ? "closestEventItem" : "";
  li.innerHTML += `
    <h4>${event.title}</h4>
    <p class="d-flex align-items justify-content-between">
      <span>${new Date(event.date).toLocaleDateString("ar-SA", {
        weekday: "long",
      })} ${hijri._date} ${months[hijri._month]} ${hijri._year}</span>
      <span>${gregorian}</span>
      </p>
    ${calculateDate(event.date)}
  `;
  return li;
}
window.addEventListener("DOMContentLoaded", () => {
  if (!LOCATION.latitude) {
    createModalLocation();
    getLocation();
  }
  let themeList = document.querySelector(".themes");
  themeList.innerHTML = `
    <p>الخلفية</p>
    <ul class="themes-list">
      <li class="theme-color" data-theme="dark"></li>
      <li class="theme-color" data-theme="light"></li>
      <li class="theme-color" data-theme="red"></li>
      <li class="theme-color" data-theme="blue"></li>
      <li class="theme-color" data-theme="yellow"></li>
      <li class="theme-color" data-theme="green"></li>
      <li class="theme-color" data-theme="purple"></li>
      <li class="theme-color" data-theme="white"></li>
    </ul>
    <hr>
    <p>العناصر</p>
    <ul class="themes-list">
      <li class="theme-color" data-items_bg="green"></li>
      <li class="theme-color" data-items_bg="silver"></li>
      <li class="theme-color" data-items_bg="golden"></li>
      <li class="theme-color" data-items_bg="darker"></li>
      <li class="theme-color" data-items_bg="purple"></li>
      <li class="theme-color" data-items_bg="brown"></li>
      <li class="theme-color" data-items_bg="blue"></li>
      <li class="theme-color" data-items_bg="white"></li>
    </ul>
  `;

  if (theme) {
    document.body.style.background = theme.bg;
    document.body.setAttribute("data-theme_bg", theme.item);
    document
      .querySelector(`[data-theme="${theme.data}"]`)
      .classList.add("active");
    document
      .querySelector(`[data-items_bg="${theme.item}"]`)
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
  menu.innerHTML += `
  <div class="dropdown-divider border-gray"></div>
  <span class='nav-btn'>شرح الموقع</span>
  <span class='nav-btn'>عن الموقع</span>
  `;

  if (document.querySelector(".events-page .events")) {
    let eventsContainer = document.querySelector(".events-page .events");
    let daysContainer = document.getElementById("tab-days");

    let count = 0;
    let date = new Date();
    let minusDay = date.setDate(date.getDate() - 1);
    globalEvents.forEach((event) => {
      if (
        Date.parse(event.date) >= Date.parse(new Date(minusDay)) &&
        count < 1
      ) {
        eventsContainer.append(displayEvents(event, true));
        count++;
      } else eventsContainer.append(displayEvents(event));
    });
    let events = storageLocation.fetchEvents();
    let specificEvents = events.filter((event) => event.deletable === true);
    if (specificEvents.length < 1)
      daysContainer.innerHTML = `<div class="alert alert-info">يمكنك اضافة مناسبة خاصة عن طريق الذهاب لتقويم الفتح السليماني من القائمة الرئيسية</div>`;
    specificEvents.forEach((event) => {
      daysContainer.append(displayEvents(event));
    });
  }
  aboutWeb();
  explainWeb();
  let height = window
    .getComputedStyle(document.body, "")
    .getPropertyValue("height");
  if (parseInt(height) < window.innerHeight) {
    document.body.style.minHeight = window.innerHeight + "px";
  }
});
window.addEventListener("click", (e) => {
  if (e.target.matches("#opencreateModalRule")) {
    window.open("media/allowed.png", "blank");
  }
  if (
    document.getElementById("collapsibleNavId").classList.contains("show") &&
    !e.target.matches("#collapsibleNavId")
  ) {
    document.querySelector(".navbar-toggler").click();
  }
  if (e.target.matches(".theme-color[data-items_bg]")) {
    let siblings = [...e.target.parentElement.children];
    siblings.forEach((sibling) => sibling.classList.remove("active"));
    e.target.classList.add("active");
    document.body.setAttribute("data-theme_bg", e.target.dataset.items_bg);
    storageLocation.saveTheme({ ...theme, item: e.target.dataset.items_bg });
  }
  if (e.target.matches(".theme-color[data-theme]")) {
    let siblings = [...e.target.parentElement.children];
    siblings.forEach((sibling) => sibling.classList.remove("active"));
    e.target.classList.add("active");
    let bg = window
      .getComputedStyle(e.target, null)
      .getPropertyValue("background-color");
    document.body.style.background = bg;
    storageLocation.saveTheme({ ...theme, bg, data: e.target.dataset.theme });
    document.querySelector(".themes").classList.add("hide");
  }

  if (e.target.matches("#changeTheme")) {
    document.querySelector(".themes").classList.toggle("hide");
  }
  if (e.target.matches("#autoLocation") || e.target.matches(".a_location")) {
    getLocation();
  }
  if (e.target.matches("#chooseLocation") || e.target.matches(".m_location")) {
    document.getElementById("overlayPopup").classList.add("open");
  }
  if (e.target.matches("#closeLocation") || e.target.matches(".overlay")) {
    document.getElementById("overlayPopup").classList.remove("open");
  }
  if (!e.target.matches(".themes") && !e.target.matches("#changeTheme")) {
    document.querySelector(".themes").classList.add("hide");
  }
  if (e.target.matches("#addLocation")) {
    setLocation();
  }
  if (e.target.matches(".nav-btn:first-of-type")) {
    document.querySelector(".modal-explain").classList.remove("hide");
  }
  if (e.target.matches(".modal-explain")) {
    document.querySelector(".modal-explain").classList.add("hide");
  }
  if (e.target.matches(".nav-btn:last-of-type")) {
    document.querySelector(".modal-about").classList.remove("hide");
  }
  if (e.target.matches(".modal-about")) {
    document.querySelector(".modal-about").classList.add("hide");
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
  if (e.target.matches(".open-events-modal a")) {
    document.querySelector("._modal").classList.remove("hide");
  }
});

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
  let cityInfo = document.getElementById("city").value;
  let cityLocation = cityInfo.split("__");
  let latitude = cityLocation[0];
  let longitude = cityLocation[1];
  let currentLocation = {
    latitude,
    longitude,
  };
  latAndLong = { ...latAndLong, ...currentLocation };
  storageLocation.saveLocation(currentLocation);
  window.location.reload();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
    navigator.permissions &&
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (PermissionStatus) {
          if (PermissionStatus.state == "granted") {
            // console.log("allowed");
          } else if (PermissionStatus.state == "prompt") {
            // console.log(" prompt - not yet grated or denied");
          } else {
            if (!document.querySelector(".modal-location")) {
              createModalLocation();
            }
            userDeniedMessage();
          }
        });
  }
}

function userDeniedMessage() {
  let msg = document.getElementById("userDenied");
  document.querySelector(".location-msg").style.display = "none";
  document.querySelector(".modal-location-content").classList.add("__alert");
  msg.style.display = "block";
  msg.innerHTML = `
    <h3 class="text-center d-block mb-3 font-bold">تم رفض الوصول الي الموقع.</h3>
    <p>- من فضلك قم باعادة 
    <button class='alert-link btn p-0 border-0 text-primary' id='opencreateModalRule'> تفعيل الصلاحيات </button>
     ثم اختيار 
     <button class='alert-link a_location btn p-0 border-0 text-primary'>التحديد التلقائي</button>
     </p>
    <p class="mb-0">- او قم بادخال <button class='alert-link m_location btn p-0 border-0 text-primary'>الموقع يدويا</button></p>
  `;
}

function errorPosition(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      if (!LOCATION.latitude) {
        userDeniedMessage();
      }
      break;
  }
}
async function showPosition(position) {
  let currentLocation = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  latAndLong = { ...latAndLong, ...currentLocation };
  storageLocation.saveLocation(currentLocation);
  window.location.reload();
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

function aboutWeb() {
  let div = document.createElement("div");

  div.className = `_modal modal-about hide`;
  div.innerHTML = `
    <div class="_modal-content">
      <h2 class="_modal-title">عن الموقع</h2>
      <div class="about">
     <p>
بسم الله الرحمن الرحيم الحمد لله حمداً متصلاً دائماً كثيراً، وصلى الله على النبي محمد وأهل بيتة الذين أذهب الله عنهم الرجس وطهرهم تطهيراً.
</p>
<p>نظرا لما يعانيه البعض من أهل الدعوة الهادية من قلة مصادر التقويم الإسماعيلي ووقوعهم في الخطاء أحيانا والشك أحيانا أخرى، فقد استعنت بالله بعد اخذ موافقة ولي نعمتي بوضع هذا التقويم البسيط ليسهل للمرتاد الوصول الى مبتغاه وزيادة، ووسمته بـــ (الفتح السليماني الطيبي) راجيا من الله أن يستفيد منه جميع الإخوان حامدا لله وشاكرا تمام نعمته مرجعا صحة ذلك لولي النعمة وما كان من خطاء فهوا من قصوري وفهمي.</p>
<span>والحمد لله رب العالمين</span>
</div>
</div>
  `;
  document.body.appendChild(div);
}
function explainWeb() {
  let div = document.createElement("div");

  div.className = `_modal modal-explain hide`;
  div.innerHTML = `
  <div class="_modal-content">
    <h2 class="_modal-title">شرح الموقع</h2>
    <div class="videos">
      <div class="videos-item">
        <h4>مقدمة</h4>
        <video controls src="media/مقدمة.mp4"></video>
      </div>
      <div class="videos-item">
        <h4>الرئيسية</h4>
        <video controls src="media/الرئيسية.mp4"></video>
      </div>
      <div class="videos-item">
        <h4>التقويم</h4>
        <video controls src="media/التقويم.mp4"></video>
      </div>
      <div class="videos-item">
        <h4>الساعات</h4>
        <video controls src="media/الساعات.mp4"></video>
      </div>
      <div class="videos-item">
        <h4>مواقيت الصلاة</h4>
        <video controls src="media/مواقيت الصلاة.mp4"></video>
      </div>
      <div class="videos-item">
        <h4>حساب الجمل</h4>
        <video controls src="media/حساب الجمل.mp4"></video>
      </div>
      <div class="videos-item">
        <h4>أعرف برجك</h4>
        <video controls src="media/اعرف برجك.mp4"></video>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(div);
}

