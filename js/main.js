// عناصر الابراج
let __fire = ["الحمل", "الاسد", "القوس"];
let __stone = ["الثور", "العذراء", "الجدي"];
let __wind = ["الجوزاء", "الميزان", "الدلو"];
let __water = ["السرطان", "العقرب", "الحوت"];

// نتائج الابراج
// تم تكرار هذه الجملة لتجنب الاخطاء
const resultCompare = [
  "هذا النوع من الذبذبة يحدث عندما يتصادم برجان متشابهان (مثل الجوزاء الجوزاء). هناك عادة تفاهم وود مشترك",
  "هذا النوع من الذبذبة يحدث عندما يتصادم برجان متشابهان (مثل الجوزاء الجوزاء). هناك عادة تفاهم وود مشترك",
  "توجد هناك احتمالية لاستمرارية هذه العلاقة",
  "هذه العلاقة مبنية على الصداقة والوفاء. يوجد بينهم ترابط قوي والزمالة طويلة الأمد",
  "هذه العلاقة بحاجة الى بعض التضحية لتخطي الأزمات",
  "وافق كامل!! هي علاقة مبنية على الاحترام الشديد، والتفاهم",
  "وجد هناك إحساس بعدم الارتياح وسوء التواصل لهذه العلاقة. سيشعر أحد أفراد هذه العلاقة برغبة ملحة لإرضاء الطرف الآخر. علاقة غير متوازنة!",
  "هذا البرج في الاتجاه المعاكس لبرجك في دائرة الأبراج. عندما العلاقة جميلة، فهي الأفضل. وعندما تكون سيئة، فهي الأسوأ.",
  "هذا البرج في الاتجاه المعاكس لبرجك في دائرة الابراج . عندما العلاقة جميلة , فهي الافضل . و عندما تكون سيئة , فهي الاسوأ.",
];
//هنا نتائج المقارنة تقدر تضيف اعداد تاني و تكتب قدامها او تعدل علي القديم

