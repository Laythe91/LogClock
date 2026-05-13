import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocaleConfig } from "react-native-calendars";
import * as Localization from "expo-localization";

// --- Définition des clés de langues ---
// --- Définition des types ---
export type LocaleKey = "fr" | "en" | "ja" | "ar" | "zh" | "ko" | "ru" | "hi";
// --- 1. Traductions de l'interface (UI) ---
const translations: Record<LocaleKey, any> = {
  fr: {
    common: {
      langSelect: "Choisir la langue",

      timezoneInfo: "Fuseau horaire détecté",
      timezoneError: "Fuseau horaire non détecté",
      timezoneDetail: "(Utilisé pour calibrer vos rendez-vous au format GMT)",

      selected: "Sélectionné",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",

      connect: "Se connecter",
      createAccount: "Créer un compte",

      cancel: "Annuler",
      confirm: "Confirmer",
      validate: "Valider",

      date: "Date",
      time: "Heure",

      accepted: "Accepté",
      declined: "Refusé",

      event: "Événement",
      events: "Événements",
    },
    auth: {
      login: {
        welcome: "Bienvenue",
        title: "Connectez-vous",
        forgotPassword: "Mot de passe oublié ?",
      },

      register: {
        title: "Créer un compte",
        userName: "Nom d'utilisateur",
        finishCreateAccount: "Créer le compte",
      },
    },

    events: {
      calendar: {
        eventListHeader: "Liste des événements",
        noEvent: "Aucun événement ce jour",
      },

      list: {
        title: "Événements",
      },

      details: {
        createdBy: "Créé par",
        participants: "Participants",

        ownerTitle: "Gestion de l’événement",

        edit: "Modifier",
        cancelEvent: "Annuler",

        myParticipation: "Ma participation",

        waitingResponse: "En attente de réponse",

        tabs: {
          all: "Tous",
          going: "Présents",
          maybe: "En attente",
          declined: "Refusés",
        },
      },

      form: {
        createTitle: "Créer un événement",
        editTitle: "Modifier un événement",

        titlePlaceholder: "Titre",
        descriptionPlaceholder: "Description",

        allDay: "Toute la journée",

        start: "Début",
        end: "Fin",

        chooseParticipants: "Choisir participants",

        participantsTitle: "Participants",

        createButton: "Créer événement",
        editButton: "Modifier événement",
      },

      modal: {
        confirmation: "Confirmation",

        confirmDeleteEvent: "Voulez-vous vraiment annuler cet événement ?",

        confirmAccept: "Confirmer votre participation ?",

        confirmDecline: "Confirmer le refus de participation ?",
      },
    },

    validation: {
      emailInvalid: "Email invalide",
      emailRequired: "L'email est obligatoire",

      userNameRequired: "Le nom d'utilisateur est obligatoire",
      userNameTooShort: "3 caractères minimum",

      noSpaces: "Les espaces ne sont pas autorisés",

      passRequired: "Le mot de passe est obligatoire",
      passTooShort: "6 caractères minimum",

      passMustMatch: "Les mots de passe ne correspondent pas",
    },
  },
  en: {
    common: {
      langSelect: "Choose language",

      timezoneInfo: "Detected timezone",
      timezoneError: "Timezone not detected",
      timezoneDetail: "(Used to adjust your appointments to GMT format)",

      selected: "Selected",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",

      connect: "Login",
      createAccount: "Create account",

      cancel: "Cancel",
      confirm: "Confirm",
      validate: "Validate",

      date: "Date",
      time: "Time",

      accepted: "Accepted",
      declined: "Declined",

      event: "Event",
      events: "Events",
    },

    auth: {
      login: {
        welcome: "Welcome",
        title: "Login",
        forgotPassword: "Forgot password?",
      },

      register: {
        title: "Create account",
        userName: "Username",
        finishCreateAccount: "Create account",
      },
    },

    events: {
      calendar: {
        eventListHeader: "Events list",
        noEvent: "No event this day",
      },

      list: {
        title: "Events",
      },

      details: {
        createdBy: "Created by",
        participants: "Participants",

        ownerTitle: "Event management",

        edit: "Edit",
        cancelEvent: "Cancel",

        myParticipation: "My participation",

        waitingResponse: "Waiting for response",

        tabs: {
          all: "All",
          going: "Going",
          maybe: "Pending",
          declined: "Declined",
        },
      },

      form: {
        createTitle: "Create event",
        editTitle: "Edit event",

        titlePlaceholder: "Title",
        descriptionPlaceholder: "Description",

        allDay: "All day",

        start: "Start",
        end: "End",

        chooseParticipants: "Choose participants",

        participantsTitle: "Participants",

        createButton: "Create event",
        editButton: "Edit event",
      },

      modal: {
        confirmation: "Confirmation",

        confirmDeleteEvent: "Do you really want to cancel this event?",

        confirmAccept: "Confirm your participation?",

        confirmDecline: "Confirm participation refusal?",
      },
    },

    validation: {
      emailInvalid: "Invalid email",
      emailRequired: "Email is required",

      userNameRequired: "Username is required",

      userNameTooShort: "Minimum 3 characters",

      noSpaces: "Spaces are not allowed",

      passRequired: "Password is required",

      passTooShort: "Minimum 6 characters",

      passMustMatch: "Passwords do not match",
    },
  },
  ar: {
    common: {
      langSelect: "اختيار اللغة",

      timezoneInfo: "تم اكتشاف المنطقة الزمنية",
      timezoneError: "لم يتم اكتشاف المنطقة الزمنية",
      timezoneDetail: "(يُستخدم لضبط مواعيدك بتوقيت GMT)",

      selected: "محدد",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",

      connect: "تسجيل الدخول",
      createAccount: "إنشاء حساب",

      cancel: "إلغاء",
      confirm: "تأكيد",
      validate: "تحقق",

      date: "التاريخ",
      time: "الوقت",

      accepted: "مقبول",
      declined: "مرفوض",

      event: "حدث",
      events: "الأحداث",
    },

    auth: {
      login: {
        welcome: "مرحباً",
        title: "تسجيل الدخول",
        forgotPassword: "هل نسيت كلمة المرور؟",
      },

      register: {
        title: "إنشاء حساب",
        userName: "اسم المستخدم",
        finishCreateAccount: "إنشاء الحساب",
      },
    },

    events: {
      calendar: {
        eventListHeader: "قائمة الأحداث",
        noEvent: "لا يوجد حدث هذا اليوم",
      },

      list: {
        title: "الأحداث",
      },

      details: {
        createdBy: "تم الإنشاء بواسطة",
        participants: "المشاركون",

        ownerTitle: "إدارة الحدث",

        edit: "تعديل",
        cancelEvent: "إلغاء",

        myParticipation: "مشاركتي",

        waitingResponse: "في انتظار الرد",

        tabs: {
          all: "الكل",
          going: "حاضر",
          maybe: "قيد الانتظار",
          declined: "مرفوض",
        },
      },

      form: {
        createTitle: "إنشاء حدث",
        editTitle: "تعديل الحدث",

        titlePlaceholder: "العنوان",
        descriptionPlaceholder: "الوصف",

        allDay: "طوال اليوم",

        start: "البداية",
        end: "النهاية",

        chooseParticipants: "اختيار المشاركين",

        participantsTitle: "المشاركون",

        createButton: "إنشاء الحدث",
        editButton: "تعديل الحدث",
      },

      modal: {
        confirmation: "تأكيد",

        confirmDeleteEvent: "هل تريد حقاً إلغاء هذا الحدث؟",

        confirmAccept: "تأكيد مشاركتك؟",

        confirmDecline: "تأكيد رفض المشاركة؟",
      },
    },

    validation: {
      emailInvalid: "البريد الإلكتروني غير صالح",

      emailRequired: "البريد الإلكتروني مطلوب",

      userNameRequired: "اسم المستخدم مطلوب",

      userNameTooShort: "3 أحرف على الأقل",

      noSpaces: "المسافات غير مسموحة",

      passRequired: "كلمة المرور مطلوبة",

      passTooShort: "6 أحرف على الأقل",

      passMustMatch: "كلمتا المرور غير متطابقتين",
    },
  },
  ja: {
    common: {
      langSelect: "言語を選択",

      timezoneInfo: "タイムゾーンが検出されました",
      timezoneError: "タイムゾーンが検出されませんでした",
      timezoneDetail: "(GMT形式で予定を調整するために使用されます)",

      selected: "選択済み",
      email: "メールアドレス",
      password: "パスワード",
      confirmPassword: "パスワードを確認",

      connect: "ログイン",
      createAccount: "アカウント作成",

      cancel: "キャンセル",
      confirm: "確認",
      validate: "送信",

      date: "日付",
      time: "時間",

      accepted: "参加",
      declined: "辞退",

      event: "イベント",
      events: "イベント一覧",
    },

    auth: {
      login: {
        welcome: "ようこそ",
        title: "ログイン",
        forgotPassword: "パスワードを忘れましたか？",
      },

      register: {
        title: "アカウント作成",
        userName: "ユーザー名",
        finishCreateAccount: "アカウント作成",
      },
    },

    events: {
      calendar: {
        eventListHeader: "イベント一覧",
        noEvent: "本日のイベントはありません",
      },

      list: {
        title: "イベント",
      },

      details: {
        createdBy: "作成者",
        participants: "参加者",

        ownerTitle: "イベント管理",

        edit: "編集",
        cancelEvent: "イベントをキャンセル",

        myParticipation: "自分の参加状況",

        waitingResponse: "返答待ち",

        tabs: {
          all: "すべて",
          going: "参加",
          maybe: "未定",
          declined: "不参加",
        },
      },

      form: {
        createTitle: "イベント作成",
        editTitle: "イベント編集",

        titlePlaceholder: "タイトル",
        descriptionPlaceholder: "説明",

        allDay: "終日",

        start: "開始",
        end: "終了",

        chooseParticipants: "参加者を選択",

        participantsTitle: "参加者",

        createButton: "イベント作成",
        editButton: "イベント編集",
      },

      modal: {
        confirmation: "確認",

        confirmDeleteEvent: "本当にこのイベントをキャンセルしますか？",

        confirmAccept: "参加を確定しますか？",

        confirmDecline: "不参加を確定しますか？",
      },
    },

    validation: {
      emailInvalid: "メールアドレスが無効です",
      emailRequired: "メールアドレスは必須です",

      userNameRequired: "ユーザー名は必須です",
      userNameTooShort: "3文字以上で入力してください",

      noSpaces: "スペースは使用できません",

      passRequired: "パスワードは必須です",
      passTooShort: "6文字以上で入力してください",

      passMustMatch: "パスワードが一致しません",
    },
  },
  zh: {
    common: {
      langSelect: "选择语言",

      timezoneInfo: "已检测到时区",
      timezoneError: "未检测到时区",
      timezoneDetail: "(用于将您的日程调整为 GMT 格式)",

      selected: "已选择",
      email: "电子邮件",
      password: "密码",
      confirmPassword: "确认密码",

      connect: "登录",
      createAccount: "创建账号",

      cancel: "取消",
      confirm: "确认",
      validate: "提交",

      date: "日期",
      time: "时间",

      accepted: "已参加",
      declined: "已拒绝",

      event: "事件",
      events: "事件列表",
    },

    auth: {
      login: {
        welcome: "欢迎",
        title: "登录",
        forgotPassword: "忘记密码？",
      },

      register: {
        title: "创建账号",
        userName: "用户名",
        finishCreateAccount: "创建账号",
      },
    },

    events: {
      calendar: {
        eventListHeader: "事件列表",
        noEvent: "今天没有事件",
      },

      list: {
        title: "事件",
      },

      details: {
        createdBy: "创建者",
        participants: "参与者",

        ownerTitle: "事件管理",

        edit: "编辑",
        cancelEvent: "取消事件",

        myParticipation: "我的参与",

        waitingResponse: "等待回复",

        tabs: {
          all: "全部",
          going: "已参加",
          maybe: "待定",
          declined: "已拒绝",
        },
      },

      form: {
        createTitle: "创建事件",
        editTitle: "编辑事件",

        titlePlaceholder: "标题",
        descriptionPlaceholder: "描述",

        allDay: "全天",

        start: "开始",
        end: "结束",

        chooseParticipants: "选择参与者",

        participantsTitle: "参与者",

        createButton: "创建事件",
        editButton: "编辑事件",
      },

      modal: {
        confirmation: "确认",

        confirmDeleteEvent: "你确定要取消这个事件吗？",
        confirmAccept: "确认参加吗？",
        confirmDecline: "确认拒绝参加吗？",
      },
    },

    validation: {
      emailInvalid: "邮箱无效",
      emailRequired: "邮箱是必填项",

      userNameRequired: "用户名是必填项",
      userNameTooShort: "至少3个字符",

      noSpaces: "不能包含空格",

      passRequired: "密码是必填项",
      passTooShort: "至少6个字符",

      passMustMatch: "两次密码不一致",
    },
  },
  ko: {
    common: {
      langSelect: "언어 선택",

      timezoneInfo: "시간대가 감지되었습니다",
      timezoneError: "시간대를 감지할 수 없습니다",
      timezoneDetail: "(GMT 형식으로 일정 조정에 사용됩니다)",

      selected: "선택됨",
      email: "이메일",
      password: "비밀번호",
      confirmPassword: "비밀번호 확인",

      connect: "로그인",
      createAccount: "회원가입",

      cancel: "취소",
      confirm: "확인",
      validate: "제출",

      date: "날짜",
      time: "시간",

      accepted: "참석",
      declined: "거절",

      event: "이벤트",
      events: "이벤트 목록",
    },

    auth: {
      login: {
        welcome: "환영합니다",
        title: "로그인",
        forgotPassword: "비밀번호를 잊으셨나요?",
      },

      register: {
        title: "회원가입",
        userName: "사용자 이름",
        finishCreateAccount: "계정 만들기",
      },
    },

    events: {
      calendar: {
        eventListHeader: "이벤트 목록",
        noEvent: "오늘 이벤트가 없습니다",
      },

      list: {
        title: "이벤트",
      },

      details: {
        createdBy: "생성자",
        participants: "참가자",

        ownerTitle: "이벤트 관리",

        edit: "수정",
        cancelEvent: "이벤트 취소",

        myParticipation: "내 참여",

        waitingResponse: "응답 대기 중",

        tabs: {
          all: "전체",
          going: "참석",
          maybe: "보류",
          declined: "거절",
        },
      },

      form: {
        createTitle: "이벤트 생성",
        editTitle: "이벤트 수정",

        titlePlaceholder: "제목",
        descriptionPlaceholder: "설명",

        allDay: "종일",

        start: "시작",
        end: "종료",

        chooseParticipants: "참가자 선택",

        participantsTitle: "참가자",

        createButton: "이벤트 생성",
        editButton: "이벤트 수정",
      },

      modal: {
        confirmation: "확인",

        confirmDeleteEvent: "이 이벤트를 정말 취소하시겠습니까?",
        confirmAccept: "참석을 확정하시겠습니까?",
        confirmDecline: "참석 거절을 확정하시겠습니까?",
      },
    },

    validation: {
      emailInvalid: "이메일 형식이 올바르지 않습니다",
      emailRequired: "이메일은 필수입니다",

      userNameRequired: "사용자 이름은 필수입니다",
      userNameTooShort: "최소 3자 이상이어야 합니다",

      noSpaces: "공백은 사용할 수 없습니다",

      passRequired: "비밀번호는 필수입니다",
      passTooShort: "최소 6자 이상이어야 합니다",

      passMustMatch: "비밀번호가 일치하지 않습니다",
    },
  },
  ru: {
    common: {
      langSelect: "Выбор языка",

      timezoneInfo: "Часовой пояс определён",
      timezoneError: "Часовой пояс не определён",
      timezoneDetail: "(Используется для приведения встреч к формату GMT)",

      selected: "Выбрано",
      email: "Электронная почта",
      password: "Пароль",
      confirmPassword: "Подтвердите пароль",

      connect: "Войти",
      createAccount: "Создать аккаунт",

      cancel: "Отмена",
      confirm: "Подтвердить",
      validate: "Отправить",

      date: "Дата",
      time: "Время",

      accepted: "Принято",
      declined: "Отклонено",

      event: "Событие",
      events: "События",
    },

    auth: {
      login: {
        welcome: "Добро пожаловать",
        title: "Вход",
        forgotPassword: "Забыли пароль?",
      },

      register: {
        title: "Создать аккаунт",
        userName: "Имя пользователя",
        finishCreateAccount: "Создать аккаунт",
      },
    },

    events: {
      calendar: {
        eventListHeader: "Список событий",
        noEvent: "На этот день нет событий",
      },

      list: {
        title: "События",
      },

      details: {
        createdBy: "Создал",
        participants: "Участники",

        ownerTitle: "Управление событием",

        edit: "Редактировать",
        cancelEvent: "Отменить событие",

        myParticipation: "Моё участие",

        waitingResponse: "Ожидание ответа",

        tabs: {
          all: "Все",
          going: "Присутствую",
          maybe: "Возможно",
          declined: "Отклонено",
        },
      },

      form: {
        createTitle: "Создать событие",
        editTitle: "Редактировать событие",

        titlePlaceholder: "Заголовок",
        descriptionPlaceholder: "Описание",

        allDay: "Весь день",

        start: "Начало",
        end: "Конец",

        chooseParticipants: "Выбрать участников",

        participantsTitle: "Участники",

        createButton: "Создать событие",
        editButton: "Редактировать событие",
      },

      modal: {
        confirmation: "Подтверждение",

        confirmDeleteEvent: "Вы действительно хотите отменить это событие?",

        confirmAccept: "Подтвердить участие?",

        confirmDecline: "Подтвердить отказ от участия?",
      },
    },

    validation: {
      emailInvalid: "Неверный email",
      emailRequired: "Email обязателен",

      userNameRequired: "Имя пользователя обязательно",
      userNameTooShort: "Минимум 3 символа",

      noSpaces: "Пробелы не разрешены",

      passRequired: "Пароль обязателен",
      passTooShort: "Минимум 6 символов",

      passMustMatch: "Пароли не совпадают",
    },
  },
  hi: {
    common: {
      langSelect: "भाषा चुनें",

      timezoneInfo: "समय क्षेत्र पता चल गया है",
      timezoneError: "समय क्षेत्र नहीं मिला",
      timezoneDetail:
        "(GMT प्रारूप में आपकी अपॉइंटमेंट्स को समायोजित करने के लिए उपयोग किया जाता है)",

      selected: "चयनित",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",

      connect: "लॉगिन करें",
      createAccount: "खाता बनाएं",

      cancel: "रद्द करें",
      confirm: "पुष्टि करें",
      validate: "सबमिट करें",

      date: "तारीख",
      time: "समय",

      accepted: "स्वीकृत",
      declined: "अस्वीकृत",

      event: "ईवेंट",
      events: "ईवेंट्स",
    },

    auth: {
      login: {
        welcome: "स्वागत है",
        title: "लॉगिन करें",
        forgotPassword: "पासवर्ड भूल गए?",
      },

      register: {
        title: "खाता बनाएं",
        userName: "उपयोगकर्ता नाम",
        finishCreateAccount: "खाता बनाएं",
      },
    },

    events: {
      calendar: {
        eventListHeader: "ईवेंट सूची",
        noEvent: "आज कोई ईवेंट नहीं है",
      },

      list: {
        title: "ईवेंट्स",
      },

      details: {
        createdBy: "द्वारा बनाया गया",
        participants: "प्रतिभागी",

        ownerTitle: "ईवेंट प्रबंधन",

        edit: "संपादित करें",
        cancelEvent: "ईवेंट रद्द करें",

        myParticipation: "मेरी भागीदारी",

        waitingResponse: "प्रतिक्रिया की प्रतीक्षा में",

        tabs: {
          all: "सभी",
          going: "शामिल",
          maybe: "संभावित",
          declined: "अस्वीकृत",
        },
      },

      form: {
        createTitle: "ईवेंट बनाएं",
        editTitle: "ईवेंट संपादित करें",

        titlePlaceholder: "शीर्षक",
        descriptionPlaceholder: "विवरण",

        allDay: "पूरा दिन",

        start: "शुरुआत",
        end: "अंत",

        chooseParticipants: "प्रतिभागियों को चुनें",

        participantsTitle: "प्रतिभागी",

        createButton: "ईवेंट बनाएं",
        editButton: "ईवेंट संपादित करें",
      },

      modal: {
        confirmation: "पुष्टि",

        confirmDeleteEvent: "क्या आप वाकई इस ईवेंट को रद्द करना चाहते हैं?",

        confirmAccept: "अपनी भागीदारी की पुष्टि करें?",

        confirmDecline: "भागीदारी अस्वीकार करने की पुष्टि करें?",
      },
    },

    validation: {
      emailInvalid: "अमान्य ईमेल",
      emailRequired: "ईमेल आवश्यक है",

      userNameRequired: "उपयोगकर्ता नाम आवश्यक है",
      userNameTooShort: "कम से कम 3 अक्षर होने चाहिए",

      noSpaces: "स्पेस की अनुमति नहीं है",

      passRequired: "पासवर्ड आवश्यक है",
      passTooShort: "कम से कम 6 अक्षर होने चाहिए",

      passMustMatch: "पासवर्ड मेल नहीं खाते",
    },
  },
};
// --- Contenu de chaque langue ---
const calendarLocales: Record<LocaleKey, any> = {
  fr: {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avr.",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  },
  en: {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  ja: {
    monthNames: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    monthNamesShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    dayNames: [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ],
    dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
  },
  ar: {
    monthNames: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    monthNamesShort: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    dayNames: [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    dayNamesShort: ["أحد", "اثن", "ثلا", "أرب", "خمي", "جمع", "سبت"],
  },
  zh: {
    monthNames: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    monthNamesShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    dayNames: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ],
    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
  },
  ko: {
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  },
  ru: {
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    monthNamesShort: [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
    dayNames: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
    dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  },
  hi: {
    monthNames: [
      "जनवरी",
      "फ़रवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितंबर",
      "अक्टूबर",
      "नवंबर",
      "दिसंबर",
    ],
    monthNamesShort: [
      "जन.",
      "फ़र.",
      "मार्च",
      "अप्रै.",
      "मई",
      "जून",
      "जुल.",
      "अग.",
      "सितं.",
      "अक्टू.",
      "नव.",
      "दिस.",
    ],
    dayNames: [
      "रविवार",
      "सोमवार",
      "मंगलवार",
      "बुधवार",
      "गुरुवार",
      "शुक्रवार",
      "शनिवार",
    ],
    dayNamesShort: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
  },
};

// --- Initialisation de toutes les locales pour react-native-calendars ---
// Initialisation Calendrier
Object.keys(calendarLocales).forEach((key) => {
  LocaleConfig.locales[key] = calendarLocales[key as LocaleKey];
});

// --- 3. Détection Automatique ---
const deviceLanguage = Localization.getLocales()[0].languageCode as LocaleKey;
const deviceTimezone = Localization.getCalendars()[0].timeZone || "UTC";

// --- 4. Slice Redux ---
interface LocalesState {
  current: LocaleKey;
  timezone: string;
  translations: typeof translations;
}

const initialState: LocalesState = {
  current: translations[deviceLanguage] ? deviceLanguage : "en",
  timezone: deviceTimezone,
  translations: translations,
};

const localesSlice = createSlice({
  name: "locales",
  initialState,
  reducers: {
    // Change la langue (UI + Calendrier)
    setLocale: (state, action: PayloadAction<LocaleKey>) => {
      state.current = action.payload;
      LocaleConfig.defaultLocale = action.payload;
    },
    // Change le fuseau horaire manuellement
    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
    // Réinitialise avec les réglages du téléphone
    resetToDeviceSettings: (state) => {
      state.current = translations[deviceLanguage] ? deviceLanguage : "en";
      state.timezone = deviceTimezone;
      LocaleConfig.defaultLocale = state.current;
    },
  },
});

export const { setLocale, setTimezone, resetToDeviceSettings } =
  localesSlice.actions;
export default localesSlice.reducer;
