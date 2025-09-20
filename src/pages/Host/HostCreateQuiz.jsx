import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import { ERROR_MESSAGES, UI_TEXT } from "../../utills/constants";
import GreenButton from "../../Components/GreenButton";

const HostCreateQuiz = ({ setIsStarted }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [questionCount, setQuestionCount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const maxQuestions = selectedCategory.reduce((total, cat) => {
    const selected = typeof cat === 'string'
      ? categories.find((c) => c.name === cat)
      : cat;
    return total + (selected?.question_count || 0);
  }, 0);

  const generateDropdownOptions = () => {
    const options = [];
    
    if (maxQuestions === 0) {
      // No categories selected: show only 0
      options.push(0);
    } else {
      // Categories selected: start from 10 and go in increments of 10
      for (let i = 10; i <= maxQuestions; i += 10) {
        options.push(i);
      }
      
      // Add the maximum value if it's not a multiple of 10
      if (maxQuestions % 10 !== 0) {
        options.push(maxQuestions);
      }
    }
    
    return options;
  };

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
    const numQuestionCount = Number(questionCount);
    
    if (maxQuestions === 0) {
      // No categories selected: default to 0
      if (!questionCount) {
        setQuestionCount(0);
      }
    } else {
      // Categories selected: default to 10 and enforce limits
      if (!questionCount || numQuestionCount < 10) {
        setQuestionCount(10);
      } else if (numQuestionCount > maxQuestions) {
        setQuestionCount(maxQuestions);
      }
    }
  }, [maxQuestions, questionCount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);


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

    const numQuestionCount = Number(questionCount);
    
    if (maxQuestions === 0 && numQuestionCount === 0) {
      setError('يجب اختيار فئات أولاً لتحديد عدد الأسئلة.');
      return;
    }
    
    if (maxQuestions > 0 && numQuestionCount < 10) {
      setError('يجب أن يكون عدد الأسئلة 10 على الأقل عند اختيار الفئات.');
      return;
    }
    
    if (maxQuestions > 0 && numQuestionCount > maxQuestions) {
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

    if (rawValue === "") {
      setQuestionCount("");
      return;
    }

    const value = Number(rawValue);

    if (!Number.isFinite(value) || value < 0) {
      return; // Don't update state for invalid values
    }

    if (maxQuestions === 0) {
      setQuestionCount(value);
    } else {
      const clamped = Math.max(10, Math.min(value, maxQuestions));
      setQuestionCount(clamped);
    }
  };

  const handleDropdownSelect = (value) => {
    setQuestionCount(value);
    setShowDropdown(false);
  };

  const getButtonBorderClasses = (category) => {
    const isSelected = selectedCategory.some(cat =>
      (typeof cat === 'string' ? cat : cat.name) === category.name
    );
    return isSelected ? 'border-[3px] border-borderGreen' : 'border-[3px] border-gray-400';
  };

  return (
    <div className="flex-1 py-2 space-y-6 overflow-y-auto">
      <div className="text-heading space-y-2" dir="rtl">
        <p className="text-white">{UI_TEXT.GAME_TITLE}</p>
      </div>

      <div dir="rtl">
        <h3 className="mb-3 text-lg">حدد الفئات</h3>

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
                  className={`w-full text-2xl h-[48px] flex items-center px-4 py-2 rounded-full transition-colors ${getButtonBorderClasses(category)}`}
                  dir="ltr"
                >
                  <div className="w-6 h-6 flex items-center justify-center mr-3">
                    {selectedCategory.some(cat =>
                      (typeof cat === 'string' ? cat : cat.name) === category.name
                    ) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                        <path d="M12 1C4.29 1 1 4.29 1 12C1 19.71 4.29 23 12 23C19.71 23 23 19.71 23 12C23 4.29 19.71 1 12 1ZM17.305 9.539C15.993 11.592 14.125 14.165 11.304 15.858C10.98 16.053 10.573 16.048 10.254 15.845C8.734 14.882 7.593 13.85 6.66 12.597C6.33 12.154 6.422 11.528 6.865 11.198C7.307 10.868 7.934 10.961 8.263 11.403C8.937 12.308 9.751 13.082 10.799 13.808C12.959 12.348 14.443 10.301 15.618 8.462C15.917 7.996 16.535 7.86 16.999 8.158C17.465 8.456 17.602 9.074 17.305 9.539Z" fill="#008A4A" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 1C4.29 1 1 4.29 1 12C1 19.71 4.29 23 12 23C19.71 23 23 19.71 23 12C23 4.29 19.71 1 12 1ZM17.305 9.539C15.993 11.592 14.125 14.165 11.304 15.858C10.98 16.053 10.573 16.048 10.254 15.845C8.734 14.882 7.593 13.85 6.66 12.597C6.33 12.154 6.422 11.528 6.865 11.198C7.307 10.868 7.934 10.961 8.263 11.403C8.937 12.308 9.751 13.082 10.799 13.808C12.959 12.348 14.443 10.301 15.618 8.462C15.917 7.996 16.535 7.86 16.999 8.158C17.465 8.456 17.602 9.074 17.305 9.539Z" fill="white" fillOpacity="0.4" />
                      </svg>
                    )}
                  </div>
                  <span className="flex-1 text-center text-primary-button">{category.name_ar}</span>
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
        <label className="block mb-2">عدد الأسئلة</label>
        <div className="relative dropdown-container">
          <input
            type="number"
            value={questionCount}
            min={1}
            max={maxQuestions || undefined}
            onChange={(e) => handleOnChange(e)}
            onFocus={() => setShowDropdown(false)}
            className="w-full bg-transparent border-[3px] border-borderGreen text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="أدخل عدد الأسئلة"
          />
          {generateDropdownOptions().length > 0 && (
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white hover:text-green-400 transition-colors"
              dir="ltr"
            >
              <svg
                className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {showDropdown && generateDropdownOptions().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 border-2 border-borderGreen rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto" style={{backgroundColor: 'rgb(0 52 58 / var(--tw-bg-opacity, 1))'}}>
              {generateDropdownOptions().map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleDropdownSelect(option)}
                  className={`w-full text-right px-4 py-2 hover:bg-green-600 transition-colors ${
                    questionCount === option ? 'bg-green-600 text-white' : 'text-white'
                  }`}
                  dir="rtl"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-white mt-2">
          {selectedCategory.length > 0 
            ? `الحد الأقصى المسموح بناءً على الفئات المختارة: ${maxQuestions} (الحد الأدنى: 10)` 
            : 'اختر فئات أولاً لتحديد عدد الأسئلة'
          }
        </p>
      </div>

      <div dir="rtl">
        <label className="block mb-2">اسمك</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسمك"
          className="w-full bg-transparent border-[3px] border-borderGreen text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none"
        />
      </div>

      <div dir="rtl">
        <label className="block mb-2">البريد الإلكتروني الخاص بك</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني الخاص بك"
          className="w-full bg-transparent border-[3px] border-borderGreen text-white placeholder-white py-2 px-4 rounded-full text-right focus:outline-none"
        />
      </div>

      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-3 rounded-full text-center z-50 max-w-sm mx-4" dir="rtl">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <GreenButton text={"ابدأ"} handleClick={handleSubmit} disabled={isLoading} />
      </div>
    </div>
  );
};

export default HostCreateQuiz;
