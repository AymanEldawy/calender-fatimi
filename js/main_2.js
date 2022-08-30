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
    console.log(info);
    if (info.name) {
      document.getElementById(
        "showResult"
      ).innerHTML = `<div class="result-template mx-auto pt-3"style="max-width:600px; border-top:1px solid #ccc"><div class="result-body"><ul class="list-group"><li class="list-group-item list-group-item-secondary">النتيجة</li><li class="list-group-item align-items-center d-flex"><span>حساب الجمل</span><span class="badge badge-dark badge-pill ">${info.num}</span></li></ul></div></div>`;
    }
  }
  function calculate() {
    let _name = document.getElementById("inputName").value;
    let towerInformation = {};
    if (_name) {
      let name = _name;
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
        1, 2, 400, 500, 3, 8, 600, 4, 200, 7, 700, 60, 300, 90, 800, 9, 900, 70,
        1000, 80, 100, 20, 30, 40, 50, 5, 6, 10, 400, 1, 1, 1, 1,
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
  document.getElementById("reset").addEventListener("click", () => {
    window.location.reload();
  });
}