// هنا ملومات الابراج العدد يبدأ من 0
// ملحوظة رقم 0 و رقم 12 متشابهآ لتجنب الاخطاء
const towers = [
  {
    tower: "الحوت",
    planet: "المشتري (جوبيتر) ",
    item: "مائي",
    stone: "الزبرجد الأزرق، حجر القمر",
    features: "الإخلاص – الحساسية = الكآبة والروحانية",
    quality: "متغير",
    half: "سلبي",
    chines: "الأرنب",
    luck: " 12, 21, 39, 48, 57",
    face: "السرطان، العقرب أو الحوت",
  },
  {
    tower: "الحمل",
    planet: "المريخ (مارس)",
    item: "ناري",
    stone: "الماس",
    features: "الشجاعة – الحزم – النشاط = إلى الإندفاع والتهور.",
    quality: "جوهري",
    half: "أيجابي",
    chines: "التنين",
    luck: "1, 10 ,19, 28, 37, 46, 55",
    face: " الأسد أو القوس",
  },
  {
    tower: "الثور",
    planet: "هو الزهرة (فينوس) ",
    item: "ترابي",
    stone: "الكريم الزمرد",
    features: "الصبر – الإحساس بالواقع = العناد والتردد.",
    quality: "ثابت",
    half: "سلبي",
    chines: "الثعبان",
    luck: "2, 11, 29, 29, 37, 56",
    face: " العذراء أو الجدي",
  },
  {
    tower: "الجوزاء",
    planet: "لكوكب هو عطارد",
    item: "هوائي",
    stone: "الكريم اللؤلؤ",
    features:
      "المقدرة على التكيف – النشاط الذهني الحاد – الحاسة السادسة = الانغماس في الملذات!",
    quality: "متغير",
    half: "أيجابي",
    chines: "الحصان",
    luck: "3, 12, 21, 30, 48, 47",
    face: " الميزان، الدلو أو الجوزاء",
  },
  {
    tower: "السرطان",
    planet: "القمر",
    item: "مائي",
    stone: "الياقوت",
    features: "فكر متفتح – حساسية عاطفية وشفافية = إلتصاق بكل ما هو بيتوتي",
    quality: "جوهري",
    half: "سلبي",
    chines: "العنزة",
    luck: "4, 13, 22, 31, 40, 48, 57",
    face: "العقرب أو الحوت",
  },
  {
    tower: "الاسد",
    planet: "الشمس",
    item: "ناري",
    stone: "الزبرجد",
    features: "النبل – الحزم – النشاط = الغرور والأنانية",
    quality: "ثابت",
    half: "أيجابي",
    chines: "القرد",
    luck: "5, 14, 13, 32, 41, 50",
    face: "برج القوس أو الحمل",
  },
  {
    tower: "السنبلة (العذراء)",
    planet: "عطارد (ميركورى) ",
    item: "ترابي",
    stone: "الياقوت الازرق",
    features: "الرعاية – الإحساس بالواقع = النقد",
    quality: "متغير",
    half: "سلبي",
    chines: "الديك",
    luck: "6, 15, 24, 33, 42, 51",
    face: "الجدي، الثور أو العذراء",
  },
  {
    tower: "الميزان",
    planet: "الزهرة (فينوس) ",
    item: "هوائي",
    stone: "العقيق السفير",
    features: "العدالة – الرُقي = المطالبة بالحقوق",
    quality: "جوهري",
    half: "أيجابي",
    chines: "الكلب",
    luck: "7, 16, 25, 34, 43, 52",
    face: "الدلو، الجوزاء أو الميزان",
  },
  {
    tower: "العقرب",
    planet: "المريخ (مارس)  ",
    item: "مائي",
    stone: "التوباز, الأوبال",
    features: "قوة الإرادة – الشفافية = الغيرة وحُب التملك",
    quality: "ثابت",
    half: "سلبي",
    chines: "الخنزير",
    luck: "8, 17, 26, 35, 44, 53",
    face: "الحوت أو السرطان",
  },
  {
    tower: "القوس",
    planet: "المشتري (جوبيتر)",
    item: "ناري",
    stone: "الفيروز، التوباز",
    features: "النظام – الحزم والنشاط = التهور!",
    quality: "متغير",
    half: "أيجابي",
    chines: "الجرذ",
    luck: " 9, 18, 27, 36, 45, 54",
    face: "الحمل أو الأسد",
  },
  {
    tower: "الجدي",
    planet: " زحل (ساتورن)",
    item: "ترابي",
    stone: "العقيق الأحمر اليماني",
    features: "التأمل – العناد والتشبت بالرأي = التشاؤم",
    quality: "جوفري",
    half: "سلبي",
    chines: "الثور",
    luck: "10, 28, 37, 46, 55",
    face: "الثور أو العذراء",
  },
  {
    tower: "الدلو",
    planet: " زحل (ساتورن)",
    item: "هوائي",
    stone: "الأرجوان، الفيروز",
    features: "التجديد – الفراسة الفطرية = التردد",
    quality: "ثابت",
    half: "أيجابي",
    chines: "النمر",
    luck: " 11, 29, 38, 47, 56",
    face: "الجوزاء، الميزان أو الدلو",
  },
  {
    tower: "الحوت",
    planet: "المشتري (جوبيتر) ",
    item: "مائي",
    stone: "الزبرجد الأزرق، حجر القمر",
    features: "الإخلاص – الحساسية = الكآبة والروحانية",
    quality: "متغير",
    half: "سلبي",
    chines: "الأرنب",
    luck: " 12, 21, 39, 48, 57",
    face: "السرطان، العقرب أو الحوت",
  },
];

