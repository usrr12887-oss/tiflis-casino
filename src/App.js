import React, { useState, useEffect, useMemo } from "react";
import {
  Menu,
  X,
  Home,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  CreditCard,
  Upload,
  Copy,
  Info,
  CheckCircle,
  Users,
  ShieldCheck,
  Award,
  Bell,
  Zap,
  Trophy
} from "lucide-react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

/* ================= OYUNLAR DATA ================= */
const CASINO_IMAGES = [
  { id: 1, title: "Rich Fruits", category: "slots", img: "/images/rich-fruits.png" },
  { id: 2, title: "Sevens on Fire", category: "slots", img: "/images/sevens-on-fire.png" },
  { id: 3, title: "Hot Sevens", category: "slots", img: "/images/hot-sevens.png" },
  { id: 4, title: "Fire Rage", category: "slots", img: "/images/fire-rage.png" },
  { id: 5, title: "Extra Super 7", category: "slots", img: "/images/extra-super-7.png" },
  { id: 6, title: "Sizzling Hot", category: "slots", img: "/images/sizzling-hot.png" },
  { id: 7, title: "Golden Scatter", category: "crash", img: "/images/golden-scatter.png" },
  { id: 8, title: "Hot Sevens Extreme", category: "slots", img: "/images/hot-sevens-extreme.png" },
  { id: 9, title: "Lady Luck", category: "classic", img: "/images/lady-luck.png" },
  { id: 10, title: "Ultra 7 Hot", category: "slots", img: "/images/ultra-7-hot.png" },
  { id: 11, title: "Always Cherry", category: "slots", img: "/images/always-cherry.png" },
  { id: 12, title: "Aztec Century", category: "slots", img: "/images/aztec-century.png" },
  { id: 13, title: "Hot Slot", category: "slots", img: "/images/hot-slot.png" },
  { id: 14, title: "Fortune Star", category: "slots", img: "/images/fortune-star.png" },
  { id: 15, title: "Simple Diamond", category: "slots", img: "/images/simple-diamond.png" },
  { id: 16, title: "Joker's Fruit", category: "slots", img: "/images/jokers-fruit.png" },
  { id: 17, title: "Hit Jewels", category: "slots", img: "/images/hit-jewels.png" },
  { id: 18, title: "King of Jewels", category: "classic", img: "/images/king-of-jewels.png" },
  { id: 19, title: "Roll of Ramses", category: "slots", img: "/images/roll-of-ramses.jpg" },
  { id: 20, title: "Scatter Wins", category: "slots", img: "/images/scatter-wins.png" },
  { id: 21, title: "Tropical Fruits", category: "slots", img: "/images/tropical-fruits.png" },
];

