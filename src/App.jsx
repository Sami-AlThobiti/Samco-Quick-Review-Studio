import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Star, Copy, Music, Volume2, VolumeX, Share2, Download, 
  ChevronRight, ChevronLeft, Check, Instagram, Twitter, Smartphone, 
  MapPin, Coffee, Youtube, Home, Palette, Moon, Sun, Monitor, Droplets 
} from 'lucide-react';

// --- Helper: Dynamic Script Loader ---
const loadScript = (src, id) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

// --- Theme Configurations ---
const themes = {
  cosmic: {
    id: 'cosmic',
    name: 'ليالي سامكو',
    primary: 'from-amber-500 to-purple-600',
    accent: 'text-amber-400',
    bgGradient: 'bg-slate-950',
    button: 'bg-gradient-to-r from-amber-500 to-purple-600',
    icon: <Moon size={18} />
  },
  coffee: {
    id: 'coffee',
    name: 'قهوة دافئة',
    primary: 'from-orange-700 to-amber-900',
    accent: 'text-orange-300',
    bgGradient: 'bg-[#1a120b]', // Very dark brown
    button: 'bg-gradient-to-r from-orange-600 to-amber-800',
    icon: <Coffee size={18} />
  },
  ocean: {
    id: 'ocean',
    name: 'محيط أزرق',
    primary: 'from-cyan-500 to-blue-600',
    accent: 'text-cyan-300',
    bgGradient: 'bg-slate-900',
    button: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    icon: <Droplets size={18} />
  },
  cyber: {
    id: 'cyber',
    name: 'سايبر نيون',
    primary: 'from-pink-500 to-rose-600',
    accent: 'text-pink-400',
    bgGradient: 'bg-black',
    button: 'bg-gradient-to-r from-pink-600 to-purple-600',
    icon: <Monitor size={18} />
  }
};

// --- Components ---

const SocialLinks = () => (
  <div className="flex justify-center gap-4 mt-4">
    {/* X (Twitter) */}
    <a 
      href="https://x.com/designer_samco?s=21&t=dbffdoGcvgOluktAOa9LHA" 
      target="_blank" 
      rel="noreferrer"
      className="group p-3 bg-slate-800/80 rounded-xl text-white hover:bg-black transition-all hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] duration-300"
    >
      <span className="font-bold text-lg group-hover:scale-125 block transition-transform">X</span>
    </a>

    {/* Instagram */}
    <a 
      href="https://www.instagram.com/samco_design?igsh=MXhiN2RjbG1ydHducg%3D%3D&utm_source=qr" 
      target="_blank" 
      rel="noreferrer"
      className="group p-3 bg-slate-800/80 rounded-xl text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 transition-all hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] duration-300"
    >
      <Instagram size={24} className="group-hover:scale-125 transition-transform" />
    </a>

    {/* TikTok */}
    <a 
      href="https://www.tiktok.com/@samco_designer?_t=ZS-90FZRdOXUiG&_r=1" 
      target="_blank" 
      rel="noreferrer"
      className="group p-3 bg-slate-800/80 rounded-xl text-white hover:bg-black transition-all hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
      <span className="font-bold text-sm relative z-10 group-hover:scale-125 block transition-transform">Tk</span>
    </a>

    {/* YouTube */}
    <a 
      href="https://www.youtube.com/@samco-desing" 
      target="_blank" 
      rel="noreferrer"
      className="group p-3 bg-slate-800/80 rounded-xl text-white hover:bg-red-600 transition-all hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] duration-300"
    >
      <Youtube size={24} className="group-hover:scale-125 transition-transform" />
    </a>
  </div>
);

