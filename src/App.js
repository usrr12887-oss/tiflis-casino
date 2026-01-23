import React, { useState, useEffect, useMemo } from "react";
import {
  Menu, X, Home, Wallet, ArrowUpRight, ArrowDownLeft, Search, Info, Upload
} from "lucide-react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const CASINO_IMAGES = [
  { id: 1, title: "Rich Fruits", category: "slots", img: "https://butakazino1.com/game-previews/LhnNtvoeyOc6k4ry9n5Y1nYUQbNWrx7InEuyuvGt.png" },
  { id: 2, title: "Sevens on Fire", category: "slots", img: "https://butakazino1.com/game-previews/6zRQT1GXI1XfOyDm0Begzvnhp2kCzXrFGCh8zeKw.png" },
  { id: 3, title: "Hot Sevens", category: "slots", img: "https://butakazino1.com/game-previews/p9KjbITI6iMzJJ67u9Y7G2BDZKv40iusYVmCdJYu.png" },
  { id: 4, title: "Fire Rage", category: "slots", img: "https://butakazino1.com/game-previews/AyiItayuAVUQiLKi7sPMocsr6vU1Z0NwgtnilhN2.png" },
  { id: 5, title: "Extra Super 7", category: "slots", img: "https://butakazino1.com/game-previews/OGXGGadnU0H8adoFwNn8l2EtegAuitWurtKOg5si.png" },
  { id: 6, title: "Sizzling Hot", category: "slots", img: "https://butakazino1.com/game-previews/5wbH7oHXrZwLKwgUvpRWMVR8ed5DVcqWm1fnRiNe.png" },
  { id: 7, title: "Golden Scatter", category: "crash", img: "https://butakazino1.com/game-previews/67be3b1e6a1ab.png" },
  { id: 8, title: "Hot Sevens Extreme", category: "slots", img: "https://butakazino1.com/game-previews/ANP8e6Q6THyoTI2FOi4dpYqKWjwVgDTAlePdx3nY.png" },
  { id: 9, title: "Lady Luck", category: "classic", img: "https://butakazino1.com/game-previews/HBYVBRQfSgFRUlMqWsH0F0C26b140FWNDt70WvXv.png" },
  { id: 10, title: "Ultra 7 Hot", category: "slots", img: "https://butakazino1.com/game-previews/6uk9XcHC4Ur7GI885sIpyIHorP1ZghISECMkAzlj.png" },
  { id: 11, title: "Always Cherry", category: "slots", img: "https://butakazino1.com/game-previews/67be3b1e67753.png" },
  { id: 12, title: "Aztec Century", category: "slots", img: "https://butakazino1.com/game-previews/3gH0H1F5U6yL1ATsuqXlZMs9CdbwRWOtFteg3DPb.png" },
  { id: 13, title: "Hot Slot", category: "slots", img: "https://butakazino1.com/game-previews/67be3b1e68c87.png" },
  { id: 14, title: "Fortune Star", category: "slots", img: "https://butakazino1.com/game-previews/fmB0l9c2PP4FDC4p8FlKqA7lBMyPpgROLNH1w0tX.png" },
  { id: 15, title: "Simple Diamond", category: "slots", img: "https://butakazino1.com/game-previews/TKN82rBNvao25fHXoClZl8G3wb5hnrfDDyYFjOgy.png" },
  { id: 16, title: "Joker's Fruit", category: "slots", img: "https://butakazino1.com/game-previews/DzKD2CN4oq8VttMHZjqsLn9DHAuD2Ot1peStzGB1.png" },
  { id: 17, title: "Hit Jewels", category: "slots", img: "https://butakazino1.com/game-previews/67be3b1e999e1.png" },
  { id: 18, title: "King of Jewels", category: "classic", img: "https://butakazino1.com/game-previews/67be3b1e57ee9.png" },
  { id: 19, title: "Roll of Ramses", category: "slots", img: "https://butakazino1.com/game-previews/CZ1HFhyUV7dBfmvbnbA59p0yeER3ePGFxiEsjBVr.jpg" },
  { id: 20, title: "Scatter Wins", category: "slots", img: "https://butakazino1.com/game-previews/67be3b1e6b720.png" },
  { id: 21, title: "Tropical Fruits", category: "slots", img: "https://butakazino1.com/game-previews/67be3b1e5d42a.png" },
  
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [aboutOpen, setAboutOpen] = useState(false);

  const [balance, setBalance] = useState(0);
  const [jackpot, setJackpot] = useState(1254780);
  const [searchQuery, setSearchQuery] = useState("");

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  /* DEPOSIT STATES */
  const [depositType, setDepositType] = useState("card");
  const [depositAmount, setDepositAmount] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  /* WITHDRAW STATES */
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawCard, setWithdrawCard] = useState("");

  useEffect(() => {
    const t = setInterval(() => setJackpot(j => j + Math.floor(Math.random() * 5)), 3000);
    return () => clearInterval(t);
  }, []);

  const games = useMemo(() => {
    return CASINO_IMAGES.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleDeposit = () => {
    if (!user) return alert("Zəhmət olmasa əvvəl qeydiyyatdan keçin");
    if (depositType === "card") {
      if (cardNo.length < 16 || cardDate.length < 5 || cardCvv.length < 3) return alert("Kart məlumatlarını tam daxil edin");
    }
    const amt = Number(depositAmount);
    if (!amt || amt <= 0) return alert("Məbləği düzgün daxil edin");

    setBalance(b => b + amt);
    alert("Ödəniş uğurla tamamlandı!");
    setDepositOpen(false);
    resetDeposit();
  };

  const resetDeposit = () => {
    setDepositAmount(""); setCardNo(""); setCardDate(""); setCardCvv("");
  };

  const handleWithdraw = () => {
    const amt = Number(withdrawAmount);
    if (amt < 20) return alert("Minimum çıxarış 20 ₼-dır");
    if (amt > balance) return alert("Balansınızda kifayət qədər vəsait yoxdur");
    if (withdrawCard.length < 16) return alert("Kart nömrəsi 16 rəqəmli olmalıdır");

    setBalance(b => b - amt);
    alert("Çıxarış sorğusu qəbul edildi. 24 saat ərzində kartınıza köçürüləcək.");
    setWithdrawOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#05070a] text-white overflow-hidden font-sans">
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/70 z-40 lg:hidden" />}

      {/* SIDEBAR */}
      <aside className={`fixed z-50 h-full w-64 bg-[#0a0c12] p-6 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex justify-between mb-8">
          <h1 className="text-xl font-black text-amber-500 italic uppercase">Tiflis Casino</h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X /></button>
        </div>
        <div className="space-y-2">
          <button className="w-full bg-amber-500 text-black p-4 rounded-2xl font-bold flex gap-3 shadow-lg shadow-amber-500/10"><Home /> Ana səhifə</button>
          <button onClick={() => {setDepositOpen(true); setSidebarOpen(false);}} className="w-full bg-white/5 p-4 rounded-2xl flex gap-3 hover:bg-white/10 transition"><ArrowDownLeft className="text-green-500" /> Depozit</button>
          <button onClick={() => {setWithdrawOpen(true); setSidebarOpen(false);}} className="w-full bg-white/5 p-4 rounded-2xl flex gap-3 hover:bg-white/10 transition"><ArrowUpRight className="text-red-500" /> Çıxarış</button>
          <button onClick={() => {setAboutOpen(true); setSidebarOpen(false);}} className="w-full bg-white/5 p-4 rounded-2xl flex gap-3 hover:bg-white/10 transition"><Info className="text-blue-500" /> Haqqımızda</button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <header className="h-18 flex justify-between items-center px-4 md:px-8 border-b border-white/5 bg-[#05070a]/80 backdrop-blur-md">
          <button className="lg:hidden p-2 bg-white/5 rounded-lg" onClick={() => setSidebarOpen(true)}><Menu /></button>
          <div className="text-center">
            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Global Jackpot</p>
            <p className="font-black text-lg">₼ {jackpot.toLocaleString()}</p>
          </div>
          {user ? (
            <div className="bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
              <p className="text-[10px] text-slate-400 font-bold">{user.username.toUpperCase()}</p>
              <p className="text-amber-500 font-black tracking-wide">{balance.toFixed(2)} ₼</p>
            </div>
          ) : (
            <button onClick={() => setAuthOpen(true)} className="bg-amber-500 text-black px-6 py-2.5 rounded-xl font-black hover:scale-105 transition">QEYDİYYAT</button>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 pb-20">
          <div className="relative h-44 md:h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img src="https://nocomment.az/public/cloud/2025/05/nocomment_3d7c39e382bc7e7f6ce4797757c5f09f_x6yr2gkvlqsp9nbaw1e4.jpg" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black flex items-end p-8">
              <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter">İLK DEPOZİTƏ <span className="text-amber-500">100% BONUS</span></h2>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Oyun axtar..." className="w-full pl-12 p-4 bg-white/5 rounded-2xl border border-white/10 outline-none focus:border-amber-500/50" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {games.map(g => (
              <div key={g.id} className="group relative rounded-3xl overflow-hidden border border-white/5 bg-white/5 hover:border-amber-500/50 transition duration-300">
                <img src={g.img} alt={g.title} className="w-full aspect-[4/5] object-cover opacity-80 group-hover:opacity-100 transition" />
                <div className="p-3 bg-gradient-to-t from-black absolute bottom-0 w-full">
                  <p className="text-xs font-bold truncate">{g.title}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* HAQQIMIZDA MODAL */}
      {aboutOpen && (
        <div className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#10141d] p-8 rounded-[2.5rem] w-full max-w-lg border border-white/10 relative">
            <button className="absolute top-6 right-6" onClick={() => setAboutOpen(false)}><X/></button>
            <h3 className="text-2xl font-black mb-4 text-amber-500 italic">TİFLİS CASINO HAQQINDA</h3>
            <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
              <p>Tiflis Casino, 2018-ci ildən bəri onlayn oyun sahəsində etibarlı və innovativ xidmət təqdim edən platformadır. Bizim məqsədimiz istifadəçilərə ən yüksək keyfiyyətli oyun təcrübəsi və sürətli ödəniş imkanları yaratmaqdır.</p>
              <p>Kurasao lisenziyası ilə fəaliyyət göstərən platformamızda 3000-dən çox slot və canlı kazino oyunu mövcuddur. 7/24 canlı dəstək və anında çıxarış sistemi ilə oyunçularımızın məmnuniyyətini hər zaman ön planda tuturuq.</p>
              <p className="font-bold text-white italic">Uğur sizinlə olsun!</p>
            </div>
          </div>
        </div>
      )}

      {/* DEPOSIT MODAL */}
      {depositOpen && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#10141d] p-8 rounded-[2.5rem] w-full max-w-sm border border-white/10 space-y-5">
            <div className="flex justify-between items-center"><h3 className="text-xl font-black italic">BALANSI ARTIR</h3><button onClick={() => setDepositOpen(false)}><X/></button></div>
            <div className="flex bg-black p-1 rounded-2xl">
              <button onClick={() => setDepositType("card")} className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${depositType === "card" ? "bg-amber-500 text-black" : ""}`}>KARTLA ÖDƏ</button>
              <button onClick={() => setDepositType("transfer")} className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${depositType === "transfer" ? "bg-amber-500 text-black" : ""}`}>P2P TRANSFER</button>
            </div>

            {depositType === "card" ? (
              <div className="space-y-3">
                <input value={cardNo} onChange={e => setCardNo(e.target.value)} maxLength={16} placeholder="Kart nömrəsi (16 rəqəm)" className="w-full p-4 bg-black rounded-xl border border-white/5 outline-none font-mono" />
                <div className="flex gap-3">
                  <input value={cardDate} onChange={e => setCardDate(e.target.value)} maxLength={5} placeholder="AA/İİ" className="w-1/2 p-4 bg-black rounded-xl border border-white/5 outline-none font-mono" />
                  <input value={cardCvv} onChange={e => setCardCvv(e.target.value)} maxLength={3} placeholder="CVV" className="w-1/2 p-4 bg-black rounded-xl border border-white/5 outline-none font-mono" />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center space-y-2">
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Köçürmə üçün kart</p>
                <p className="text-lg font-black font-mono tracking-wider">4169 0000 1111 2222</p>
                <p className="text-[10px] text-slate-400">Ödənişi edib aşağıdakı düymə ilə qəbzi göndərin</p>
                <button className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 rounded-lg text-xs font-bold border border-dashed border-white/20"><Upload size={14}/> Qəbz yüklə</button>
              </div>
            )}

            <input value={depositAmount} onChange={e => setDepositAmount(e.target.value)} placeholder="Məbləğ (₼)" className="w-full p-4 bg-black rounded-xl border border-white/5 outline-none font-black text-amber-500 text-center text-xl" />
            <button onClick={handleDeposit} className="w-full bg-amber-500 text-black py-5 rounded-2xl font-black text-lg shadow-xl shadow-amber-500/20 active:scale-95 transition">ÖDƏNİŞİ TƏSDİQLƏ</button>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {withdrawOpen && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="bg-[#10141d] p-8 rounded-[2.5rem] w-full max-w-sm border border-white/10 space-y-5">
            <div className="flex justify-between items-center"><h3 className="text-xl font-black italic">PUL ÇIXAR</h3><button onClick={() => setWithdrawOpen(false)}><X/></button></div>
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Mövcud Balans</p>
              <p className="text-2xl font-black text-white">{balance.toFixed(2)} ₼</p>
            </div>
            <input value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} placeholder="Məbləğ (min 20 ₼)" className="w-full p-4 bg-black rounded-xl border border-white/5 outline-none" />
            <input value={withdrawCard} onChange={e => setWithdrawCard(e.target.value)} maxLength={16} placeholder="Kart nömrəsi" className="w-full p-4 bg-black rounded-xl border border-white/5 outline-none font-mono" />
            <button onClick={handleWithdraw} className="w-full bg-red-600 py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-600/20 active:scale-95 transition tracking-widest uppercase">Göndər</button>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {authOpen && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4">
          <div className="bg-[#10141d] p-8 rounded-[2.5rem] w-full max-w-xs space-y-4 border border-white/10">
            <h3 className="text-2xl font-black italic text-center">XOŞ GƏLDİNİZ</h3>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="İstifadəçi adı" className="w-full p-4 bg-black rounded-xl border border-white/5 outline-none" />
            <button onClick={() => { if(!username) return alert("Ad daxil edin"); setUser({username}); setAuthOpen(false); }} className="w-full bg-amber-500 text-black py-4 rounded-xl font-black uppercase">BAŞLA</button>
            <div className="text-center text-[10px] text-slate-500">Qeydiyyatdan keçməklə qaydaları qəbul edirsiniz.</div>
          </div>
        </div>
      )}

      <TawkMessengerReact propertyId="697238fd0938061981969133" widgetId="1jfj2t7sb" />
    </div>
  );
}
