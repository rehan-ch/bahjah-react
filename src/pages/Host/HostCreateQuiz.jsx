import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utills/varriables";

const HostCreateQuiz = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetch(`${BASE_URL}/api/v1/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Categories API Response:', result);
        
        if (result.success && result.data) {
          setCategories(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch categories');
        }
        
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to static categories if API fails
        setCategories(["علوم", "الجغرافيا", "ثقافة", "الأدب"]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(prev => {
      if (prev.includes(category)) {
        // Remove category if already selected
        return prev.filter(cat => cat !== category);
      } else {
        // Add category if not selected
        return [...prev, category];
      }
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (selectedCategory.length === 0 || !name || !email) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Format payload according to API requirements
      const payload = {
        game: {
          category: selectedCategory,
          question_count: questionCount,
          host_name: name,
          host_email: email
        }
      };

      // Send API request
      const response = await fetch(`${BASE_URL}/api/v1/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Store game ID in localStorage
      if (result.data?.id) {
        localStorage.setItem('game_id', result.data.id);
        navigate(`/host-waiting/${result.data.id}`);
      } else {
        throw new Error('Game ID not found in API response');
      }

    } catch (error) {
      console.error('API Error:', error);
      setError("حدث خطأ في إنشاء المسابقة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-[420px] h-[880px] border-2 border-black rounded-2xl overflow-hidden shadow-lg">
        
        <div className="min-h-full bg-gradient-to-b from-teal-900 to-teal-800 text-white flex flex-col">
          
          <div className="flex justify-between items-center px-4 py-3 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="text-green-400 font-medium"
              dir="rtl"
            >
              خلف
            </button>
            <span className="font-bold">بهجة</span>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-4 space-y-6 overflow-y-auto">
            
            {/* Title */}
            <div className="text-center space-y-2" dir="rtl">
              <h2 className="text-lg font-bold">اسم اللعبة</h2>
              <p className="text-xl font-bold">مسابقة اليوم الوطني</p>
            </div>

            {/* Categories */}
            <div dir="rtl">
              <h3 className="mb-3 text-sm font-medium">حدد الفئات</h3>
              
              {/* Categories Loading State */}
              {categoriesLoading && (
                <div className="text-center py-4">
                  <div className="text-green-400 text-sm mb-2">جاري تحميل الفئات...</div>
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              )}

              {/* Categories List */}
              {!categoriesLoading && (
                <div className="space-y-3">
                  {categories.length > 0 ? (
                    categories?.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full flex justify-between items-center px-4 py-3 rounded-lg border-2 transition-colors ${
                          selectedCategory.includes(category)
                            ? "bg-green-600 border-green-700"
                            : "bg-teal-700 border-teal-500"
                        }`}
                      >
                        <span>{category.name_ar || category}</span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedCategory.includes(category)
                              ? "bg-green-500 border-green-600"
                              : "border-gray-400"
                          }`}
                        >
                          {selectedCategory.includes(category) && (
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-4 text-red-400 text-sm">
                      لا توجد فئات متاحة
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Number of Questions */}
            <div dir="rtl">
              <label className="block mb-2 text-sm">عدد الأسئلة</label>
              <input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-lg text-right focus:outline-none focus:border-green-400"
              />
            </div>

            {/* Name */}
            <div dir="rtl">
              <label className="block mb-2 text-sm">اسمك</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك"
                className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-lg text-right focus:outline-none focus:border-green-400"
              />
            </div>

            {/* Email */}
            <div dir="rtl">
              <label className="block mb-2 text-sm">البريد الإلكتروني الخاص بك</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني الخاص بك"
                className="w-full bg-transparent border-2 border-teal-400 text-white placeholder-teal-300 py-3 px-4 rounded-lg text-right focus:outline-none focus:border-green-400"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-600 text-white p-3 rounded-lg text-center" dir="rtl">
                {error}
              </div>
            )}

            <div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full font-bold py-4 px-6 rounded-full text-lg transition-colors ${
                  isLoading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                dir="rtl"
              >
                {isLoading ? "جاري الإنشاء..." : "يبدأ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostCreateQuiz;
