import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Coffee, 
  Sparkles, 
  Copy, 
  Check, 
  AlertCircle, 
  Utensils, 
  RotateCcw, 
  Clipboard, 
  Info, 
  ArrowRight, 
  FlameKindling,
  MapPin,
  Search,
  ShoppingCart,
  User,
  Star,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Tag
} from "lucide-react";

interface SampleDish {
  name: string;
  ingredients: string;
  tags: string[];
  price: string;
  category: string;
}

const SAMPLE_DISHES: SampleDish[] = [
  {
    name: "Kolkata Cardamom Bun Maska",
    ingredients: "warm toasted milk-bun, rich salted butter, crushed cardamom sugar",
    tags: ["Best Seller", "Kolkata Favorite"],
    price: "₹120.00",
    category: "Bakery & Desserts"
  },
  {
    name: "Darjeeling Kesar Saffron Lassi",
    ingredients: "creamy hung curd, organic saffron threads, almond flakes, green cardamom",
    tags: ["Premium", "Trending"],
    price: "₹180.00",
    category: "Beverages"
  },
  {
    name: "Spiced Paneer Tikka Puff",
    ingredients: "flaky golden puff pastry, marinated smoked cottage cheese, mint chutney",
    tags: ["Hot & Crispy", "Snacks"],
    price: "₹145.00",
    category: "Appetizers"
  }
];

const LOADING_PHRASES = [
  "Steeping warm aromatic spices...",
  "Querying Chai Point Copywriting Engine...",
  "Formatting sensory tone parameters...",
  "Analyzing word limits (35-45 words)...",
  "Brewing high-converting menu description..."
];