export default function App() {
  /* --- UI & AUTH STATES --- */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  /* --- JACKPOTS & LIVE WIN STATES --- */
  const [smallJP, setSmallJP] = useState(320);
  const [mediumJP, setMediumJP] = useState(820);
  const [bigJP, setBigJP] = useState(1520);
  const [liveWin, setLiveWin] = useState({ name: "Kamran", game: "Aviator", amount: 125 });

  /* --- MODALS & FORMS STATES --- */
  const [searchQuery, setSearchQuery] = useState("");
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [depositMethod, setDepositMethod] = useState("card");
  const [depositAmount, setDepositAmount] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCard, setWithdrawCard] = useState("");

  /* ================= EFFECTS ================= */
  
  useEffect(() => {
    const t = setInterval(() => {
      setSmallJP((j) => (j >= 500 ? 200 : j + Math.floor(Math.random() * 3)));
      setMediumJP((j) => (j >= 1000 ? 700 : j + Math.floor(Math.random() * 4)));
      setBigJP((j) => (j >= 5000 ? 1200 : j + Math.floor(Math.random() * 10)));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const names = ["Elvin", "Leyla", "Murad", "Aysel", "Samir", "Rəşad", "Zaur", "Fidan", "Orxan", "Günel"];
    const games = ["Rich Fruits", "Hot Sevens", "Lady Luck", "Aviator", "Roulette", "Sizzling Hot"];
    const interval = setInterval(() => {
      setLiveWin({
        name: names[Math.floor(Math.random() * names.length)],
        game: games[Math.floor(Math.random() * games.length)],
        amount: Math.floor(Math.random() * 500) + 15
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ================= FUNCTIONS ================= */
  const filteredGames = useMemo(() => {
    return CASINO_IMAGES.filter((g) => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleCopyCard = () => {
    navigator.clipboard.writeText("4169 5555 4444 3333");
    alert("Kart nömrəsi kopyalandı!");
  };

  const handleDepositSubmit = () => {
    if (!depositAmount || depositAmount <= 0) return alert("Məbləği daxil edin.");
    setBalance(prev => prev + parseFloat(depositAmount));
    setDepositOpen(false);
    setDepositAmount("");
    setReceiptFile(null);
    alert("Balansınız yeniləndi!");
  };

  const handleWithdrawSubmit = () => {
    const amt = parseFloat(withdrawAmount);
    if (!amt || amt > balance) return alert("Balans kifayət deyil.");
    setBalance(prev => prev - amt);
    setWithdrawOpen(false);
    setWithdrawAmount("");
    alert("Çıxarış sorğusu qəbul edildi.");
  };

  return (
    <div className="h-screen bg-[#05070a] text-white flex flex-col overflow-hidden font-sans relative">
      
      {/* 1. HEADER */}
      <header className="px-5 py-4 bg-[#0a0c12] border-b border-white/5 flex justify-between items-center z-50">
        <h2 className="font-black text-amber-500 italic text-2xl tracking-tighter">TIFLIS</h2>
        {user ? (
          <div onClick={() => setWalletMenuOpen(true)} className="bg-white/5 px-4 py-1.5 rounded-2xl border border-white/10 text-right cursor-pointer">
            <span className="text-[10px] text-slate-500 block uppercase font-black">{user.username}</span>
            <span className="text-amber-500 font-bold text-sm">{balance.toFixed(2)} ₼</span>
          </div>
        ) : (
          <button onClick={() => setAuthOpen(true)} className="bg-amber-500 text-black px-6 py-2.5 rounded-xl font-black text-xs">GİRİŞ</button>
        )}
      </header>

      {/* 2. CANLI UDUŞLAR (ƏN YUXARIDA) */}
      <div className="bg-gradient-to-r from-amber-600/20 via-black to-amber-600/20 border-b border-amber-500/10 py-3 px-4 flex items-center justify-center gap-4 z-40">
        <div className="flex items-center gap-2 animate-pulse">
            <Trophy size={14} className="text-amber-500" />
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Live Win</span>
        </div>
        <div key={liveWin.name} className="flex items-center gap-3 animate-in slide-in-from-top duration-500">
            <span className="text-xs font-bold text-white/90">{liveWin.name}</span>
            <span className="text-[8px] px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20 text-amber-300 font-bold">{liveWin.game}</span>
            <span className="text-sm font-black text-green-400">+{liveWin.amount} ₼</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* JACKPOTLAR */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-gradient-to-b from-[#2a1e12] to-black p-3.5 rounded-2xl border border-amber-700/30 text-center">
                <span className="text-[8px] font-black text-amber-600 uppercase block mb-1">Mini</span>
                <span className="text-lg font-black text-white">{smallJP} ₼</span>
            </div>
            <div className="bg-gradient-to-b from-[#12232a] to-black p-3.5 rounded-2xl border border-cyan-700/30 text-center">
                <span className="text-[8px] font-black text-cyan-500 uppercase block mb-1">Middle</span>
                <span className="text-lg font-black text-white">{mediumJP} ₼</span>
            </div>
            <div className="bg-gradient-to-b from-[#3a0a0a] to-black p-3.5 rounded-2xl border border-red-600/40 text-center animate-pulse">
                <span className="text-[8px] font-black text-red-500 uppercase block mb-1">Mega</span>
                <span className="text-lg font-black text-red-500">{bigJP} ₼</span>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="px-4 mb-4">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Oyun axtar..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-amber-500/40"
            />
          </div>
        </div>

        {/* GAMES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
          {filteredGames.map((g) => (
            <div key={g.id} className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#0a0c12]">
              <img src={g.img} alt={g.title} className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black flex items-end justify-center p-3">
                <p className="text-[10px] font-black text-white/90 uppercase">{g.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM NAVIGATION - FERQLI CUZDAN BUTONU ILE */}
      <div className="fixed bottom-0 inset-x-0 bg-[#0a0c12]/95 backdrop-blur-xl border-t border-white/10 flex justify-around items-center py-2 z-50 pb-safe">
        
        <button onClick={() => {setSidebarOpen(false); window.scrollTo(0,0)}} className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-500 transition-colors">
          <Home size={22}/><span className="text-[10px] font-black uppercase tracking-tighter">Əsas</span>
        </button>

        <div className="relative -top-5">
            <button 
                onClick={() => setWalletMenuOpen(true)} 
                className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] border-4 border-[#05070a] transform active:scale-90 transition-all duration-200 group"
            >
                <Wallet size={26} className="text-black" />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-black text-amber-500 uppercase whitespace-nowrap">
                    Cüzdan
                </span>
            </button>
        </div>

        <button onClick={() => setSidebarOpen(true)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors">
          <Menu size={22}/><span className="text-[10px] font-black uppercase tracking-tighter">Menü</span>
        </button>
      </div>

      {/* MODALS (SIDEBAR, ABOUT, DEPOSIT, WITHDRAW, PROFILE, AUTH) */}
      
      {/* SIDEBAR */}
      {sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm" />
          <aside className="fixed left-0 top-0 h-full w-72 bg-[#0a0c12] z-[70] p-6 border-r border-white/10 animate-in slide-in-from-left">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-2xl font-black text-amber-500 italic">MENÜ</h1>
              <button onClick={() => setSidebarOpen(false)}><X /></button>
            </div>
            <div className="space-y-3">
              <button onClick={() => {setAboutOpen(true); setSidebarOpen(false);}} className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-2xl text-sm font-black transition-all">
                <Users size={20} className="text-purple-500"/> BİZİM HAQQIMIZDA
              </button>
              <button onClick={() => {setProfileOpen(true); setSidebarOpen(false);}} className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-2xl text-sm font-black transition-all">
                <Info size={20} className="text-blue-500"/> HESAB MƏLUMATLARI
              </button>
              <div className="h-px bg-white/10 my-4" />
              <button onClick={() => {setDepositOpen(true); setSidebarOpen(false);}} className="w-full flex items-center gap-4 p-4 bg-green-500/10 text-green-500 rounded-2xl text-sm font-black">
                <ArrowDownLeft size={20}/> DEPOZİT
              </button>
              <button onClick={() => {setWithdrawOpen(true); setSidebarOpen(false);}} className="w-full flex items-center gap-4 p-4 bg-red-500/10 text-red-500 rounded-2xl text-sm font-black">
                <ArrowUpRight size={20}/> ÇIXARIŞ
              </button>
            </div>
          </aside>
        </>
      )}

      {/* HAQQIMIZDA */}
      {aboutOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#10141d] w-full max-w-lg rounded-3xl border border-white/10 flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
               <h3 className="text-amber-500 font-black italic">BİZİM HAQQIMIZDA</h3>
               <button onClick={() => setAboutOpen(false)}><X /></button>
            </div>
            <div className="p-8 overflow-y-auto space-y-6 text-sm text-slate-300">
               <p>2018-ci ildən fəaliyyət göstərən Tiflis Casino, regionun ən etibarlı və şəffaf platformasıdır.</p>
               <div className="bg-white/5 p-5 rounded-3xl border border-white/5 space-y-3">
                  <h4 className="text-white font-black flex items-center gap-2"><ShieldCheck size={20} className="text-green-500"/> LİSENZİYA</h4>
                  <p>Lisenziya: Curacao No. 8048/JAZ. SSL şifrələmə ilə qorunur.</p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* DEPOZIT */}
      {depositOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#10141d] w-full max-w-md rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/20">
              <h3 className="font-black uppercase text-sm">Balans Artır</h3>
              <button onClick={() => setDepositOpen(false)}><X /></button>
            </div>
            <div className="flex p-3 gap-2 bg-black/40">
              <button onClick={() => setDepositMethod('card')} className={`flex-1 py-3 rounded-xl text-[10px] font-black ${depositMethod === 'card' ? 'bg-amber-500 text-black' : 'bg-white/5 text-slate-500'}`}>BANK KARTI</button>
              <button onClick={() => setDepositMethod('c2c')} className={`flex-1 py-3 rounded-xl text-[10px] font-black ${depositMethod === 'c2c' ? 'bg-amber-500 text-black' : 'bg-white/5 text-slate-500'}`}>KARTDAN KARTA</button>
            </div>
            <div className="p-6 space-y-5">
              <input type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} placeholder="Məbləğ (AZN)" className="w-full bg-black p-4 rounded-2xl border border-white/10 outline-none" />
              {depositMethod === 'card' ? (
                <div className="space-y-4">
                  <input placeholder="Kart Nömrəsi" className="w-full bg-black p-4 rounded-2xl border border-white/10 outline-none" />
                  <div className="flex gap-3"><input placeholder="MM/YY" className="flex-1 bg-black p-4 rounded-2xl border border-white/10 outline-none" /><input placeholder="CVV" className="flex-1 bg-black p-4 rounded-2xl border border-white/10 outline-none" /></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-5 bg-amber-500/5 border border-dashed border-amber-500/30 rounded-2xl flex justify-between items-center">
                    <span className="font-mono text-amber-500 font-bold tracking-widest">4169 5555 4444 3333</span>
                    <button onClick={handleCopyCard} className="p-3 bg-amber-500 text-black rounded-xl"><Copy size={18}/></button>
                  </div>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer">
                    <span className="text-[10px] font-black text-slate-500 uppercase">{receiptFile || "Qəbzi yükləyin"}</span>
                    <input type="file" className="hidden" onChange={e => setReceiptFile(e.target.files[0]?.name)} />
                  </label>
                </div>
              )}
              <button onClick={handleDepositSubmit} className="w-full bg-green-500 text-black py-5 rounded-2xl font-black text-sm uppercase">TƏSDİQLƏ</button>
            </div>
          </div>
        </div>
      )}

      {/* CÜZDAN QUICK MENU */}
      {walletMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-end">
          <div className="bg-[#10141d] w-full rounded-t-[40px] p-8 space-y-6 border-t border-white/10 animate-in slide-in-from-bottom">
            <div className="w-16 h-1.5 bg-white/10 rounded-full mx-auto" />
            <div className="grid grid-cols-2 gap-5">
              <button onClick={() => { setWalletMenuOpen(false); setDepositOpen(true); }} className="bg-green-500 text-black py-6 rounded-3xl font-black flex flex-col items-center gap-3">
                <ArrowDownLeft size={28}/> DEPOZİT
              </button>
              <button onClick={() => { setWalletMenuOpen(false); setWithdrawOpen(true); }} className="bg-red-600 text-white py-6 rounded-3xl font-black flex flex-col items-center gap-3">
                <ArrowUpRight size={28}/> ÇIXARIŞ
              </button>
            </div>
            <button onClick={() => setWalletMenuOpen(false)} className="w-full bg-white/5 py-4 rounded-2xl text-slate-400 font-black uppercase">Ləğv et</button>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {withdrawOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#10141d] w-full max-w-md rounded-3xl border border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-black uppercase text-sm tracking-widest">Vəsait Çıxarışı</h3>
                <button onClick={() => setWithdrawOpen(false)}><X size={18}/></button>
            </div>
            <div className="p-5 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl border border-amber-500/20 text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Mövcud Balans</p>
              <p className="text-3xl font-black text-amber-500">{balance.toFixed(2)} ₼</p>
            </div>
            <input type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} placeholder="Məbləğ" className="w-full bg-black p-4 rounded-2xl border border-white/10 font-black text-lg text-white" />
            <input value={withdrawCard} onChange={e => setWithdrawCard(e.target.value)} placeholder="Sizin Kart Nömrəniz" className="w-full bg-black p-4 rounded-2xl border border-white/10 font-mono text-center" />
            <button onClick={handleWithdrawSubmit} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-sm uppercase shadow-lg shadow-red-900/40">ÇIXARIŞI TƏSDİQLƏ</button>
          </div>
        </div>
      )}

      {/* PROFILE INFO MODAL */}
      {profileOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#10141d] w-full max-w-md rounded-3xl border border-white/10 p-8 relative">
            <button onClick={() => setProfileOpen(false)} className="absolute top-6 right-6 text-slate-500"><X size={20}/></button>
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center text-black font-black text-3xl">
                    {user?.username.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-xl font-black text-white uppercase">{user?.username}</h3>
                <p className="text-xs text-green-500 font-bold uppercase tracking-widest">VIP Hesab</p>
            </div>
            <div className="space-y-3">
                <div className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                    <span className="text-[10px] font-black text-slate-500 uppercase">İstifadəçi ID</span>
                    <span className="font-mono font-bold">#TF-{Math.floor(Math.random()*900000)+100000}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Ümumi Balans</span>
                    <span className="font-bold text-amber-500">{balance.toFixed(2)} AZN</span>
                </div>
            </div>
            <button onClick={() => {setUser(null); setProfileOpen(false);}} className="w-full mt-8 text-red-500 text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all">Çıxış Et</button>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {authOpen && (
        <div className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-[#10141d] p-10 rounded-[40px] w-full max-w-sm border border-white/10 text-center space-y-8 animate-in zoom-in">
            <h2 className="text-3xl font-black text-amber-500 italic tracking-tighter">XOŞ GƏLMİSİNİZ!</h2>
            <div className="space-y-4">
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="İstifadəçi Adı" className="w-full bg-black p-5 rounded-2xl border border-white/10 outline-none focus:border-amber-500 font-bold" />
              <button onClick={() => {if(username){setUser({username}); setAuthOpen(false);}}} className="w-full bg-amber-500 text-black py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em]">DAXİL OL</button>
            </div>
          </div>
        </div>
      )}

      {/* TAWK MESSENGER INTEGRATION */}
      <TawkMessengerReact propertyId="697238fd0938061981969133" widgetId="1jfj2t7sb" />
      
      <style>{`
        ::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </div>
  );
}
