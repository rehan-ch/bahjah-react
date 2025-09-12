import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import SplashLogo from "../../assests/splashLogo.svg";
import FooterLogo from "../../assests/footerLogo.png";
import { ERROR_MESSAGES, UI_TEXT } from "../../utills/constants";

const HostCreateQuiz = ({ setIsStarted }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Calculate the maximum number of questions allowed based on selected categories
  const maxQuestions = selectedCategory.reduce((total, cat) => {
    const selected = typeof cat === 'string'
      ? categories.find((c) => c.name === cat)
      : cat;
    return total + (selected?.question_count || 0);
  }, 0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categories = await apiService.getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (maxQuestions > 0 && Number(questionCount) > maxQuestions) {
      setQuestionCount(maxQuestions);
    }
  }, [maxQuestions]);


  const handleCategorySelect = (category) => {
    setSelectedCategory(prev => {
      const isSelected = prev.some(cat =>
        (typeof cat === 'string' ? cat : cat.name) === category.name
      );

      if (isSelected) {
        return prev.filter(cat =>
          (typeof cat === 'string' ? cat : cat.name) !== category.name
        );
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedCategory.length === 0 || !name || !email) {
      setError(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    if (maxQuestions > 0 && Number(questionCount) > maxQuestions) {
      setError(`لا يمكنك اختيار عدد أسئلة أكثر من الحد المسموح (${maxQuestions}).`);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const categoryNames = selectedCategory.map(cat => {
        return typeof cat === 'string' ? cat : cat.name;
      });

      const gameData = {
        category: categoryNames,
        questionCount: questionCount,
        name: name,
        email: email
      };

      const result = await apiService.createGame(gameData);

      if (result?.id) {
        localStorage.setItem("host_id", result?.host?.id);
        localStorage.setItem("user_id", result?.host?.id);
        localStorage.setItem("game_id", result.id);
        localStorage.setItem("access_code", result?.access_code);
        setIsStarted(true);
        navigate(`/host-waiting/${result.id}`);
      } else {
        throw new Error('Game ID not found in API response');
      }

    } catch (error) {
      setError(ERROR_MESSAGES.GAME_CREATION_ERROR);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOnChange = (e) => {
  const rawValue = e.target.value;

  // Allow empty input so backspace works
  if (rawValue === "") {
    setQuestionCount("");
    return;
  }

  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    setQuestionCount(1);
    return;
  }

  if (maxQuestions > 0) {
    const clamped = Math.max(1, Math.min(value, maxQuestions));
    setQuestionCount(clamped);
  } else {
    setQuestionCount(Math.max(1, value));
  }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom">
      <div className="w-[420px]">

        <div className="min-h-full bg-custom text-white flex flex-col">

          <div className="flex justify-between items-center px-4 py-3 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="text-green-400 font-medium"
              dir="rtl"
            >
              {UI_TEXT.BACK_BUTTON}
            </button>
            <span className="font-bold">{UI_TEXT.APP_NAME}</span>
          </div>

          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">

            <div className="text-center space-y-2" dir="rtl">
              <h2 className="text-lg font-bold">اسم اللعبة</h2>
              <p className="text-xl font-bold">{UI_TEXT.GAME_TITLE}</p>
            </div>

            <div dir="rtl">
              <h3 className="mb-3 text-sm font-medium">حدد الفئات</h3>

              {categoriesLoading && (
                <div className="text-center py-4">
                  <div className="text-green-400 text-sm mb-2">{ERROR_MESSAGES.LOADING_CATEGORIES}</div>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}

              {!categoriesLoading && (
                <div className="space-y-3">
                  {categories.length > 0 ? (
                    categories?.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-lg border-2 transition-colors ${selectedCategory.some(cat =>
                          (typeof cat === 'string' ? cat : cat.name) === category.name
                        )
                          ? "bg-green-600 border-green-700"
                          : "bg-teal-700 border-teal-500"
                          }`}
                      >
                        <span>{category.name_ar}</span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCategory.some(cat =>
                            (typeof cat === 'string' ? cat : cat.name) === category.name
                          )
                            ? "bg-green-500 border-green-600"
                            : "border-gray-400"
                            }`}
                        >
                          {selectedCategory.some(cat =>
                            (typeof cat === 'string' ? cat : cat.name) === category.name
                          ) && (
                              <span className="w-2 h-2 bg-white rounded-full"></span>
                            )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-4 text-red-400 text-sm">
                      {ERROR_MESSAGES.NO_CATEGORIES}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div dir="rtl">
              <label className="block mb-2 text-sm">عدد الأسئلة</label>
              <input
                type="number"
                value={questionCount}
                min={1}
                max={maxQuestions || undefined}
                onChange={(e)=>handleOnChange(e)}
                className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-full text-right focus:outline-none focus:border-green-400"
              />
              {selectedCategory.length > 0 && (
                <p className="text-xs text-teal-300 mt-2">
                  الحد الأقصى المسموح بناءً على الفئات المختارة: {maxQuestions}
                </p>
              )}
            </div>

            <div dir="rtl">
              <label className="block mb-2 text-sm">اسمك</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك"
                className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-full text-right focus:outline-none focus:border-green-400"
              />
            </div>

            <div dir="rtl">
              <label className="block mb-2 text-sm">البريد الإلكتروني الخاص بك</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني الخاص بك"
                className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-full text-right focus:outline-none focus:border-green-400"
              />
            </div>

            {error && (
              <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-3 rounded-full text-center z-50 max-w-sm mx-4" dir="rtl">
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full font-bold py-4 px-6 rounded-full text-lg transition-colors ${isLoading
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                dir="rtl"
              >
                {isLoading ? UI_TEXT.CREATING :" يخلق"}
              </button>
            </div>
          </div>
          
          {/* Footer with Logo */}
          <div className="mb-12 text-center">
            <div className="w-72 h-24 mx-auto rounded flex items-center justify-center">
              <img
                src={FooterLogo}
                alt="Saudi National Day 95"
                className="w-[150px] h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostCreateQuiz;
