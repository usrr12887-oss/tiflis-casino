import React, { useState, useEffect } from 'react';
import { 
  Menu, X, User, Home, Gamepad2, Wallet, Trophy, LogOut, Settings, History, 
  TrendingUp, Star, ShieldCheck, Globe, Activity
} from 'lucide-react';
// Canlı dəstək paketi
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const CASINO_IMAGES = [
  { id: 1, title: "Gates of Olympus", img: "https://butakazino1.com/game-previews/LhnNtvoeyOc6k4ry9n5Y1nYUQbNWrx7InEuyuvGt.png" },
  { id: 2, title: "Sweet Bonanza", img: "https://butakazino1.com/game-previews/6zRQT1GXI1XfOyDm0Begzvnhp2kCzXrFGCh8zeKw.png" },
  { id: 3, title: "Sugar Rush", img: "https://butakazino1.com/game-previews/p9KjbITI6iMzJJ67u9Y7G2BDZKv40iusYVmCdJYu.png" },
  { id: 4, title: "Wolf Gold", img: "https://butakazino1.com/game-previews/AyiItayuAVUQiLKi7sPMocsr6vU1Z0NwgtnilhN2.png" },
  { id: 5, title: "The Dog House", img: "https://butakazino1.com/game-previews/OGXGGadnU0H8adoFwNn8l2EtegAuitWurtKOg5si.png" },
  { id: 6, title: "Big Bass Splash", img: "https://butakazino1.com/game-previews/5wbH7oHXrZwLKwgUvpRWMVR8ed5DVcqWm1fnRiNe.png" }
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balance, setBalance] = useState(100.00);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('lobby');
  const [jackpot, setJackpot] = useState(1254780.45);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setJackpot(prev => prev + Math.random() * 0.5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const [reels, setReels] = useState(['💎', '💎', '💎']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);

  const symbols = ['🍒', '🍋', '💎', '7️⃣', '🔔', '🍇'];
  
  const spinSlots = () => {
    if (balance < 10) return alert("Minimum mərc 10 ₼!");
    setIsSpinning(true);
    setBalance(prev => prev - 10);
    setLastWin(0);

    setTimeout(() => {
      const newReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      setReels(newReels);
      setIsSpinning(false);

      if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
        const win = 100; setBalance(p => p + win); setLastWin(win);
      } else if (newReels[0] === newReels[1] || newReels[1] === newReels[2]) {
        const win = 20; setBalance(p => p + win); setLastWin(win);
      }
    }, 800);
  };

  return (
    <div className="flex h-screen bg-[#05070a] text-slate-200 font-sans overflow-hidden">
      
      {sidebarOpen && <div className="fixed inset-0 bg-black/90 z-[60] lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>}

      <aside className={`fixed inset-y-0 left-0 z-[70] w-64 bg-[#0a0c12] border-r border-white/5 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static flex flex-col`}>
        <div className="p-8 flex justify-between items-center">
          <h1 className="text-2xl font-black text-amber-500 italic tracking-tighter">TIFLIS<span className="text-white">CASINO</span></h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500"><X size={24} /></button>
        </div>
        <nav className="px-4 space-y-1 flex-1">
          <button onClick={() => {setActiveTab('lobby'); setSidebarOpen(false)}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'lobby' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:bg-white/5'}`}>
            <Home size={20} /> Lobby
          </button>
          <button onClick={() => {setActiveTab('slots'); setSidebarOpen(false)}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'slots' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:bg-white/5'}`}>
            <Gamepad2 size={20} /> Slotlar
          </button>
          <div className="my-6 border-t border-white/5"></div>
          <button onClick={() => {setIsDepositOpen(true); setSidebarOpen(false)}} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-amber-500 text-black font-bold">
            <Wallet size={20} /> Depozit
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#05070a]/80 backdrop-blur-xl z-50">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-white"><Menu /></button>
          <div className="hidden md:flex flex-col items-center">
             <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest animate-pulse">Mega Jackpot</span>
             <span className="text-2xl font-black font-mono text-white">₼ {jackpot.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
               <p className="text-[10px] text-slate-500 font-bold uppercase">Balans</p>
               <p className="text-xl font-black text-white">{balance.toFixed(2)} ₼</p>
            </div>
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition ${isProfileOpen ? 'bg-amber-500 text-black border-amber-500' : 'bg-slate-800 border-white/10 text-white'}`}>
                <User size={24} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0f121a] border border-white/10 rounded-2xl shadow-2xl py-3 z-[100] animate-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-white/5 mb-2"><p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Hesabım</p><p className="text-white font-bold">ID: 994021</p></div>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-slate-300 text-sm"><History size={18}/> Tarixçə</button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm"><LogOut size={18}/> Çıxış</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {activeTab === 'lobby' && (
            <>
              <div className="relative h-64 md:h-96 rounded-[2.5rem] overflow-hidden group border border-white/10">
                <img 
                  src="https://nocomment.az/public/cloud/2025/05/nocomment_3d7c39e382bc7e7f6ce4797757c5f09f_x6yr2gkvlqsp9nbaw1e4.jpg" 
                  alt=" Tiflis Kazino"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                  <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter leading-none mb-4">Tiflis<br/><span className="text-amber-500 text-xl md:text-2xl not-italic uppercase tracking-[0.4em]">Kazino</span></h2>
                  <button onClick={() => setActiveTab('slots')} className="w-fit px-8 py-3 bg-amber-500 text-black font-black rounded-xl hover:bg-white transition">İNDİ OYNA</button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 overflow-hidden relative">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-amber-500 font-bold whitespace-nowrap z-10 bg-[#05070a] pr-4"><TrendingUp size={18}/> CANLI:</div>
                  <div className="flex gap-12 animate-marquee whitespace-nowrap text-sm font-medium italic text-slate-300">
                    <span>User_442: <span className="text-green-500">450 ₼</span></span>
                    <span>Player_01: <span className="text-green-500">1,200 ₼</span></span>
                    <span>Vaqif77: <span className="text-green-500">80 ₼</span></span>
                    <span>Aysel_M: <span className="text-green-500">2,500 ₼</span></span>
                    <span>Natiq_90: <span className="text-green-500">110 ₼</span></span>
                    <span>CasinoKing: <span className="text-green-500">3,400 ₼</span></span>
                  </div>
                </div>
              </div>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-amber-500" size={20} />
                  <h3 className="text-lg font-black uppercase tracking-widest">Top Oyunlar</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                  {CASINO_IMAGES.map((game) => (
                    <div key={game.id} className="group relative aspect-[4/5] bg-slate-900 rounded-xl border border-white/5 overflow-hidden cursor-pointer">
                       <img src={game.img} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={game.title}/>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                       <div className="absolute bottom-3 left-3 right-3 text-[11px] font-bold text-white truncate">{game.title}</div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'slots' && (
            <div className="max-w-4xl mx-auto py-6 animate-in slide-in-from-bottom-10">
               <div className="bg-[#10141d] p-8 md:p-12 rounded-[3rem] border-8 border-[#1a1f2b] shadow-2xl text-center relative">
                  <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                     {reels.map((s, i) => (
                        <div key={i} className={`h-32 md:h-48 bg-[#05070a] rounded-2xl flex items-center justify-center text-5xl md:text-7xl shadow-inner border border-white/5 ${isSpinning ? 'animate-bounce' : ''}`}>{s}</div>
                     ))}
                  </div>
                  <button onClick={spinSlots} disabled={isSpinning} className="w-full py-5 rounded-2xl bg-amber-500 text-black text-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                    {isSpinning ? '...' : 'SPIN'}
                  </button>
                  {lastWin > 0 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-2 rounded-full font-black animate-bounce">+ {lastWin} ₼</div>}
               </div>
            </div>
          )}
        </main>

        <footer className="p-6 border-t border-white/5 bg-black/50 text-[10px] text-slate-500 flex justify-between items-center">
           <div className="flex items-center gap-4"><ShieldCheck size={14} className="text-green-500"/> <span>Licensed by Curacao</span></div>
           <p>© 2026 TIFLIS CASINO. 18+</p>
        </footer>
      </div>

      {isDepositOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#10141d] w-full max-w-md rounded-[2.5rem] border border-white/10 p-8 relative">
            <button className="absolute top-6 right-6 text-slate-500" onClick={() => {setIsDepositOpen(false); setStep(1);}}><X size={24}/></button>
            <h2 className="text-2xl font-black mb-6 italic">DEP<span className="text-amber-500">OZIT</span></h2>
            {step === 1 ? (
              <div className="space-y-6">
                 <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Məbləğ" className="w-full bg-[#05070a] border border-white/10 rounded-2xl py-4 px-6 text-3xl font-mono text-amber-500 outline-none" />
                 <button onClick={() => setStep(2)} className="w-full py-4 bg-amber-500 text-black font-black rounded-xl">DAVAM ET</button>
              </div>
            ) : (
              <div className="space-y-4">
                 <div className="p-6 bg-[#05070a] rounded-2xl border border-white/10 space-y-4">
                    <input className="w-full bg-transparent text-xl font-mono outline-none border-b border-white/10 pb-2" placeholder="KART NÖMRƏSİ" />
                 </div>
                 <button onClick={() => { setStep(1); setIsDepositOpen(false); setBalance(prev => prev + Number(amount)); }} className="w-full py-4 bg-green-600 text-white font-black rounded-xl">TƏSDİQLƏ</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CANLI DƏSTƏK KOMPONENTİ */}
      <TawkMessengerReact
          propertyId="697238fd0938061981969133"
          widgetId="1jfj2t7sb"
      />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}

export default App;