if (document.getElementById("knowTower")) {
  function templateResult(info) {
    if (info.name) {
      document.getElementById("showResult").innerHTML = `
    <div class="result-template mx-auto pt-3" style="max-width:600px; border-top:1px solid #ccc">
      <div class="result-head align-items-center justify-content-around d-flex mb-3">
        <div class="text-center">
          <span class="d-block">اسمك</span>
          <h3 class="bg-primary px-2 rounded-sm mt-1 text-white">${info.name}</h3>
        </div>
        <div class="text-center">
          <span class="d-block">اسم الام</span>
          <h3 class="bg-primary px-2 rounded-sm mt-1 text-white">${info.mother}</h3>
        </div>
      </div>
      <div class="result-body">
        <ul class="list-group">
          <li class="list-group-item list-group-item-secondary">النتيجة</li>
          <li class="list-group-item align-items-center d-flex">
            <span> حساب الجمل</span>
            <span class="badge badge-dark badge-pill ">${info.num}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>الباقي من القسمة</span>
            <span class="badge badge-dark badge-pill ">${info.mod}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>برجك</span>
            <span class="badge badge-dark badge-pill ">${info.tower}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>الكوكب</span>
            <span class="badge badge-dark badge-pill ">${info.planet}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>العنصر</span>
            <span class="badge badge-dark badge-pill ">${info.item}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>الحجر الكريم</span>
            <span class="badge badge-dark badge-pill ">${info.stone}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>الصفات والخصائص الفلكية</span>
            <span class="badge badge-dark badge-pill ">${info.features}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>الجودة</span>
            <span class="badge badge-dark badge-pill ">${info.quality}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>القطبية</span>
            <span class="badge badge-dark badge-pill ">${info.half}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>يقابله في الأبراج الصينية</span>
            <span class="badge badge-dark badge-pill ">${info.chines}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>أرقام الحظ</span>
            <span class="badge badge-dark badge-pill ">${info.luck}</span>
          </li>
          <li class="list-group-item align-items-center d-flex ">
            <span>مولود هذا البرج أكثر توافقا مع</span>
            <span class="badge badge-dark badge-pill ">${info.face}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>`;
    }
  }

  function calculate() {
    let _name = document.getElementById("inputName").value;
    let _mother = document.getElementById("inputMother").value;
    let towerInformation = {};
    if (_name && _mother) {
      let name = _name + " " + _mother;
      let arr1 = [
        "ا",
        "ب",
        "ت",
        "ث",
        "ج",
        "ح",
        "خ",
        "د",
        "ر",
        "ز",
        "ذ",
        "س",
        "ش",
        "ص",
        "ض",
        "ط",
        "ظ",
        "ع",
        "غ",
        "ف",
        "ق",
        "ك",
        "ل",
        "م",
        "ن",
        "ه",
        "و",
        "ي",
        "ة",
        "ى",
        "ء",
        "أ",
        "آ",
      ];
      let arr2 = [
        1,
        2,
        400,
        500,
        3,
        8,
        600,
        4,
        200,
        7,
        700,
        60,
        300,
        90,
        800,
        9,
        900,
        70,
        1000,
        80,
        100,
        20,
        30,
        40,
        50,
        5,
        6,
        10,
        400,
        1,
        1,
        1,
        1,
      ];
      let str = name;
      let msg = "";
      let num1 = 0;
      let mod1 = 0;
      let flag = 0;
      let n = str.length;
      let str1 = "";

      for (let i = 0; i < n; i++) {
        msg = str.charAt(i);
        for (let x = 0; x < 33; x++) {
          if (msg == arr1[x]) num1 = num1 + arr2[x];
        }
      }
      towerInformation.name = str.split(" ")[0];
      towerInformation.mother = str.split(" ")[1];
      towerInformation.num = num1;
      towerInformation.mod = num1 % 12;
      mad1 = num1 % 12;
      templateResult(
        Object.assign({}, towerInformation, towers[towerInformation.mod])
      );
    }
  }

  // window.addEventListener('DOMContentLoaded', () => {
  document.getElementById("reset").addEventListener("click", () => {
    window.location.reload();
  })
}

