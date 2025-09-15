
export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: "يرجى ملء جميع الحقول المطلوبة",
  INVALID_EMAIL: "يرجى إدخال بريد إلكتروني صالح",
  GAME_CREATION_ERROR: "حدث خطأ في إنشاء المسابقة. يرجى المحاولة مرة أخرى.",
  GAME_JOIN_ERROR: "حدث خطأ في الانضمام إلى اللعبة. يرجى التحقق من الرمز والمحاولة مرة أخرى.",
  GAME_DATA_ERROR: "حدث خطأ في تحميل بيانات اللعبة",
  GAME_ID_NOT_FOUND: "Game ID not found",
  NO_CATEGORIES: "لا توجد فئات متاحة",
  LOADING_CATEGORIES: "جاري تحميل الفئات...",
  LOADING_GAME_DATA: "جاري تحميل بيانات اللعبة...",
  WAITING_FOR_PLAYERS: "في انتظار المزيد من المشاركين...",
  WAITING_FOR_JOIN: "في انتظار انضمام المشاركين...",
  ANSWER_SUBMIT_ERROR: "حدث خطأ في إرسال الإجابة. يرجى المحاولة مرة أخرى.",
  NEXT_QUESTION_ERROR: "حدث خطأ في تحميل السؤال التالي. يرجى المحاولة مرة أخرى.",
};

export const UI_TEXT = {
  APP_NAME: "بهجة",
  GAME_TITLE: "مسابقة اليوم الوطني",
  BACK_BUTTON: "خلف",
  START_BUTTON: "يبدأ",
  JOIN_BUTTON: "انضم إلى اللعبة",
  JOINING: "جاري الانضمام...",
  CREATING: "جاري الإنشاء...",
  GAME_FINISHED: "اللعبة منتهية",
  COPY: "نسخ",
  HOST: "المضيف",
  PARTICIPANT: "مشارك",
  COPYRIGHT: "جميع الحقوق محفوظة © 2024",
  START_GAME: "ابدأ لعبة جديدة",
};

export const API_ENDPOINTS = {
  CATEGORIES: "/api/v1/categories",
  GAMES: "/api/v1/games",
  GAME_JOIN: "/api/v1/games/join",
  GAME_LEADERBOARD: (gameId) => `/api/v1/games/${gameId}/leaderboard`,
  GAME_START: (gameId) => `/api/v1/games/${gameId}/start`,
  GAME_QUESTIONS: (gameId) => `/api/v1/games/${gameId}/questions`,
  GAME_ANSWERS: (gameId) => `/api/v1/games/${gameId}/answers`,
  GAME_RESULTS: (gameId) => `/api/v1/games/${gameId}/results`,
};

export const POLLING_INTERVALS = {
  NORMAL: 10000, // 10 seconds
  BACKOFF: 15000, // 15 seconds
};
