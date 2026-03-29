/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Smartphone, 
  Trophy, 
  CheckCircle, 
  Zap, 
  Users, 
  Share2, 
  Download, 
  MousePointer2, 
  Clock, 
  X, 
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
const NAMES = [
  "Rahul", "Priya", "Aman", "Sneha", "Rohit", "Pooja", "Arjun", "Neha", "Karan", "Deepak", 
  "Anjali", "Ravi", "Komal", "Vivek", "Suman", "Ajay", "Ritu", "Mohit", "Shreya", "Nitin", 
  "Payal", "Raj", "Sonali", "Abhishek", "Kajal", "Manish", "Sunil", "Aarti", "Varun", "Rekha", 
  "Harsh", "Muskan", "Tanya", "Vikas", "Simran", "Yash", "Nandini", "Akash", "Preeti", "Tarun", 
  "Divya", "Lokesh", "Isha", "Gaurav", "Meena", "Ankit", "Pallavi", "Sahil", "Jyoti", "Prakash"
];

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh", 
  "Andaman and Nicobar", "Dadra and Nagar Haveli", "Daman and Diu", "Lakshadweep", "Nagpur", 
  "Lucknow", "Patna", "Jaipur", "Bhopal", "Surat", "Kanpur", "Indore", "Amritsar", "Varanasi", 
  "Noida", "Gorakhpur", "Agra"
];

const BOTS = [
  { id: 1, name: "Rahul Sharma", baseBuffer: 150000 },
  { id: 2, name: "Priya Verma", baseBuffer: 120000 },
  { id: 3, name: "Aman Singh", baseBuffer: 100000 },
  { id: 4, name: "Neha Patel", baseBuffer: 85000 },
  { id: 5, name: "Rohit Kumar", baseBuffer: 70000 },
  { id: 6, name: "Pooja Yadav", baseBuffer: 55000 },
  { id: 7, name: "Arjun Mishra", baseBuffer: 40000 },
  { id: 8, name: "Sneha Gupta", baseBuffer: 25000 },
];

const APP_TASKS = [
  { id: 1, name: "Meesho App", url: "https://app.meesho.com/2yoV/r99th0qd?via=2a6mtb", reward: 500000 },
  { id: 2, name: "Sikka App", url: "https://sikkaapp.in/referral?userId=90f6c9b2-a2a7-42e6-9888-6e5600d842ec&userName=Sonu+Kushwaha&referralCode=WVCUY7", reward: 500000 },
  { id: 3, name: "Chillar App", url: "https://chillar.co.in/referral?userId=b70a8cba-178a-4d75-b5e4-425b01f90fcc&userName=Sonu+Kushwaha&referralCode=HAD1M2", reward: 500000 },
  { id: 4, name: "TaskBucks", url: "http://tbk.bz/pgkn7r7h", reward: 500000 },
  { id: 5, name: "Google Pay", url: "https://gpay.app.goo.gl/invite-fi8dp62", reward: 500000 },
  { id: 6, name: "Hourly App Download", url: "https://pl29010893.profitablecpmratenetwork.com/d0/0f/b4/d00fb4328b7b8abd11e14688a5984bb9.js", reward: 10000, isHourly: true },
];

// --- Components ---

