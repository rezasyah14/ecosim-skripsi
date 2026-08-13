"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Sliders,
  Send,
  Bot,
  User,
  ShieldAlert,
  Sparkles,
  Activity,
  Landmark,
  Percent,
  RotateCcw,
  Play,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export default function EcoSimDashboard() {
  // Economic State
  const [inflation, setInflation] = useState<number>(12.0);
  const [gdpGrowth, setGdpGrowth] = useState<number>(5.0);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [taxRate, setTaxRate] = useState<number>(15.0);

  // Simulation Feedback State
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Halo Menteri! Inflasi kita sedang gawat. Apa yang harus kita lakukan dengan suku bunga?",
      timestamp: "Just now",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle policy simulation
  const handleApplyPolicy = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Economic logic simulation mock
      let newInflation = 12.0 - (interestRate - 5.0) * 0.8 - (taxRate - 10.0) * 0.3;
      let newGdp = 5.0 - (interestRate - 5.0) * 0.4 - (taxRate - 10.0) * 0.2;

      newInflation = Math.max(1.5, Math.min(25.0, Number(newInflation.toFixed(1))));
      newGdp = Math.max(-3.0, Math.min(12.0, Number(newGdp.toFixed(1))));

      setInflation(newInflation);
      setGdpGrowth(newGdp);
      setIsSimulating(false);
      setLastAction(`Kebijakan Diterapkan: Suku Bunga ${interestRate}% & Pajak ${taxRate}%`);

      // AI Mentor automatic comment on policy change
      let mentorResponse = "";
      if (interestRate >= 10) {
        mentorResponse = `Keputusan tegas, Pak Menteri! Menaikkan suku bunga ke ${interestRate}% akan meredam laju inflasi. Namun perhatikan efek sampingnya pada pinjaman usaha.`;
      } else if (interestRate <= 4) {
        mentorResponse = `Suku bunga rendah (${interestRate}%) akan memicu kredit usaha, tetapi berisiko mendorong inflasi semakin tinggi!`;
      } else {
        mentorResponse = `Kebijakan suku bunga (${interestRate}%) dan pajak (${taxRate}%) telah diperbarui. Mari kita pantau respon pasar dalam 1 kuartal ke depan.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: mentorResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsgText = inputMessage.trim();
    const userMsgObj: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsgObj]);
    setInputMessage("");

    // Generate intelligent AI mentor response
    setTimeout(() => {
      let aiText = "";
      const lower = userMsgText.toLowerCase();

      if (lower.includes("suku bunga") || lower.includes("bunga")) {
        aiText = `Untuk meredam inflasi ${inflation}%, menaikkan suku bunga bank sentral (saat ini ${interestRate}%) adalah langkah klasik. Setiap kenaikan 1% dapat menekan inflasi sekitar 0.8%.`;
      } else if (lower.includes("pajak") || lower.includes("tax")) {
        aiText = `Tingkat pajak saat ini di ${taxRate}%. Penyesuaian pajak langsung mempengaruhi daya beli masyarakat dan pendapatan belanja negara.`;
      } else if (lower.includes("inflasi")) {
        aiText = `Inflasi kita berada di angka ${inflation}%. Target aman biasanya 2% - 4%. Kita perlu mengombinasikan ketatnya moneter dan efisiensi fiskal!`;
      } else if (lower.includes("pdb") || lower.includes("pertumbuhan")) {
        aiText = `Pertumbuhan PDB saat ini ${gdpGrowth}%. Jika kita menaikkan suku bunga terlalu tinggi, pertumbuhan bisnis bisa terkoreksi turun.`;
      } else {
        aiText = `Saran saya Pak Menteri: Fokus utama kita saat ini adalah menurunkan inflasi (${inflation}%) tanpa membuat pertumbuhan PDB (${gdpGrowth}%) anjlok ke zona negatif. Ada instruksi khusus?`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: aiText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* ================= PANEL KIRI: DASHBOARD MENTERI (70%) ================= */}
      <div className="flex-1 w-[70%] flex flex-col h-full border-r border-slate-800/80 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 lg:p-8 space-y-8">
        
        {/* HEADER DASHBOARD */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">
                <Landmark className="w-3.5 h-3.5 mr-1" /> Kabinet Ekonomi
              </Badge>
              <span className="text-xs text-slate-500 font-mono">ECOSIM-v1.0</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
              Pusat Kendali Makroekonomi
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Kelola instrumen moneter dan fiskal negara untuk menjaga stabilitas pasar.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInflation(12.0);
                setGdpGrowth(5.0);
                setInterestRate(7.5);
                setTaxRate(15.0);
                setLastAction(null);
              }}
              className="text-xs border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Indikator
            </Button>
            <Button
              onClick={handleApplyPolicy}
              disabled={isSimulating}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-4 shadow-lg shadow-blue-600/25"
            >
              {isSimulating ? (
                <>
                  <Activity className="w-4 h-4 mr-1 animate-spin" /> Menganalisis...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-1 fill-current" /> Simulasi Kuartal
                </>
              )}
            </Button>
          </div>
        </div>

        {/* STATUS KARTU INDIKATOR UTAMA (TOP CARDS) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" /> Indikator Status Negara
            </h2>
            <span className="text-xs text-slate-500">Pembaruan Real-time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* KARTU 1: TINGKAT INFLASI */}
            <Card className="relative overflow-hidden border-slate-800/80 bg-slate-900/60 backdrop-blur-md hover:border-red-500/40 transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">
                  Tingkat Inflasi
                </CardTitle>
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  {/* TEKS WARNA MERAH */}
                  <span className="text-4xl font-extrabold tracking-tight text-red-500 drop-shadow-sm">
                    {inflation.toFixed(1)}%
                  </span>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Waspada Tinggi
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 inline shrink-0" />
                  Target aman nasional berada di bawah 4.0%
                </p>
              </CardContent>
            </Card>

            {/* KARTU 2: PERTUMBUHAN PDB */}
            <Card className="relative overflow-hidden border-slate-800/80 bg-slate-900/60 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">
                  Pertumbuhan PDB
                </CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  {/* TEKS WARNA HIJAU */}
                  <span className="text-4xl font-extrabold tracking-tight text-emerald-400 drop-shadow-sm">
                    {gdpGrowth > 0 ? `+${gdpGrowth.toFixed(1)}%` : `${gdpGrowth.toFixed(1)}%`}
                  </span>
                  <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ekspansif
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Pertumbuhan sektor riil dan konsumsi rumah tangga tetap stabil.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AREA KEBIJAKAN NEGARA (SLIDERS) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" /> Kebijakan Negara
            </h2>
            {lastAction && (
              <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-0.5">
                {lastAction}
              </span>
            )}
          </div>

          <Card className="border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-6 space-y-8">
            {/* SLIDER 1: SUKU BUNGA BANK SENTRAL */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-200 block">
                      Suku Bunga Bank Sentral
                    </label>
                    <span className="text-xs text-slate-400">
                      Instrumen Moneter (Mengendalikan laju kredit & inflasi)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">
                  <span className="text-lg font-bold text-blue-400 font-mono">
                    {interestRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              <Slider
                value={[interestRate]}
                min={0.0}
                max={20.0}
                step={0.5}
                onValueChange={(val) => setInterestRate(val[0])}
                className="w-full cursor-pointer"
              />

              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>0% (Stimulus Ekstrem)</span>
                <span>10% (Netral)</span>
                <span>20% (Ketat Maksimal)</span>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-6 space-y-3">
              {/* SLIDER 2: TINGKAT PAJAK */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-cyan-500/10 text-cyan-400">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-200 block">
                      Tingkat Pajak
                    </label>
                    <span className="text-xs text-slate-400">
                      Instrumen Fiskal (Pendapatan kas negara & penerimaan)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg">
                  <span className="text-lg font-bold text-cyan-400 font-mono">
                    {taxRate.toFixed(1)}%
                  </span>
                </div>
              </div>

              <Slider
                value={[taxRate]}
                min={0.0}
                max={50.0}
                step={1.0}
                onValueChange={(val) => setTaxRate(val[0])}
                className="w-full cursor-pointer"
              />

              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>0% (Surga Pajak)</span>
                <span>25% (Standar)</span>
                <span>50% (Pajak Tinggi)</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleApplyPolicy}
                disabled={isSimulating}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md shadow-blue-500/20"
              >
                Terapkan Perubahan Kebijakan
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* ================= PANEL KANAN: AI MENTOR CHAT PANEL (30%) ================= */}
      <div className="w-[30%] min-w-[320px] max-w-[420px] flex flex-col h-full bg-slate-900/90 border-l border-slate-800">
        
        {/* HEADER AI MENTOR */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-md shadow-blue-500/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-slate-100 text-sm">Budi - Staf Ahli Ekonomi</h3>
              </div>
              <p className="text-xs text-slate-400">Penasihat Senior Makroekonomi</p>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        </div>

        {/* RIWAYAT CHAT (MIDDLE AREA) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                {msg.sender === "ai" ? (
                  <>
                    <Bot className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-semibold text-slate-400">Budi</span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-semibold text-slate-400">Menteri</span>
                    <User className="w-3.5 h-3.5 text-slate-300" />
                  </>
                )}
                <span className="text-[10px] text-slate-600 ml-1">{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* AREA INPUT CHAT (BOTTOM AREA) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Tanyakan saran kebijakan pada Budi..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-slate-900 border-slate-700 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus-visible:ring-blue-500 focus-visible:ring-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputMessage.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white shrink-0 shadow-md shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Kirim</span>
            </Button>
          </form>
          <p className="text-[10px] text-slate-500 text-center mt-2">
            AI Advisor memberikan analisis berbasis model simulasi makroekonomi.
          </p>
        </div>
      </div>
    </div>
  );
}