const Toast = ({ message, show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-2 animate-fade-in-down border border-white/20">
      <Check size={18} className="text-green-400" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

const AnimatedBackground = ({ themeId }) => {
  const isCosmic = themeId === 'cosmic';
  const isCoffee = themeId === 'coffee';
  const isOcean = themeId === 'ocean';
  const isCyber = themeId === 'cyber';

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none transition-colors duration-700 ${themes[themeId].bgGradient}`}>
      
      {/* --- Cosmic Theme --- */}
      {isCosmic && (
        <>
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.7,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`
              }}
            />
          ))}
        </>
      )}

      {/* --- Coffee Theme --- */}
      {isCoffee && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-orange-900/20 rounded-full blur-[120px]" />
          {/* Steam particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/5 rounded-full blur-xl"
              style={{
                bottom: '-10%',
                left: `${10 + Math.random() * 80}%`,
                width: '60px',
                height: '100px',
                animation: `steam ${4 + Math.random() * 4}s infinite linear -${Math.random() * 5}s`
              }}
            />
          ))}
        </>
      )}

      {/* --- Ocean Theme --- */}
      {isOcean && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900 to-blue-950" />
          {/* Bubbles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-blue-400/20 bg-blue-400/5"
              style={{
                bottom: '-20px',
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                animation: `bubble ${Math.random() * 10 + 5}s infinite ease-in`
              }}
            />
          ))}
        </>
      )}

      {/* --- Cyber Theme --- */}
      {isCyber && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:40px_40px] [background-image:linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]" />
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-cyan-600/20 rounded-full blur-[100px] animate-pulse" />
        </>
      )}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        @keyframes steam {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translateY(-120vh) scale(2); opacity: 0; }
        }
        @keyframes bubble {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.5; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  // --- State ---
  const [step, setStep] = useState(1);
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [formData, setFormData] = useState({
    placeName: '',
    serviceType: 'مقهى',
    rating: 0,
    pros: '',
    cons: '',
  });
  const [generatedReviews, setGeneratedReviews] = useState({ short: '', medium: '', cinematic: '' });
  const [posterImage, setPosterImage] = useState(null);
  const [posterFormat, setPosterFormat] = useState('9:16');
  const [isPlaying, setIsPlaying] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [libsLoaded, setLibsLoaded] = useState(false);
  
  // Refs
  const audioRef = useRef(null);
  const posterRef = useRef(null);

  // Theme object for easy access
  const theme = themes[currentTheme];

  // --- Load External Libs ---
  useEffect(() => {
    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js', 'confetti-script'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', 'html2canvas-script')
    ]).then(() => {
      setLibsLoaded(true);
    }).catch(err => console.error(err));
  }, []);

  // --- Handlers ---
  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const generateReviews = () => {
    if (!formData.placeName) {
      showToast("يرجى كتابة اسم المكان أولاً");
      return;
    }

    const stars = "⭐".repeat(formData.rating);
    
    const short = `تجربتي في ${formData.placeName} كانت ${formData.rating >= 4 ? 'مميزة جداً' : 'جيدة'}. ${formData.pros ? `أعجبني: ${formData.pros}` : ''}. التقييم: ${formData.rating}/5 ${stars} \n#${formData.placeName.replace(/\s/g, '_')} #سامكو_ريفيو`;

    const medium = `📍 زيارة لـ: ${formData.placeName}\n☕ النوع: ${formData.serviceType}\n\n📝 الخلاصة:\nالمكان جميل ويستحق التجربة. ${formData.pros ? `أكثر ما لفت انتباهي هو ${formData.pros}.` : ''} ${formData.cons ? `لكن هناك ملاحظة بسيطة بخصوص ${formData.cons}.` : ''}\n\nالتقييم العام: ${formData.rating}/5 ${stars}\nأنصحكم بتجربته! 👍\n\n#تجارب #مطاعم #${formData.placeName.replace(/\s/g, '_')} #تصويري`;

    const cinematic = `✨ حكاية مكان: ${formData.placeName} ✨\n\nفي زوايا هذا الـ${formData.serviceType}، تختبئ تفاصيل تصنع الفارق. من اللحظة الأولى، تشعر بـ${formData.rating >= 4 ? 'الفخامة والاهتمام' : 'الراحة والهدوء'}. \n\n💎 نقاط الجمال: ${formData.pros || 'الأجواء العامة'}\n⚠️ همسة محبة: ${formData.cons || 'لا يوجد ملاحظات جوهرية'}\n\n🌟 الحكم النهائي:\nتجربة تلامس الحواس وتستحق التكرار.\n${stars}\n\n📷 By Samco Studio\n#سينما_المكان #ذائقة #${formData.placeName.replace(/\s/g, '_')}`;

    setGeneratedReviews({ short, medium, cinematic });
    setStep(2);
    
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: currentTheme === 'cyber' ? ['#f472b6', '#22d3ee'] : ['#f59e0b', '#7c3aed', '#ffffff']
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPosterImage(url);
    }
  };

  const downloadPoster = async () => {
    if (posterRef.current && window.html2canvas) {
      try {
        const canvas = await window.html2canvas(posterRef.current, {
          useCORS: true,
          scale: 2,
          backgroundColor: null,
        });
        const link = document.createElement('a');
        link.download = `Samco-Review-${formData.placeName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast("تم حفظ البوستر بنجاح!");
      } catch (err) {
        showToast("حدث خطأ أثناء حفظ الصورة");
        console.error(err);
      }
    } else {
      showToast("جاري تحميل أدوات التصميم...");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("تم نسخ النص!");
  };

  // --- Views ---

  const renderBuilder = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">اسم المكان</label>
          <input
            name="placeName"
            value={formData.placeName}
            onChange={handleInputChange}
            placeholder="مثال: ستاربكس، مطعم الرومانسية..."
            className={`w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none transition-colors focus:ring-1 focus:ring-amber-500`}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">نوع الخدمة</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="مقهى">☕ مقهى</option>
            <option value="مطعم">🍽️ مطعم</option>
            <option value="فندق">🏨 فندق</option>
            <option value="مكان ترفيهي">🎡 ترفيه</option>
            <option value="خدمة عامة">🛠️ خدمة</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-sm mb-2">التقييم</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setFormData({ ...formData, rating: star })}
              className={`text-2xl transition-transform hover:scale-125 ${star <= formData.rating ? theme.accent : 'text-gray-600'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">أبرز المميزات (اختياري)</label>
          <textarea
            name="pros"
            value={formData.pros}
            onChange={handleInputChange}
            placeholder="القهوة ممتازة، الديكور رائع..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white h-24 focus:border-green-500 focus:outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">ملاحظات / عيوب (اختياري)</label>
          <textarea
            name="cons"
            value={formData.cons}
            onChange={handleInputChange}
            placeholder="الأسعار مرتفعة قليلاً، الزحام..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white h-24 focus:border-red-500 focus:outline-none resize-none"
          />
        </div>
      </div>

      <button
        onClick={generateReviews}
        className={`w-full ${theme.button} text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-white/10 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2`}
      >
        <Camera size={20} />
        توليد التقييم الاحترافي
      </button>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Short Review */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl relative group hover:border-white/30 transition-colors">
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => copyToClipboard(generatedReviews.short)} className="p-2 bg-slate-700 rounded-full hover:bg-amber-600 text-white">
              <Copy size={14} />
            </button>
          </div>
          <h3 className={`${theme.accent} font-bold mb-2 flex items-center gap-2`}>
            <Smartphone size={16} /> صيغة قصيرة (ستوري)
          </h3>
          <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{generatedReviews.short}</p>
        </div>

        {/* Medium Review */}
        <div className={`bg-slate-800/80 border border-slate-700 p-4 rounded-xl relative group ring-1 ring-white/10`}>
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => copyToClipboard(generatedReviews.medium)} className="p-2 bg-slate-700 rounded-full hover:bg-amber-600 text-white">
              <Copy size={14} />
            </button>
          </div>
          <h3 className={`${theme.accent} font-bold mb-2 flex items-center gap-2`}>
            <Coffee size={16} /> صيغة متوازنة (بوست)
          </h3>
          <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{generatedReviews.medium}</p>
        </div>

        {/* Cinematic Review */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl relative group hover:border-white/30 transition-colors">
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => copyToClipboard(generatedReviews.cinematic)} className="p-2 bg-slate-700 rounded-full hover:bg-amber-600 text-white">
              <Copy size={14} />
            </button>
          </div>
          <h3 className="text-purple-400 font-bold mb-2 flex items-center gap-2">
            <Star size={16} /> صيغة سينمائية (ريلز)
          </h3>
          <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{generatedReviews.cinematic}</p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={() => setStep(1)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition-colors">
          تعديل البيانات
        </button>
        <button onClick={() => setStep(3)} className={`flex-1 ${theme.button} text-white py-3 rounded-xl font-bold shadow-lg transition-colors flex items-center justify-center gap-2`}>
          تصميم البوستر <ChevronLeft size={18} />
        </button>
      </div>
    </div>
  );

  const renderPoster = () => (
    <div className="animate-fade-in-up flex flex-col md:flex-row gap-8">
      {/* Controls */}
      <div className="w-full md:w-1/3 space-y-6">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
             إعدادات البوستر
          </h3>
          
          <div className="space-y-4">
             <div>
               <label className="block text-gray-400 text-sm mb-2">رفع صورة الخلفية</label>
               <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"/>
             </div>

             <div>
               <label className="block text-gray-400 text-sm mb-2">مقاس التصميم</label>
               <div className="flex bg-slate-900 rounded-lg p-1">
                 <button onClick={() => setPosterFormat('9:16')} className={`flex-1 py-2 rounded-md text-sm transition-all ${posterFormat === '9:16' ? 'bg-white text-black' : 'text-gray-400'}`}>ستوري (9:16)</button>
                 <button onClick={() => setPosterFormat('A4')} className={`flex-1 py-2 rounded-md text-sm transition-all ${posterFormat === 'A4' ? 'bg-white text-black' : 'text-gray-400'}`}>بوست (4:5)</button>
               </div>
             </div>
          </div>
        </div>

        <button onClick={downloadPoster} className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/20">
          <Download size={20} /> تحميل البوستر
        </button>
        
        <button onClick={() => setStep(4)} className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl flex items-center justify-center gap-2">
           انتقل للنشر <ChevronLeft size={18} />
        </button>
      </div>

      {/* Preview Canvas */}
      <div className="w-full md:w-2/3 bg-slate-900/50 rounded-xl p-4 flex justify-center items-center border border-slate-800 overflow-hidden">
        <div 
          ref={posterRef}
          className={`relative bg-black overflow-hidden shadow-2xl transition-all duration-300 ${posterFormat === '9:16' ? 'aspect-[9/16] w-[300px]' : 'aspect-[4/5] w-[320px]'}`}
        >
           {/* Background Image */}
           {posterImage ? (
             <img src={posterImage} className="absolute inset-0 w-full h-full object-cover" alt="Poster bg" />
           ) : (
             <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black flex items-center justify-center text-gray-600 text-center p-4">
               <span>اختر صورة لعرضها هنا</span>
             </div>
           )}
           
           {/* Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

           {/* Content Overlay */}
           <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center">
             <div className="flex justify-center gap-1 mb-2">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={18} fill={i < formData.rating ? "#fbbf24" : "none"} className={i < formData.rating ? "text-amber-400" : "text-gray-500"} />
               ))}
             </div>
             
             <h2 className="text-2xl font-bold mb-1 font-sans">{formData.placeName}</h2>
             <p className={`${theme.accent} text-sm uppercase tracking-widest mb-4`}>SAMCO REVIEW</p>
             
             <div className="border-t border-white/20 pt-4 mt-2">
               <p className="text-xs text-gray-300 italic">"{formData.pros || 'تجربة رائعة وتستحق الزيارة'}"</p>
             </div>
             
             {/* Simple Logo Placeholder */}
             <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-wider border border-white/20">
               SAMCO
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderPublish = () => (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in-up text-center">
       <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
         <h2 className="text-2xl font-bold text-white mb-2">أحسنت يا بطل! 🌟</h2>
         <p className="text-gray-400">تقييمك جاهز للانطلاق. شارك تجربتك مع العالم.</p>
       </div>

       <div className="space-y-4">
         <a 
           href={`https://www.google.com/maps/search/${encodeURIComponent(formData.placeName)}`} 
           target="_blank" 
           rel="noreferrer"
           className="block w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-transform hover:scale-105"
         >
           <MapPin size={20} /> قيم في Google Maps
         </a>
         
         <a 
           href={`https://wa.me/?text=${encodeURIComponent(generatedReviews.medium)}`} 
           target="_blank" 
           rel="noreferrer"
           className="block w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-transform hover:scale-105"
         >
           <Share2 size={20} /> شارك عبر WhatsApp
         </a>
       </div>
       
       <button onClick={() => { setStep(1); setPosterImage(null); }} className="text-gray-500 hover:text-white text-sm underline mt-4">
         إنشاء تقييم جديد
       </button>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen text-slate-100 font-sans selection:bg-amber-500 selection:text-white pb-10 relative">
      <AnimatedBackground themeId={currentTheme} />
      <Toast message={toast.message} show={toast.show} />

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="https://cdn.pixabay.com/audio/2022/03/23/audio_d0f62d1c68.mp3" type="audio/mp3" />
      </audio>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/20 border-b border-white/5 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep(1)}>
            <div className={`w-10 h-10 bg-gradient-to-tr ${theme.primary} rounded-lg flex items-center justify-center text-white font-bold shadow-lg`}>
              S
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-white">Quick Review</h1>
              <p className={`text-xs ${theme.accent} font-medium`}>By Samco Studio</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Home Button */}
            {step > 1 && (
               <button 
                onClick={() => setStep(1)}
                className="p-2 rounded-full bg-slate-800 text-gray-300 hover:bg-white hover:text-black transition-all"
                title="الرئيسية"
              >
                <Home size={20} />
              </button>
            )}

            {/* Theme Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-full bg-slate-800 text-gray-300 hover:bg-white hover:text-black transition-all"
                title="تغيير الثيم"
              >
                <Palette size={20} />
              </button>
              
              {showThemeMenu && (
                <div className="absolute top-12 left-0 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-fade-in-down">
                  {Object.values(themes).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setCurrentTheme(t.id); setShowThemeMenu(false); }}
                      className={`w-full text-right p-3 rounded-lg flex items-center gap-3 transition-colors ${currentTheme === t.id ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                      <span className={t.accent}>{t.icon}</span>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Audio Toggle */}
            <button 
              onClick={toggleAudio} 
              className={`p-2 rounded-full transition-all ${isPlaying ? 'bg-white text-black' : 'bg-slate-800 text-gray-400'}`}
              title={isPlaying ? "إيقاف الموسيقى" : "تشغيل أجواء المقهى"}
            >
              {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-8">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 px-2 relative">
           <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -z-10 rounded-full"></div>
           {[1, 2, 3, 4].map((s) => (
             <div 
               key={s} 
               className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s ? `bg-gradient-to-r ${theme.primary} text-white scale-110 shadow-lg` : 'bg-slate-800 text-gray-500'}`}
             >
               {s}
             </div>
           ))}
        </div>

        {/* Step Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 inline-block">
            {step === 1 && "بيانات التقييم"}
            {step === 2 && "اختر أسلوبك"}
            {step === 3 && "استوديو التصميم"}
            {step === 4 && "انشر إبداعك"}
          </h2>
        </div>

        {/* Dynamic Step Content */}
        <div className="min-h-[400px]">
          {step === 1 && renderBuilder()}
          {step === 2 && renderResults()}
          {step === 3 && renderPoster()}
          {step === 4 && renderPublish()}
        </div>

        {/* Footer (Follow Samco Section - Visible on All Pages) */}
        <div className="mt-12 pt-8 border-t border-white/5 mb-8 text-center animate-fade-in-up">
           <p className={`font-medium mb-4 flex items-center justify-center gap-2 ${theme.accent}`}>
             <Star size={16} fill="currentColor" /> تابع سامكو للمزيد من الأدوات الإبداعية
           </p>
           <SocialLinks />
           <p className="text-gray-600 text-xs mt-8">Designed & Developed by Samco AI © 2025</p>
        </div>
      </main>
    </div>
  );
};

export default App;