const AdBlock = ({ id, label, className = "" }: { id: string, label: string, className?: string }) => (
  <div id={id} className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4 text-gray-400 text-xs font-mono uppercase tracking-widest min-h-[100px] ${className}`}>
    {label}
  </div>
);

const ScriptAd = ({ id, width, height, adKey }: { id: string, width: number, height: number, adKey: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;">
              <script type="text/javascript">
                atOptions = {
                  'key' : '${adKey}',
                  'format' : 'iframe',
                  'height' : ${height},
                  'width' : ${width},
                  'params' : {}
                };
              </script>
              <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [adKey, width, height]);

  return (
    <div className="flex justify-center my-4 overflow-hidden">
      <div 
        id={id} 
        className="bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <iframe
          ref={iframeRef}
          width={width}
          height={height}
          frameBorder="0"
          scrolling="no"
          style={{ border: 'none', overflow: 'hidden' }}
          title={`ad-${id}`}
        />
      </div>
    </div>
  );
};

const NativeAd = ({ id, scriptSrc }: { id: string, scriptSrc: string }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = scriptSrc;
      adRef.current.appendChild(script);
    }
  }, [scriptSrc]);

  return (
    <div className="flex justify-center my-8">
      <div 
        ref={adRef} 
        id={id} 
        className="w-full max-w-4xl min-h-[100px] bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-[10px] text-slate-300 uppercase font-mono"
      >
        {/* Native Ad will load here */}
      </div>
    </div>
  );
};

const SimpleScriptAd = ({ scriptSrc }: { scriptSrc: string }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      adRef.current.appendChild(script);
    }
  }, [scriptSrc]);

  return (
    <div ref={adRef} className="flex justify-center my-8 min-h-[50px]">
      {/* Script will load here */}
    </div>
  );
};

const PopunderAd = ({ scriptSrc }: { scriptSrc: string }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = scriptSrc;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [scriptSrc]);

  return null;
};

export default function App() {
  // --- State ---
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('sv_coins');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [clickCoinsThisHour, setClickCoinsThisHour] = useState<number>(() => {
    const saved = localStorage.getItem('sv_click_coins_hour');
    const lastHour = localStorage.getItem('sv_last_click_hour');
    const currentHour = new Date().getHours();
    const currentDate = new Date().toDateString();
    const savedDate = localStorage.getItem('sv_last_click_date');

    if (lastHour === currentHour.toString() && savedDate === currentDate) {
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [hasJoined, setHasJoined] = useState<boolean>(() => {
    return localStorage.getItem('sv_joined') === 'true';
  });

  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    const saved = localStorage.getItem('sv_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [notification, setNotification] = useState<string | null>(null);
  const [showPopupAd, setShowPopupAd] = useState(false);

  // --- Refs ---
  const notificationInterval = useRef<NodeJS.Timeout | null>(null);

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('sv_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('sv_joined', hasJoined.toString());
  }, [hasJoined]);

  useEffect(() => {
    localStorage.setItem('sv_tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem('sv_click_coins_hour', clickCoinsThisHour.toString());
    localStorage.setItem('sv_last_click_hour', new Date().getHours().toString());
    localStorage.setItem('sv_last_click_date', new Date().toDateString());
  }, [clickCoinsThisHour]);

  // --- Weekly Logic ---
  const getNextResetTime = useCallback(() => {
    const now = new Date();
    const lastReset = localStorage.getItem('sv_last_reset');
    let resetDate: Date;

    if (lastReset) {
      resetDate = new Date(parseInt(lastReset, 10));
      // If 7 days passed, reset
      if (now.getTime() - resetDate.getTime() > 7 * 24 * 60 * 60 * 1000) {
        setCoins(0);
        setCompletedTasks([]);
        resetDate = new Date();
        localStorage.setItem('sv_last_reset', resetDate.getTime().toString());
      } else {
        // Next reset is 7 days from last reset
        resetDate = new Date(resetDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      }
    } else {
      const start = new Date();
      localStorage.setItem('sv_last_reset', start.getTime().toString());
      resetDate = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
    return resetDate;
  }, []);

  useEffect(() => {
    const resetTime = getNextResetTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = resetTime.getTime() - now;

      if (distance < 0) {
        getNextResetTime(); // Trigger reset
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [getNextResetTime]);

  // --- Notifications ---
  useEffect(() => {
    const showRandomNotification = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const state = STATES[Math.floor(Math.random() * STATES.length)];
      const types = ['joined', 'earned', 'moved'];
      const type = types[Math.floor(Math.random() * types.length)];

      let msg = "";
      if (type === 'joined') msg = `Verified User ${name} from ${state} just joined`;
      else if (type === 'earned') msg = `Verified User ${name} from ${state} earned ${Math.floor(Math.random() * 500) + 50} coins`;
      else msg = `Verified User ${name} from ${state} moved to rank #${Math.floor(Math.random() * 5) + 2}`;

      setNotification(msg);
      setTimeout(() => setNotification(null), 4000);
    };

    notificationInterval.current = setInterval(showRandomNotification, 8000);
    return () => {
      if (notificationInterval.current) clearInterval(notificationInterval.current);
    };
  }, []);

  // --- Popup Ad ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopupAd(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // --- Handlers ---
  const addCoins = (amount: number, taskId?: string, isClickTask: boolean = false) => {
    if (isClickTask) {
      const currentHour = new Date().getHours();
      const currentDate = new Date().toDateString();
      const lastHour = localStorage.getItem('sv_last_click_hour');
      const lastDate = localStorage.getItem('sv_last_click_date');

      let currentHourCoins = clickCoinsThisHour;
      if (lastHour !== currentHour.toString() || lastDate !== currentDate) {
        currentHourCoins = 0;
      }

      if (currentHourCoins + amount > 30000) {
        setNotification("Hourly limit of 30,000 coins reached! Try again next hour.");
        setTimeout(() => setNotification(null), 3000);
        return;
      }
      setClickCoinsThisHour(currentHourCoins + amount);
    }

    setCoins(prev => prev + amount);
    if (taskId && !isClickTask && !completedTasks.includes(taskId)) {
      setCompletedTasks(prev => [...prev, taskId]);
    }
  };

  const handleJoin = () => {
    setHasJoined(true);
    window.scrollTo({ top: document.getElementById('tasks')?.offsetTop || 0, behavior: 'smooth' });
  };

  // --- Leaderboard Calculation ---
  const leaderboardData = BOTS.map(bot => ({
    ...bot,
    coins: coins + bot.baseBuffer + Math.floor(coins * 0.1) // Bots always stay ahead
  })).sort((a, b) => b.coins - a.coins);

  // User position logic: User can move only between 9th, 10th, and 11th positions
  // Let's say: 0-1000 coins = 11th, 1001-5000 = 10th, 5001+ = 9th
  const userRank = coins > 5000 ? 9 : (coins > 1000 ? 10 : 11);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded-lg">
              <Smartphone className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">SonuView <span className="text-orange-600">Giveaway</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-orange-600 transition-colors">Home</a>
            <a href="#leaderboard" className="hover:text-orange-600 transition-colors">Leaderboard</a>
            <a href="#tasks" className="hover:text-orange-600 transition-colors">Tasks</a>
            <a href="#winners" className="hover:text-orange-600 transition-colors">Winners</a>
            <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 px-3 py-1 rounded-full border border-orange-100 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-600 fill-orange-600" />
              <span className="font-bold text-orange-700">{coins.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Header Ad */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <ScriptAd id="HEADER_BANNER_AD" width={300} height={250} adKey="8ff8f63433b49482a1d89158e31bfcd4" />
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-template-columns-[1.2fr_1fr] gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                <Award className="w-4 h-4" />
                #1 Trusted Giveaway Platform
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                Win a New <span className="text-orange-600">iPhone</span> Every Week
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Join our free premium giveaway and earn coins by completing simple tasks. The more coins you have, the higher your rank on the leaderboard!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleJoin}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Join Giveaway Now
                  <Zap className="w-5 h-5 fill-white" />
                </button>
                <div className="flex items-center gap-4 px-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <img 
                        key={i}
                        src={`https://picsum.photos/seed/user${i}/100/100`} 
                        className="w-10 h-10 rounded-full border-2 border-white"
                        alt="User"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-bold">12.5k+ Joined</div>
                    <div className="text-slate-500">In the last 24 hours</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-orange-400/20 blur-[120px] rounded-full"></div>
              <img 
                src="https://picsum.photos/seed/smartphone/800/1000" 
                alt="Mobile Phone" 
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl rounded-[3rem] border-8 border-slate-900"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* Hero Ad */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <NativeAd id="container-ddcc1a4a9a12fddc6f69f7eff79a9309" scriptSrc="https://pl29010894.profitablecpmratenetwork.com/ddcc1a4a9a12fddc6f69f7eff79a9309/invoke.js" />
        </div>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: CheckCircle, title: "Verified Entries", desc: "100% real participants" },
                { icon: Clock, title: "Weekly Winners", desc: "New winner every Sunday" },
                { icon: Zap, title: "Fast Coins", desc: "Instant task rewards" },
                { icon: Trophy, title: "Real Competition", desc: "Live leaderboard ranking" },
              ].map((f, i) => (
                <div key={i} className="text-center space-y-3">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto">
                    <f.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg">{f.title}</h3>
                  <p className="text-sm text-slate-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">Next Winner Announcement In:</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((t, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="text-3xl md:text-5xl font-black text-orange-500">{t.value.toString().padStart(2, '0')}</div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-60 mt-1">{t.label}</div>
                </div>
              ))}
            </div>

            {/* Countdown Ad Block */}
            <div className="flex justify-center pt-8 overflow-hidden">
              <ScriptAd id="COUNTDOWN_AD" width={468} height={60} adKey="62eee65b9f0b00551e4e7a894e0ad26d" />
            </div>
          </div>
        </section>

        {/* Tasks Section */}
        <section id="tasks" className="py-24 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black">Earn Unlimited Coins</h2>
              <p className="text-slate-500">Complete these simple tasks to boost your rank instantly.</p>
            </div>

            <div className="grid gap-6">
              {/* Task 1: Click to Earn */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-orange-200 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <MousePointer2 className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Unlimited Click to Earn</h3>
                    <p className="text-sm text-slate-500">Limit: 30,000 coins per hour</p>
                    <div className="mt-1 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500 h-full transition-all duration-500" 
                        style={{ width: `${Math.min((clickCoinsThisHour / 30000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">
                      {clickCoinsThisHour.toLocaleString()} / 30,000 Hourly Limit
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                  <span className="text-orange-600 font-black text-lg">+50 Coins</span>
                  <button 
                    onClick={() => addCoins(50, undefined, true)}
                    disabled={clickCoinsThisHour >= 30000}
                    className={`w-full sm:w-auto px-8 py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg ${clickCoinsThisHour >= 30000 ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'}`}
                  >
                    {clickCoinsThisHour >= 30000 ? 'Limit Reached' : 'Click to Earn'}
                  </button>
                </div>
              </div>

              {/* Task 2: Share to Earn */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-orange-200 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                    <Share2 className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Unlimited Share to Earn</h3>
                    <p className="text-sm text-slate-500">Share with friends and earn big</p>
                  </div>
                </div>
                <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                  <span className="text-orange-600 font-black text-lg">+500 Coins</span>
                  <button 
                    onClick={() => addCoins(500)}
                    className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
                  >
                    Share Now
                  </button>
                </div>
              </div>

              {/* Task Ad Block */}
              <ScriptAd id="TASK_AD" width={320} height={50} adKey="067dbfbc33b30afdef25b55cac0ee420" />

              {/* Task 3: App Downloads */}
              <div className="space-y-4">
                <h3 className="font-bold text-xl px-2">App Download Tasks (+500,000 Each)</h3>
                <div className="grid gap-4">
                  {APP_TASKS.map(task => (
                    <div key={task.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                          <Download className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-bold">{task.name}</h4>
                          <p className="text-xs text-slate-500">Download & Open App</p>
                        </div>
                      </div>
                      <a 
                        href={task.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => addCoins(task.reward, `app_${task.id}`, !!(task as any).isHourly)}
                        className={`px-5 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${completedTasks.includes(`app_${task.id}`) && !(task as any).isHourly ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95'}`}
                      >
                        {completedTasks.includes(`app_${task.id}`) && !(task as any).isHourly ? 'Completed' : 'Download'}
                        {!(completedTasks.includes(`app_${task.id}`) && !(task as any).isHourly) && <ExternalLink className="w-3 h-3" />}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section id="leaderboard" className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Leaderboard Top Ad */}
            <div className="flex justify-center overflow-hidden">
              <ScriptAd id="LEADERBOARD_TOP_AD" width={728} height={90} adKey="f70db60f301326b456359c22353cf054" />
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black">Live Leaderboard</h2>
              <p className="text-slate-500">Top 8 players will win a brand new iPhone this week!</p>
            </div>

            <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl">
              <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-orange-500" />
                  <span className="font-bold text-lg">Current Rankings</span>
                </div>
                <div className="text-sm opacity-60">Updated just now</div>
              </div>
              
              <div className="divide-y divide-slate-200">
                {leaderboardData.map((bot, index) => (
                  <div key={bot.id} className="p-5 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${index < 3 ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {index + 1}
                      </div>
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://picsum.photos/seed/bot${bot.id}/100/100`} 
                          className="w-10 h-10 rounded-full border border-slate-200"
                          alt={bot.name}
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold">{bot.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                      <span className="font-black text-slate-700">{bot.coins.toLocaleString()}</span>
                    </div>
                  </div>
                ))}

                {/* User Position (Fixed at 9th) */}
                <div className="p-5 flex items-center justify-between bg-orange-50 border-y-2 border-orange-200">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-lg">
                      {userRank}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center border border-orange-300">
                        <Users className="w-5 h-5 text-orange-700" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-orange-900">You (Current User)</span>
                        <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">Keep earning to rank up!</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span className="font-black text-orange-900">{coins.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <SimpleScriptAd scriptSrc="https://pl29010896.profitablecpmratenetwork.com/5d/42/21/5d4221cb1c842dfd7dafa4c020c32a52.js" />
            
            {/* Leaderboard Bottom Ad */}
            <div className="flex justify-center py-8">
              <ScriptAd id="LEADERBOARD_BOTTOM_AD" width={160} height={300} adKey="dab225005c9b2952fa27978709dfce56" />
            </div>
          </div>
        </section>

        {/* Winners Section */}
        <section id="winners" className="py-24 px-4 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black">Previous Winners</h2>
              <p className="opacity-60">Real people, real prizes. You could be next!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Last Week Winner */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Last Week</div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img src="https://picsum.photos/seed/winner1/200/200" className="w-20 h-20 rounded-3xl border-2 border-orange-500/50" alt="Winner" referrerPolicy="no-referrer" />
                    <div>
                      <h3 className="text-2xl font-bold">Vikram Singh</h3>
                      <p className="text-orange-500 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" />
                        Verified Winner
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div className="text-sm opacity-60">Prize Won:</div>
                    <div className="font-bold text-lg">iPhone 15 Pro Max</div>
                  </div>
                  <div className="text-sm opacity-50 italic">"I couldn't believe it when I got the notification! SonuView is the best!"</div>
                </div>
              </div>

              {/* History Card */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Winner History
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Anjali Sharma", date: "2 weeks ago", prize: "iPhone 15" },
                    { name: "Rahul Gupta", date: "3 weeks ago", prize: "iPhone 15 Pro" },
                    { name: "Sneha Reddy", date: "1 month ago", prize: "iPhone 14 Pro" },
                  ].map((w, i) => (
                    <div key={i} className="flex items-center justify-between text-sm p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{i+2}</div>
                        <div>
                          <div className="font-bold">{w.name}</div>
                          <div className="text-[10px] opacity-40 uppercase">{w.date}</div>
                        </div>
                      </div>
                      <div className="text-orange-500 font-bold">{w.prize}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Winners Bottom Ad Block */}
        <div className="py-12 bg-slate-900 flex justify-center border-t border-white/5">
          <div className="max-w-4xl w-full flex justify-center overflow-hidden">
            <ScriptAd id="WINNERS_BOTTOM_SKYSCRAPER" width={160} height={600} adKey="0548f97238bc2902398a674b03d68a31" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-orange-600 p-1.5 rounded-lg">
                  <Smartphone className="text-white w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight">SonuView <span className="text-orange-600">Giveaway</span></span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                The most trusted iPhone giveaway platform in India. Join thousands of users and win premium gadgets every week for free.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Quick Links</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-orange-600 transition-colors">Home</a></li>
                <li><a href="#leaderboard" className="hover:text-orange-600 transition-colors">Leaderboard</a></li>
                <li><a href="#tasks" className="hover:text-orange-600 transition-colors">Tasks</a></li>
                <li><a href="#winners" className="hover:text-orange-600 transition-colors">Winners</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-lg">Legal</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="https://sites.google.com/view/sonupvg/home" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                <li><a href="https://sites.google.com/view/tremandsiu/home" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">Terms & Conditions</a></li>
                <li><a href="https://sites.google.com/view/discimp/home" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-400">
            <p>© 2026 www.sonuview.com. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <ShieldCheck className="w-5 h-5" />
              <span>SSL Secured Connection</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 left-4 z-[70] bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[280px]"
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-xs font-medium leading-tight">
              {notification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Ad Modal */}
      <AnimatePresence>
        {showPopupAd && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setShowPopupAd(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-8 space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black">Special Offer!</h3>
                  <p className="text-slate-500 text-sm">Check out our sponsors to earn bonus coins.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mb-2">Sponsored Ad</p>
                  <div className="flex justify-center">
                    <ScriptAd id="POPUP_MODAL_AD" width={300} height={250} adKey="8ff8f63433b49482a1d89158e31bfcd4" />
                  </div>
                </div>
                <button 
                  onClick={() => setShowPopupAd(false)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all"
                >
                  Continue to Giveaway
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Popunder Ad */}
      <PopunderAd scriptSrc="https://pl29010893.profitablecpmratenetwork.com/d0/0f/b4/d00fb4328b7b8abd11e14688a5984bb9.js" />
    </div>
  );
}
