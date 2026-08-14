"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  BookOpen,
  LayoutDashboard,
  Home as HomeIcon,
  MessageSquare,
  ChevronRight,
  Zap,
} from "lucide-react";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

export default function EcoSimApp() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "materi" | "webcomic" | "home">("dashboard");

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
      text: "Halo Menteri! Inflasi kita sedang gawat di angka 12.0%. Apa rencana tindakan Anda terhadap suku bunga dan pajak?",
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
      let newInflation = 12.0 - (interestRate - 5.0) * 0.8 - (taxRate - 10.0) * 0.3;
      let newGdp = 5.0 - (interestRate - 5.0) * 0.4 - (taxRate - 10.0) * 0.2;

      newInflation = Math.max(1.5, Math.min(25.0, Number(newInflation.toFixed(1))));
      newGdp = Math.max(-3.0, Math.min(12.0, Number(newGdp.toFixed(1))));

      setInflation(newInflation);
      setGdpGrowth(newGdp);
      setIsSimulating(false);
      setLastAction(`Simulasi Berhasil: Suku Bunga ${interestRate}% & Pajak ${taxRate}%`);

      let mentorResponse = "";
      if (interestRate >= 10) {
        mentorResponse = `Langkah berani, Pak Menteri! Suku bunga tinggi (${interestRate}%) akan menekan laju inflasi menjadi ${newInflation}%. Namun perhatikan pertumbuhan ekonomi (${newGdp}%).`;
      } else if (interestRate <= 4) {
        mentorResponse = `Suku bunga rendah (${interestRate}%) memicu pertumbuhan (${newGdp}%), tapi inflasimelonjak ke ${newInflation}%! Hati-hati!`;
      } else {
        mentorResponse = `Kebijakan suku bunga (${interestRate}%) dan pajak (${taxRate}%) diperbarui. Inflasi kini ${newInflation}% dengan pertumbuhan GDP ${newGdp}%.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: mentorResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputMessage;
    setInputMessage("");

    setTimeout(() => {
      let aiText = `Analisis kebijakan: '${currentInput}'. Untuk mengendalikan inflasi, kita bisa menaikkan suku bunga acuan. Mari atur slider di panel kebijakan!`;
      if (currentInput.toLowerCase().includes("inflasi")) {
        aiText = "Inflasi terjadi saat jumlah uang beredar terlalu banyak dibanding ketersediaan barang. Gunakan suku bunga tinggi untuk mengerem laju kredit!";
      } else if (currentInput.toLowerCase().includes("pajak") || currentInput.toLowerCase().includes("tax")) {
        aiText = "Kebijakan fiskal melalui penyesuaian pajak berpengaruh langsung pada daya beli masyarakat dan pendapatan negara.";
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
    <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] font-serif flex flex-col selection:bg-[#fae500]">
      {/* Top Banner / Navbar - Webcomic Modern Brutalism Style */}
      <header className="border-b-4 border-[#1c1b1b] bg-[#094cb2] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#fae500] text-[#1c1b1b] p-2 border-2 border-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]">
              <Zap className="w-6 h-6 fill-[#1c1b1b]" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                EASYNOMICS
                <span className="bg-[#fe6b00] text-xs font-label px-2 py-0.5 border border-[#1c1b1b] text-white shadow-[1px_1px_0px_0px_#1c1b1b]">
                  WEBCOMIC PLATFORM
                </span>
              </h1>
              <p className="font-label text-xs text-[#d9e2ff] font-medium hidden sm:block">
                Interaktif, Visual & Real-Time Macroeconomic Simulator
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-1.5 font-label font-bold text-xs uppercase border-2 border-[#1c1b1b] transition-all flex items-center gap-1.5 ${
                activeTab === "dashboard"
                  ? "bg-[#fae500] text-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]"
                  : "bg-white text-[#1c1b1b] hover:bg-[#f0eded]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("materi")}
              className={`px-3 py-1.5 font-label font-bold text-xs uppercase border-2 border-[#1c1b1b] transition-all flex items-center gap-1.5 ${
                activeTab === "materi"
                  ? "bg-[#fae500] text-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]"
                  : "bg-white text-[#1c1b1b] hover:bg-[#f0eded]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Daftar Materi</span>
            </button>
            <button
              onClick={() => setActiveTab("webcomic")}
              className={`px-3 py-1.5 font-label font-bold text-xs uppercase border-2 border-[#1c1b1b] transition-all flex items-center gap-1.5 ${
                activeTab === "webcomic"
                  ? "bg-[#fae500] text-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]"
                  : "bg-white text-[#1c1b1b] hover:bg-[#f0eded]"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden md:inline">Komik 1.1</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        {/* TAB 1: DASHBOARD SIMULATOR */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Top Indicator Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-3 border-[#1c1b1b] shadow-[4px_4px_0px_0px_#1c1b1b] bg-white">
                <CardHeader className="bg-[#f0eded] border-b-2 border-[#1c1b1b] pb-2">
                  <CardDescription className="flex items-center justify-between font-label font-bold text-xs uppercase text-[#1c1b1b]">
                    Tingkat Inflasi
                    <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="font-heading text-3xl font-black text-[#ba1a1a]">
                    {inflation}%
                  </div>
                  <p className="font-label text-xs mt-1 text-[#434653]">
                    Target Nasional: 2.0% - 4.0%
                  </p>
                  <div className="mt-2">
                    <Badge variant={inflation > 8 ? "destructive" : "success"}>
                      {inflation > 8 ? "Waspada Tinggi" : "Stabil"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-3 border-[#1c1b1b] shadow-[4px_4px_0px_0px_#1c1b1b] bg-white">
                <CardHeader className="bg-[#f0eded] border-b-2 border-[#1c1b1b] pb-2">
                  <CardDescription className="flex items-center justify-between font-label font-bold text-xs uppercase text-[#1c1b1b]">
                    Pertumbuhan GDP
                    <TrendingUp className="w-4 h-4 text-[#094cb2]" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="font-heading text-3xl font-black text-[#094cb2]">
                    {gdpGrowth}%
                  </div>
                  <p className="font-label text-xs mt-1 text-[#434653]">
                    Proyeksi Tahunan Kuartal III
                  </p>
                  <div className="mt-2">
                    <Badge variant="default">Ekspansi Ekonomis</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-3 border-[#1c1b1b] shadow-[4px_4px_0px_0px_#1c1b1b] bg-white">
                <CardHeader className="bg-[#f0eded] border-b-2 border-[#1c1b1b] pb-2">
                  <CardDescription className="flex items-center justify-between font-label font-bold text-xs uppercase text-[#1c1b1b]">
                    Suku Bunga Acuan
                    <Landmark className="w-4 h-4 text-[#fe6b00]" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="font-heading text-3xl font-black text-[#fe6b00]">
                    {interestRate}%
                  </div>
                  <p className="font-label text-xs mt-1 text-[#434653]">
                    Instrumen Kebijakan Moneter
                  </p>
                  <div className="mt-2">
                    <Badge variant="secondary">Moneter Kebijakan</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-3 border-[#1c1b1b] shadow-[4px_4px_0px_0px_#1c1b1b] bg-white">
                <CardHeader className="bg-[#f0eded] border-b-2 border-[#1c1b1b] pb-2">
                  <CardDescription className="flex items-center justify-between font-label font-bold text-xs uppercase text-[#1c1b1b]">
                    Pajak Penghasilan (PPh)
                    <Percent className="w-4 h-4 text-[#695f00]" />
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="font-heading text-3xl font-black text-[#1c1b1b]">
                    {taxRate}%
                  </div>
                  <p className="font-label text-xs mt-1 text-[#434653]">
                    Instrumen Kebijakan Fiskal
                  </p>
                  <div className="mt-2">
                    <Badge variant="accent">Fiskal Negara</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Policy Controls Panel (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="border-3 border-[#1c1b1b] shadow-[6px_6px_0px_0px_#1c1b1b] bg-white">
                  <CardHeader className="bg-[#094cb2] text-white border-b-3 border-[#1c1b1b]">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Sliders className="w-5 h-5" />
                        Ruang Kendali Kebijakan Menteri
                      </CardTitle>
                      <span className="bg-[#fae500] text-[#1c1b1b] font-label text-xs font-bold px-2 py-0.5 border border-[#1c1b1b]">
                        Simulasi Makro
                      </span>
                    </div>
                    <CardDescription className="text-[#d9e2ff]">
                      Atur instrumen suku bunga moneter dan tarif pajak fiskal untuk menyeimbangkan inflasi & pertumbuhan.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    {/* Interest Rate Slider */}
                    <div className="p-4 border-2 border-[#1c1b1b] bg-[#fcf9f8] shadow-[3px_3px_0px_0px_#1c1b1b] space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="font-label font-bold text-sm uppercase text-[#1c1b1b] flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-[#094cb2]" />
                          Suku Bunga Bank Sentral: <span className="text-[#094cb2] font-heading font-extrabold text-lg">{interestRate}%</span>
                        </label>
                        <span className="font-label text-xs text-[#737784]">Skala: 1.0% - 20.0%</span>
                      </div>
                      <Slider
                        value={[interestRate]}
                        min={1.0}
                        max={20.0}
                        step={0.5}
                        onValueChange={(val) => setInterestRate(val[0])}
                      />
                      <p className="font-serif text-xs text-[#434653] italic">
                        Menaikkan suku bunga mempermahal pinjaman & menekan arus uang (mengerem inflasi).
                      </p>
                    </div>

                    {/* Tax Rate Slider */}
                    <div className="p-4 border-2 border-[#1c1b1b] bg-[#fcf9f8] shadow-[3px_3px_0px_0px_#1c1b1b] space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="font-label font-bold text-sm uppercase text-[#1c1b1b] flex items-center gap-2">
                          <Percent className="w-4 h-4 text-[#fe6b00]" />
                          Tarif Pajak Efektif: <span className="text-[#fe6b00] font-heading font-extrabold text-lg">{taxRate}%</span>
                        </label>
                        <span className="font-label text-xs text-[#737784]">Skala: 5.0% - 35.0%</span>
                      </div>
                      <Slider
                        value={[taxRate]}
                        min={5.0}
                        max={35.0}
                        step={0.5}
                        onValueChange={(val) => setTaxRate(val[0])}
                      />
                      <p className="font-serif text-xs text-[#434653] italic">
                        Pajak tinggi mengurangi anggaran belanja publik namun memperkuat saldo kas pemerintah.
                      </p>
                    </div>

                    {/* Simulation Execution */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <Button
                        onClick={handleApplyPolicy}
                        disabled={isSimulating}
                        variant="action"
                        size="lg"
                        className="w-full sm:w-auto flex items-center justify-center gap-2"
                      >
                        {isSimulating ? (
                          <>
                            <RotateCcw className="w-5 h-5 animate-spin" />
                            Mengkalkulasi Simulasi...
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 fill-current" />
                            Terapkan Kebijakan Baru
                          </>
                        )}
                      </Button>

                      {lastAction && (
                        <div className="flex items-center gap-2 font-label text-xs text-[#094cb2] font-bold bg-[#e7ebff] p-2 border border-[#1c1b1b]">
                          <CheckCircle2 className="w-4 h-4 text-[#094cb2]" />
                          {lastAction}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Mentor Comic Chat Panel (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="border-3 border-[#1c1b1b] shadow-[6px_6px_0px_0px_#1c1b1b] bg-white flex flex-col h-[520px]">
                  <CardHeader className="bg-[#fe6b00] text-white border-b-3 border-[#1c1b1b]">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Bot className="w-5 h-5" />
                        AI Mentor Ekonomi
                      </CardTitle>
                      <span className="bg-[#fae500] text-[#1c1b1b] font-label text-xs font-bold px-2 py-0.5 border border-[#1c1b1b]">
                        Live Assistance
                      </span>
                    </div>
                    <CardDescription className="text-white/90">
                      Tanyakan konsep makro, dampak inflasi, atau saran keputusan menteri!
                    </CardDescription>
                  </CardHeader>

                  {/* Chat Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcf9f8]">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${
                          msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 flex items-center justify-center border-2 border-[#1c1b1b] shrink-0 font-label font-bold text-xs ${
                            msg.sender === "user"
                              ? "bg-[#fae500] text-[#1c1b1b]"
                              : "bg-[#094cb2] text-white"
                          }`}
                        >
                          {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>

                        <div
                          className={`max-w-[80%] p-3 border-2 border-[#1c1b1b] shadow-[3px_3px_0px_0px_#1c1b1b] text-sm ${
                            msg.sender === "user"
                              ? "bg-[#fae500] text-[#1c1b1b] font-label font-medium"
                              : "bg-white text-[#1c1b1b] speech-bubble font-serif"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className="block font-label text-[10px] text-[#737784] mt-1 text-right">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div ref={chatBottomRef} />
                  </CardContent>

                  {/* Chat Input */}
                  <div className="p-3 border-t-3 border-[#1c1b1b] bg-white">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Ketik pertanyaan untuk AI Mentor..."
                        className="flex-1"
                      />
                      <Button type="submit" variant="default" size="icon" className="shrink-0">
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DAFTAR MATERI */}
        {activeTab === "materi" && (
          <div className="space-y-6">
            <div className="p-6 border-3 border-[#1c1b1b] bg-[#094cb2] text-white shadow-[6px_6px_0px_0px_#1c1b1b]">
              <h2 className="font-heading text-3xl font-black uppercase tracking-tight">
                Daftar Materi Webcomic Easynomics
              </h2>
              <p className="font-label text-sm text-[#d9e2ff] mt-1">
                Kurikulum interaktif visual yang membedah teori ekonomi makro menjadi kisah visual intuitif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-3 border-[#1c1b1b] shadow-[4px_4px_0px_0px_#1c1b1b] bg-white">
                <CardHeader className="bg-[#fe6b00] text-white border-b-2 border-[#1c1b1b]">
                  <Badge variant="accent" className="w-fit mb-2">Bab 1.1</Badge>
                  <CardTitle className="text-white">Misteri Uang Beredar & Inflasi</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <p className="font-serif text-sm text-[#434653]">
                    Pelajari mengapa mencetak uang secara sembarangan memicu kenaikan harga pasar global melalui cerita naratif interaktif.
                  </p>
                  <Button
                    onClick={() => setActiveTab("webcomic")}
                    variant="action"
                    className="w-full flex items-center justify-between"
                  >
                    Buka Komik Interaktif
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-3 border-[#1c1b1b] shadow-[4px_4px_0px_0px_#1c1b1b] bg-white">
                <CardHeader className="bg-[#094cb2] text-white border-b-2 border-[#1c1b1b]">
                  <Badge variant="accent" className="w-fit mb-2">Bab 1.2</Badge>
                  <CardTitle className="text-white">Dilema Suku Bunga Moneter</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <p className="font-serif text-sm text-[#434653]">
                    Bagaimana keputusan Bank Sentral mengubah pasar properti, kredit usaha, dan investasi masyarakat.
                  </p>
                  <Button
                    onClick={() => setActiveTab("dashboard")}
                    variant="default"
                    className="w-full flex items-center justify-between"
                  >
                    Uji di Simulator
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-3 border-[#1c1b1b] shadow-[4px_4px_0px_0px_#1c1b1b] bg-white">
                <CardHeader className="bg-[#695f00] text-white border-b-2 border-[#1c1b1b]">
                  <Badge variant="accent" className="w-fit mb-2">Bab 2.1</Badge>
                  <CardTitle className="text-white">Fiskal & Anggaran Negara</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <p className="font-serif text-sm text-[#434653]">
                    Mengurai APBN, kebijakan subsidi, dan bagaimana pajak mendanai infrastruktur nasional.
                  </p>
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    Segera Hadir
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 3: WEBCOMIC INTERAKTIF 1.1 */}
        {activeTab === "webcomic" && (
          <div className="space-y-6">
            <Card className="border-3 border-[#1c1b1b] shadow-[6px_6px_0px_0px_#1c1b1b] bg-white">
              <CardHeader className="bg-[#fae500] text-[#1c1b1b] border-b-3 border-[#1c1b1b]">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="default" className="mb-2">Konten Interaktif 1.1</Badge>
                    <CardTitle className="text-[#1c1b1b] text-2xl">
                      Misteri Inflasi: Ketika Harga Nasi Goreng Melonjak
                    </CardTitle>
                  </div>
                  <Button
                    onClick={() => setActiveTab("dashboard")}
                    variant="action"
                    className="hidden sm:flex items-center gap-1"
                  >
                    Coba Simulator
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Comic Panels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Panel 1 */}
                  <div className="border-3 border-[#1c1b1b] p-4 bg-[#fcf9f8] shadow-[4px_4px_0px_0px_#1c1b1b] space-y-3">
                    <div className="bg-[#fe6b00] text-white font-label font-bold px-2 py-1 text-xs border border-[#1c1b1b] w-fit">
                      PANEL 1: WARUNG PAK BUDI
                    </div>
                    <p className="font-serif text-base text-[#1c1b1b]">
                      "Kemarin sepiring Nasi Goreng Spesial harganya Rp 15.000. Hari ini kenapa jadi Rp 25.000, Pak Budi?!"
                    </p>
                    <div className="p-3 bg-white border-2 border-[#1c1b1b] speech-bubble font-serif text-sm">
                      <span className="font-bold text-[#094cb2]">Pak Budi:</span> "Harga beras naik, minyak goreng naik, telur juga mahal! Saya terpaksa menaikkan harga agar tidak bangkrut!"
                    </div>
                  </div>

                  {/* Panel 2 */}
                  <div className="border-3 border-[#1c1b1b] p-4 bg-[#fcf9f8] shadow-[4px_4px_0px_0px_#1c1b1b] space-y-3">
                    <div className="bg-[#094cb2] text-white font-label font-bold px-2 py-1 text-xs border border-[#1c1b1b] w-fit">
                      PANEL 2: PENJELASAN AI MENTOR
                    </div>
                    <p className="font-serif text-base text-[#1c1b1b]">
                      Itulah fenomena <strong className="text-[#094cb2]">INFLASI</strong>! Kenaikan harga barang dan jasa secara umum dan terus menerus dalam jangka waktu tertentu.
                    </p>
                    <div className="p-3 bg-[#fae500] border-2 border-[#1c1b1b] font-label text-xs font-bold text-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]">
                      💡 FAKTA KUNCI: Inflasi mengurangi daya beli uang Anda!
                    </div>
                  </div>
                </div>

                {/* Call to action inside comic */}
                <div className="p-6 border-3 border-[#1c1b1b] bg-[#e7ebff] shadow-[4px_4px_0px_0px_#1c1b1b] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-heading text-lg font-extrabold uppercase text-[#094cb2]">
                      Siap Mengendalikan Inflasi Ini?
                    </h4>
                    <p className="font-serif text-sm text-[#434653]">
                      Masuk ke Ruang Kebijakan Menteri dan sesuaikan suku bunga untuk meredam inflasi Pak Budi!
                    </p>
                  </div>
                  <Button onClick={() => setActiveTab("dashboard")} variant="action" size="lg">
                    Buka Simulator Menteri
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-[#1c1b1b] bg-[#1c1b1b] text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-label text-xs text-[#c3c6d5]">
          <div className="flex items-center gap-2">
            <span className="bg-[#fae500] text-[#1c1b1b] px-2 py-0.5 font-bold border border-white">
              EASYNOMICS
            </span>
            <span>Interactive Webcomic Platform &copy; 2026</span>
          </div>
          <div>Stitch Design System: Modern Brutalism Webcomic Edition</div>
        </div>
      </footer>
    </div>
  );
}