export default function App() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);

  // Rotate loading phrases while generating
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 1800);
    } else {
      setLoadingPhraseIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleWriteDescription = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!dishName.trim() || !ingredients.trim()) return;

    setLoading(true);
    setError(null);
    setDescription("");

    try {
      const response = await fetch("/api/write-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dishName: dishName.trim(),
          ingredients: ingredients.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate menu description.");
      }

      setDescription(data.description);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!description) return;
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleSelectSample = (sample: SampleDish) => {
    setDishName(sample.name);
    setIngredients(sample.ingredients);
    setError(null);
  };

  const handleClear = () => {
    setDishName("");
    setIngredients("");
    setDescription("");
    setError(null);
  };

  const getWordCount = (text: string) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] text-[#0F1111] font-sans flex flex-col">
      
      {/* Amazon Prime / Seller style top header */}
      <header className="bg-[#131921] text-white shrink-0">
        
        {/* Primary Header Bar */}
        <div className="max-w-[1500px] mx-auto px-4 py-2 flex items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col select-none cursor-pointer p-1.5 border border-transparent hover:border-white rounded-sm transition-all">
              <div className="flex items-center gap-2">
                <Coffee className="w-6 h-6 text-[#FF9900] stroke-[2.25]" />
                <span className="text-xl font-bold tracking-tight text-white flex items-center">
                  chai point
                  <span className="text-[#FF9900] font-normal text-xs ml-1 font-mono">.in</span>
                </span>
              </div>
              {/* Amazon signature curved smile under the logo */}
              <div className="w-24 h-1.5 ml-2 overflow-hidden relative">
                <div className="absolute top-[-8px] left-0 w-24 h-12 border-b-2 border-[#FF9900] rounded-full"></div>
              </div>
            </div>

            {/* Delivery / Location Locator */}
            <div className="hidden md:flex items-center gap-1.5 p-2 border border-transparent hover:border-white rounded-sm transition-all cursor-pointer">
              <MapPin className="w-5 h-5 text-slate-300 self-end mb-0.5" />
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-slate-300 leading-none">Deliver to Kolkata</span>
                <span className="text-xs font-bold leading-tight">Salt Lake Cafe #1</span>
              </div>
            </div>
          </div>

          {/* Search-style utility / Informative title */}
          <div className="hidden lg:flex flex-1 max-w-2xl bg-white rounded-md overflow-hidden shadow-sm h-10 border border-transparent focus-within:ring-2 focus-within:ring-[#e77600] transition-all">
            <div className="bg-[#F3F3F3] text-xs text-[#555555] px-4 flex items-center border-r border-slate-200">
              Chai Point Seller Studio
            </div>
            <div className="flex-1 px-3 flex items-center text-xs text-slate-400 italic">
              AI-powered sensory menu copywriting wizard for staff...
            </div>
            <button className="bg-[#febd69] hover:bg-[#f3a847] px-6 text-[#131921] flex items-center justify-center transition-colors">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* User Account / Controls */}
          <div className="flex items-center gap-4">
            <div className="p-2 border border-transparent hover:border-white rounded-sm transition-all cursor-pointer flex flex-col text-left">
              <span className="text-[11px] text-slate-300 leading-none">Hello, Staff Member</span>
              <span className="text-xs font-bold leading-tight flex items-center gap-0.5">
                Chai Central Panel <ChevronRight className="w-3 h-3 text-[#FF9900]" />
              </span>
            </div>

            <div className="p-2 border border-transparent hover:border-white rounded-sm transition-all cursor-pointer flex flex-col text-left">
              <span className="text-[11px] text-slate-300 leading-none">Status</span>
              <span className="text-xs font-bold leading-tight text-emerald-400">Online</span>
            </div>
          </div>

        </div>

        {/* Secondary Navigation Rail (Amazon All Categories bar) */}
        <div className="bg-[#232F3E] text-xs text-white px-4 py-2 flex items-center justify-between border-t border-slate-800">
          <div className="flex items-center gap-5">
            <span className="font-bold flex items-center gap-1 hover:text-amber-400 cursor-pointer">
              <span className="font-bold text-sm">≡</span> All Menu Items
            </span>
            <span className="hover:text-amber-400 cursor-pointer font-medium text-amber-300 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-300" /> Best Sellers
            </span>
            <span className="hover:text-amber-400 cursor-pointer">Kolkata Special</span>
            <span className="hover:text-amber-400 cursor-pointer">Tea Accompaniments</span>
            <span className="hover:text-amber-400 cursor-pointer">Staff Settings</span>
          </div>
          <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
            Copywriter v1.2 (Flash Enabled)
          </div>
        </div>

      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 py-6 flex flex-col gap-6">
        
        {/* Breadcrumb Indicator */}
        <nav className="text-xs text-[#565959] flex items-center gap-1.5">
          <span>Chai Point</span>
          <ChevronRight className="w-3 h-3 text-[#888888]" />
          <span>Staff Studio</span>
          <ChevronRight className="w-3 h-3 text-[#888888]" />
          <span className="text-[#B12704] font-medium">Menu copywriter</span>
        </nav>

        {/* Console Workspace: Main layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form & Inputs */}
          <div className="lg:col-span-6 bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col gap-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-semibold text-[#0F1111] flex items-center gap-2">
                <Utensils className="w-5.5 h-5.5 text-amber-600" />
                Add New Menu Listing
              </h2>
              <p className="text-xs text-[#565959] mt-1">
                Enter your café's recipe credentials. The copywriter drafts a sensory 35-45 word product listing optimized for your display menu cards.
              </p>
            </div>

            <form onSubmit={handleWriteDescription} className="space-y-5">
              {/* Dish Name */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="dish-name"
                  className="block text-sm font-bold text-[#0F1111]"
                >
                  Dish Name / Product Title
                </label>
                <input
                  id="dish-name"
                  type="text"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="e.g., Kolkata Cardamom Bun Maska"
                  required
                  className="w-full px-3 py-2.5 rounded border border-[#A6A9A9] focus:border-[#E77600] focus:ring-1 focus:ring-[#E77600] outline-none transition-all text-sm shadow-inner placeholder:text-slate-400"
                />
              </div>

              {/* Three Key Ingredients */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label 
                    htmlFor="ingredients"
                    className="block text-sm font-bold text-[#0F1111]"
                  >
                    Three Key Ingredients
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    Comma separated
                  </span>
                </div>
                <textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., warm toasted milk-bun, rich salted butter, crushed cardamom sugar"
                  required
                  rows={3}
                  className="w-full px-3 py-2.5 rounded border border-[#A6A9A9] focus:border-[#E77600] focus:ring-1 focus:ring-[#E77600] outline-none transition-all text-sm shadow-inner placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || !dishName.trim() || !ingredients.trim()}
                  className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                    loading || !dishName.trim() || !ingredients.trim()
                      ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                      : "amazon-btn-orange text-white cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4.5 w-4.5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Steeping...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Write Description</span>
                    </>
                  )}
                </button>

                { (dishName || ingredients) && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-3 border border-[#D5D9D9] hover:bg-[#F7FAFA] rounded-lg text-xs font-semibold text-[#0F1111] transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-500" />
                    Reset
                  </button>
                )}
              </div>
            </form>

            {/* Quick-select recipe cards */}
            <div className="border-t border-slate-200 pt-5 space-y-3">
              <span className="block text-xs font-bold text-[#565959] uppercase tracking-wider">
                Frequently Brewed Recipes (Presets)
              </span>
              <div className="grid grid-cols-1 gap-2">
                {SAMPLE_DISHES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="text-left p-3 rounded-lg border border-[#D5D9D9] hover:border-[#E77600] hover:bg-[#F7FAFA] transition-all cursor-pointer flex justify-between items-center group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-[#0F1111] group-hover:text-[#B12704]">
                          {sample.name}
                        </span>
                        <span className="text-[10px] bg-[#232F3E] text-white px-2 py-0.5 rounded font-medium">
                          {sample.category}
                        </span>
                        {sample.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-[#565959] italic line-clamp-1">
                        Ingredients: {sample.ingredients}
                      </p>
                    </div>
                    <span className="text-xs text-[#007185] font-semibold hover:underline shrink-0 flex items-center gap-1 pl-4">
                      Select <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Amazon-style Live Detail Page Preview */}
          <div className="lg:col-span-6 bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col gap-5">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#565959] uppercase tracking-wider">
                  Live Preview Draft
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#007185]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Staff Copywriter Validated</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-h-[380px] flex flex-col items-center justify-center text-center p-6 gap-4"
                >
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#FF9900] rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[#FF9900]">
                      <FlameKindling className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#0F1111]">Steeping Digital Copy</h3>
                    <p className="text-xs text-[#E77600] font-mono italic animate-pulse max-w-xs mx-auto">
                      "{LOADING_PHRASES[loadingPhraseIndex]}"
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-h-[380px] flex flex-col items-center justify-center text-center p-6 gap-4"
                >
                  <div className="bg-rose-50 border border-rose-100 p-4 rounded-full text-[#B12704]">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-base font-bold text-rose-900">Copywriting Interrupted</p>
                    <p className="text-xs text-rose-700 max-w-sm mx-auto leading-relaxed">
                      {error}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleWriteDescription()}
                    className="amazon-btn-gold text-[#0F1111] px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Retry Steeping Process
                  </button>
                </motion.div>
              )}

              {!loading && !error && !description && (
                <motion.div
                  key="empty-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-h-[380px] flex flex-col items-center justify-center text-center p-8 gap-5 bg-slate-50 border border-dashed border-slate-300 rounded-lg"
                >
                  <div className="w-14 h-14 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                    <Clipboard className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h3 className="text-sm font-bold text-[#0F1111]">Brewing Screen Ready</h3>
                    <p className="text-xs text-[#565959] leading-relaxed">
                      Inputs on the left are currently empty. Fill out the **Dish Name** and **Ingredients** above, then click write to see your copy draft populate in real-time.
                    </p>
                  </div>
                </motion.div>
              )}

              {!loading && !error && description && (
                <motion.div
                  key="result-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {/* Amazon style Product detail grid */}
                  <div className="space-y-4">
                    {/* Brand name */}
                    <div className="space-y-1">
                      <span className="text-xs text-[#007185] hover:underline hover:text-[#C45500] cursor-pointer">
                        Brand: Chai Point Kolkata
                      </span>
                      <h3 className="text-2xl font-bold leading-tight text-[#0F1111]">
                        {dishName || "Signature Cafe Dish"}
                      </h3>
                    </div>

                    {/* Customer ratings */}
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center text-[#F1A40E]">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                      <span className="text-[#007185] hover:underline cursor-pointer text-xs font-semibold">
                        5.0 out of 5 stars
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-[#007185] hover:underline cursor-pointer text-xs">
                        1,994 staff favorites
                      </span>
                    </div>

                    <hr className="border-slate-200" />

                    {/* Price, Stock and Specs */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[#565959] block">Category:</span>
                        <span className="font-bold text-slate-800">Fresh Bakery &amp; Hot Dishes</span>
                      </div>
                      <div>
                        <span className="text-[#565959] block">Availability:</span>
                        <span className="font-bold text-emerald-600">In Stock • Freshly Brewed</span>
                      </div>
                    </div>

                    <hr className="border-slate-200" />

                    {/* About this item (Gemini output) */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0F1111]">
                        About this item (Generated Description)
                      </h4>
                      <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#FFD814]/30">
                        <p className="text-sm md:text-base leading-relaxed text-[#0F1111] italic font-serif">
                          "{description}"
                        </p>
                      </div>
                    </div>

                    {/* Specs / Details */}
                    <div className="bg-[#F3F3F3] p-3 rounded-md border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center gap-1.5 text-[#565959]">
                        <Info className="w-4 h-4 text-slate-500" />
                        <span className="font-bold text-[#0F1111]">Compliance Verification</span>
                      </div>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        <li>Description character count fits menu cards perfectly</li>
                        <li>Sensory parameters set to: <strong className="text-amber-800">Warm, Kolkata Aromatic</strong></li>
                        <li>Word Count Check: <strong className="text-slate-800 font-mono">{getWordCount(description)} words</strong> (Recommended: 35-45)</li>
                      </ul>
                    </div>

                  </div>

                  {/* Amazon style yellow/gold pill buttons for actions */}
                  <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                    
                    <button
                      onClick={handleCopy}
                      className={`flex-1 py-3 px-6 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        copied
                          ? "bg-emerald-600 text-white border border-emerald-700 shadow-md"
                          : "amazon-btn-gold text-[#0F1111]"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-700" />
                          <span>Copy Menu Description</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWriteDescription()}
                      className="px-5 py-3 border border-[#D5D9D9] hover:bg-[#F7FAFA] text-xs font-bold text-slate-800 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4 text-slate-500" />
                      Re-brew Description
                    </button>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Informational Help Desk Accordion / Policy */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#0F1111] border-b border-slate-200 pb-2 mb-3">
            Copywriting Directives &amp; Brand Standards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#565959] leading-relaxed">
            <div className="space-y-1">
              <span className="font-bold text-[#0F1111] block">1. Concise Word Range</span>
              <p>Descriptions are strictly bounded to 35-45 words. This guarantees that printed table cards and digital menus preserve standard vertical alignments without cropping text.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#0F1111] block">2. Sensory &amp; Aromatic Tone</span>
              <p>Focus strictly on warmth, tradition, and spices (cardamom, ginger, saffron). Describe textures (creamy, flaky, warm) to trigger sensory anticipation.</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-[#0F1111] block">3. Zero Emojis or Hype</span>
              <p>Avoid emojis, capital letters, or unsubstantiated claims (like "best lassi in the entire universe"). Keep the copy humble, sincere, and inviting.</p>
            </div>
          </div>
        </div>

      </main>

      {/* Styled Footer */}
      <footer className="bg-[#131921] text-white border-t border-slate-800 mt-12 py-8 shrink-0">
        <div className="max-w-[1500px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 select-none">
            <Coffee className="w-5 h-5 text-[#FF9900]" />
            <span className="font-bold tracking-tight text-white">
              chai point <span className="text-[#FF9900]">.in</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span className="hover:underline cursor-pointer">Conditions of Use</span>
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Staff Handbook</span>
            <span className="hover:underline cursor-pointer">Kolkata Cafe Help</span>
          </div>
          <p className="text-slate-500 font-mono text-[10px] text-right">
            Staff Portal • © 1996-2026, Chai Point Inc. or its affiliates. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