if (document.getElementById("compare")) {
  document.querySelectorAll(".__left .col-4").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".__left .col-4")
        .forEach((subItem) => (subItem.classList = "col-4"));
      item.classList.add("active");
    });
  });
  document.querySelectorAll(".__right .col-4").forEach((item) => {
    item.addEventListener("click", () => {
      document
        .querySelectorAll(".__right .col-4")
        .forEach((subItem) => (subItem.classList = "col-4"));
      item.classList.add("active");
    });
  });

  Object.keys(resultCompare).length;
  //
  function displayTower(info) {
    return `
        <ul class="list-group">
          <li class="list-group-item list-group-item-secondary">${info.tower}</li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>الكوكب</span>
            <span class="ml-auto">${info.planet}</span>
          </li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>العنصر</span>
            <span class="ml-auto">${info.item}</span>
          </li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>الحجر الكريم</span>
            <span class="ml-auto">${info.stone}</span>
          </li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>الصفات والخصائص الفلكية</span>
            <span class="ml-auto">${info.features}</span>
          </li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>الجودة</span>
            <span class="ml-auto">${info.quality}</span>
          </li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>القطبية</span>
            <span class="ml-auto">${info.half}</span>
          </li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>يقابله في الأبراج الصينية</span>
            <span class="ml-auto">${info.chines}</span>
          </li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>أرقام الحظ</span>
            <span class="ml-auto">${info.luck}</span>
          </li>
          <li class="list-group-item align-items-center justify-content-between d-flex ">
            <span>مولود هذا البرج أكثر توافقا مع</span>
            <span class="ml-auto">${info.face}</span>
          </li>
        </ul>`;
  }
  function openModalResult() {
    let checkRight = document.querySelectorAll(".__right .active");
    let checkLeft = document.querySelectorAll(".__left .active");
    if (checkLeft.length && checkRight.length) {
      document.querySelector(".msg-empty").style.display = "none";
      document.querySelector(".modal").classList.add("show");
      let __left = document.querySelectorAll(".__left .active")[0].dataset
        .towerid;
      let __right = document.querySelectorAll(".__right .active")[0].dataset
        .towerid;
      let _left = document.querySelectorAll(".__left .active")[0].dataset.tower;
      let _right = document.querySelectorAll(".__right .active")[0].dataset
        .tower;
      document.querySelector(".tower-right").innerHTML = displayTower(
        towers[__right]
      );
      document.querySelector(".tower-left").innerHTML = displayTower(
        towers[__left]
      );
      document.querySelector(".modal .result").innerHTML =
        resultCompare[checkVal(_left, _right)];
      document.querySelector(".result.bg-success").style.display = "block";
    } else {
      document.querySelector(".result.bg-success").style.display = "none";
      document.querySelector(".msg-empty").style.display = "block";
    }
  }
  document
    .getElementById("openModal")
    .addEventListener("click", () => openModalResult());

  function checkVal(__left, __right) {
    if (__left == __right) {
      return 1;
    }

    if (
      (__left == "الحوت" && __right == "الدلو") ||
      (__left == "الدلو" && __right == "الحوت") ||
      (__left == "الجدي" && __right == "الدلو") ||
      (__left == "الدلو" && __right == "الجدي") ||
      (__left == "الجدي" && __right == "القوس") ||
      (__left == "القوس" && __right == "الجدي") ||
      (__left == "العقرب" && __right == "القوس") ||
      (__left == "القوس" && __right == "العقرب") ||
      (__left == "العقرب" && __right == "الميزان") ||
      (__left == "الميزان" && __right == "العقرب") ||
      (__left == "العذراء" && __right == "الميزان") ||
      (__left == "الميزان" && __right == "العذراء") ||
      (__left == "العذراء" && __right == "الاسد") ||
      (__left == "الاسد" && __right == "العذراء") ||
      (__left == "السرطان" && __right == "الاسد") ||
      (__left == "الاسد" && __right == "السرطان") ||
      (__left == "السرطان" && __right == "الجوزاء") ||
      (__left == "الجوزاء" && __right == "السرطان") ||
      (__left == "الثور" && __right == "الجوزاء") ||
      (__left == "الجوزاء" && __right == "الثور") ||
      (__left == "الثور" && __right == "الحمل") ||
      (__left == "الحمل" && __right == "الثور") ||
      (__left == "الحوت" && __right == "الحمل") ||
      (__left == "الحمل" && __right == "الحوت")
    ) {
      return 2;
    }
    if (
      (__left == "الجدي" && __right == "الحوت") ||
      (__left == "الحوت" && __right == "الجدي") ||
      (__left == "الدلو" && __right == "القوس") ||
      (__left == "القوس" && __right == "الدلو") ||
      (__left == "العقرب" && __right == "الجدي") ||
      (__left == "الجدي" && __right == "العقرب") ||
      (__left == "القوس" && __right == "الميزان") ||
      (__left == "الميزان" && __right == "القوس") ||
      (__left == "العذراء" && __right == "العقرب") ||
      (__left == "العقرب" && __right == "العذراء") ||
      (__left == "الميزان" && __right == "الاسد") ||
      (__left == "الاسد" && __right == "الميزان") ||
      (__left == "السرطان" && __right == "العذراء") ||
      (__left == "العذراء" && __right == "السرطان") ||
      (__left == "الاسد" && __right == "الجوزاء") ||
      (__left == "الجوزاء" && __right == "الاسد") ||
      (__left == "الثور" && __right == "الحوت") ||
      (__left == "الحوت" && __right == "الثور") ||
      (__left == "الثور" && __right == "السرطان") ||
      (__left == "السرطان" && __right == "الثور") ||
      (__left == "الدلو" && __right == "الحمل") ||
      (__left == "الحمل" && __right == "الدلو") ||
      (__left == "الجوزاء" && __right == "الحمل") ||
      (__left == "الحمل" && __right == "الجوزاء")
    ) {
      return 3;
    }
    if (
      (__left == "الحوت" && __right == "القوس") ||
      (__left == "القوس" && __right == "الحوت") ||
      (__left == "العقرب" && __right == "الدلو") ||
      (__left == "الدلو" && __right == "العقرب") ||
      (__left == "الجدي" && __right == "الميزان") ||
      (__left == "الميزان" && __right == "الجدي") ||
      (__left == "العذراء" && __right == "القوس") ||
      (__left == "القوس" && __right == "العذراء") ||
      (__left == "العقرب" && __right == "الاسد") ||
      (__left == "الاسد" && __right == "العقرب") ||
      (__left == "السرطان" && __right == "الميزان") ||
      (__left == "الميزان" && __right == "السرطان") ||
      (__left == "الحوت" && __right == "الجوزاء") ||
      (__left == "الجوزاء" && __right == "الحوت") ||
      (__left == "العذراء" && __right == "الجوزاء") ||
      (__left == "الجوزاء" && __right == "العذراء") ||
      (__left == "الثور" && __right == "الدلو") ||
      (__left == "الدلو" && __right == "الثور") ||
      (__left == "الثور" && __right == "الاسد") ||
      (__left == "الاسد" && __right == "الثور") ||
      (__left == "الجدي" && __right == "الحمل") ||
      (__left == "الحمل" && __right == "الجدي") ||
      (__left == "السرطان" && __right == "الحمل") ||
      (__left == "الحمل" && __right == "السرطان")
    ) {
      return 4;
    }
    if (
      (__left == "الحوت" && __right == "الميزان") ||
      (__left == "الميزان" && __right == "الحوت") ||
      (__left == "العذراء" && __right == "الدلو") ||
      (__left == "الدلو" && __right == "العذراء") ||
      (__left == "الحوت" && __right == "الاسد") ||
      (__left == "الاسد" && __right == "الحوت") ||
      (__left == "الجدي" && __right == "الاسد") ||
      (__left == "الاسد" && __right == "الجدي") ||
      (__left == "السرطان" && __right == "الدلو") ||
      (__left == "الدلو" && __right == "السرطان") ||
      (__left == "السرطان" && __right == "القوس") ||
      (__left == "القوس" && __right == "السرطان") ||
      (__left == "الجدي" && __right == "الجوزاء") ||
      (__left == "الجوزاء" && __right == "الجدي") ||
      (__left == "العقرب" && __right == "الجوزاء") ||
      (__left == "الجوزاء" && __right == "العقرب") ||
      (__left == "الثور" && __right == "القوس") ||
      (__left == "القوس" && __right == "الثور") ||
      (__left == "الثور" && __right == "الميزان") ||
      (__left == "الميزان" && __right == "الثور") ||
      (__left == "العقرب" && __right == "الحمل") ||
      (__left == "الحمل" && __right == "العقرب") ||
      (__left == "العذراء" && __right == "الحمل") ||
      (__left == "الحمل" && __right == "العذراء")
    ) {
      return 6;
    }

    if (
      (__left == "الحمل" && __right == "الميزان") ||
      (__left == "الميزان" && __right == "الحمل") ||
      (__left == "الجوزاء" && __right == "القوس") ||
      (__left == "القوس" && __right == "الجوزاء") ||
      (__left == "السرطان" && __right == "الجدي") ||
      (__left == "الجدي" && __right == "السرطان") ||
      (__left == "الاسد" && __right == "الدلو") ||
      (__left == "الدلو" && __right == "الاسد") ||
      (__left == "العقرب" && __right == "الثور") ||
      (__left == "الثور" && __right == "العقرب") ||
      (__left == "العذراء" && __right == "الحوت") ||
      (__left == "الحوت" && __right == "العذراء")
    ) {
      return 7;
    }

    if (
      __water.includes(__left) &&
      __water.includes(__right) &&
      __right != __left
    ) {
      return 5;
    }
    if (
      __water.includes(__right) &&
      __water.includes(__left) &&
      __right != __left
    ) {
      return 5;
    }
    if (
      __stone.includes(__left) &&
      __stone.includes(__right) &&
      __right != __left
    ) {
      return 5;
    }
    if (
      __stone.includes(__right) &&
      __stone.includes(__left) &&
      __right != __left
    ) {
      return 5;
    }
    if (
      __fire.includes(__left) &&
      __fire.includes(__right) &&
      __right != __left
    ) {
      return 5;
    }
    if (
      __fire.includes(__right) &&
      __fire.includes(__left) &&
      __right != __left
    ) {
      return 5;
    }

    if (
      __wind.includes(__left) &&
      __wind.includes(__right) &&
      __right != __left
    ) {
      return 5;
    }
    if (
      __wind.includes(__right) &&
      __wind.includes(__left) &&
      __right != __left
    ) {
      return 5;
    }
  }
}
