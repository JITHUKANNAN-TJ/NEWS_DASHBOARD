import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  Search, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  Loader2, 
  ShieldCheck, 
  Clock, 
  Layers,
  ArrowUpRight,
  BookOpen
} from "lucide-react";
import { Story, Persona } from "../../types";
import { synthesizeBriefing } from "../../services/aiService";
import NeuralImage from "../Common/NeuralImage";

interface NewsNavigatorProps {
  stories: Story[];
  persona: Persona;
  onNotify: (message: string, type?: "success" | "info" | "error") => void;
  onAnalyze: (story: Story) => void;
}

const NewsNavigator: React.FC<NewsNavigatorProps> = ({ stories = [], persona, onNotify, onAnalyze }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [intelligenceReport, setIntelligenceReport] = useState<any>(null);

  const categories = ["All", "Markets", "Tech", "Economy", "Strategic"];

  const filteredStories = (stories || []).filter((story: any) => {
    const title = (story.title || "").toLowerCase();
    const desc = (story.description || "").toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || (story.category || "Strategic") === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSynthesize = async () => {
    if (filteredStories.length === 0) return onNotify("No signals detected.", "error");
    setIsSynthesizing(true);
    try {
      const report = await synthesizeBriefing(persona, filteredStories.slice(0, 10));
      setIntelligenceReport(report);
    } catch (e) {
      onNotify("Aura Offline", "error");
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 750px), 1fr))", gap: "3rem" }}>
      {/* Search & Results Area */}
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        <header>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
               <div style={{ padding: "0.6rem", borderRadius: "1rem", background: "var(--primary-gradient)", color: "white" }}>
                    <Compass size={28} />
               </div>
               <h2 className="heading" style={{ fontSize: "2.25rem", fontWeight: "900", color: "white", letterSpacing: "-0.03em" }}>Intelligence Navigator</h2>
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: "1rem", fontWeight: "600" }}>Search and analyze global business signals in real-time.</p>
        </header>

        <div className="glass-panel" style={{ padding: "2rem", borderRadius: "2.5rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ position: "relative", marginBottom: "2rem" }}>
                <Search style={{ position: "absolute", left: "1.5rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} size={20} />
                <input 
                    type="text" 
                    placeholder="Search neural signals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                        width: "100%", 
                        padding: "1.25rem 1.5rem 1.25rem 4rem", 
                        borderRadius: "1.5rem", 
                        background: "rgba(255,255,255,0.02)", 
                        border: "1px solid var(--border-subtle)", 
                        color: "white", 
                        fontWeight: "600",
                        fontSize: "1rem",
                        outline: "none"
                    }}
                />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "0.6rem 1.25rem", borderRadius: "1rem", background: activeCategory === cat ? "var(--primary-gradient)" : "none", color: activeCategory === cat ? "white" : "var(--text-dim)", border: "1px solid var(--border-subtle)", fontWeight: "900", fontSize: "0.75rem", cursor: "pointer", transition: "all 0.3s ease" }}>
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>

        {/* Tactical Stream with Clickable Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxHeight: "600px", overflowY: "auto", paddingRight: "0.5rem" }}>
            <AnimatePresence>
                {filteredStories.map((story: any) => (
                    <motion.div 
                        key={story.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.03)" }}
                        onClick={() => onAnalyze(story)}
                        className="glass-card" 
                        style={{ padding: "1.5rem", display: "flex", gap: "1.5rem", alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)", borderRadius: "1.75rem", cursor: "pointer" }}
                    >
                        <div style={{ width: "80px", height: "80px", borderRadius: "1.25rem", overflow: "hidden", flexShrink: 0 }}>
                            <NeuralImage 
                                src={story.urlToImage} 
                                alt={story.title}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                                <span style={{ fontSize: "0.65rem", fontWeight: "900", color: "var(--primary)" }}>{(story.category || "Strategic").toUpperCase()}</span>
                                <span style={{ fontSize: "0.65rem", fontWeight: "800", color: "var(--text-dim)" }}>READ INTELLIGENCE</span>
                            </div>
                            <h4 style={{ color: "white", fontSize: "1.1rem", fontWeight: "800", lineHeight: "1.3" }}>{story.title}</h4>
                            <div style={{ color: "var(--primary)", display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: "900", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                                DEEP ANALYSIS <ArrowUpRight size={14} />
                            </div>
                        </div>
                        <ChevronRight size={20} color="var(--text-dim)" />
                    </motion.div>
                ))}
                {filteredStories.length === 0 && (
                    <div className="flex-center" style={{ padding: "4rem", flexDirection: "column", gap: "1rem", opacity: 0.5 }}>
                        <Layers size={40} />
                        <span style={{ fontWeight: "800" }}>NO SIGNALS DETECTED.</span>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Synthesis Sidebar */}
      <div style={{ position: "sticky", top: 0, height: "fit-content" }}>
        <div className="glass-panel" style={{ padding: "2.5rem", borderRadius: "3rem", border: "1px solid var(--border-subtle)", background: "rgba(15, 18, 24, 0.4)" }}>
            <h3 className="heading" style={{ fontSize: "1.75rem", fontWeight: "900", color: "white", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <Zap size={24} style={{ color: "var(--primary)" }} /> Aura Synthesis
            </h3>
            
            {intelligenceReport ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ padding: "1.5rem", borderRadius: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}>
                        <p style={{ color: "white", fontStyle: "italic", fontSize: "1rem", lineHeight: "1.6" }}>"{intelligenceReport.summary}"</p>
                    </div>
                    <button onClick={() => setIntelligenceReport(null)} style={{ padding: "1rem", borderRadius: "1.25rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)", color: "white", fontWeight: "900", cursor: "pointer" }}>RESET SYNTHESIS</button>
                </div>
            ) : (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                    {isSynthesizing ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                            <Loader2 size={40} className="spin" style={{ color: "var(--primary)" }} />
                            <p style={{ fontWeight: "900", color: "var(--primary)", letterSpacing: "0.1em" }}>AGGREGATING GLOBAL VECTORS...</p>
                        </div>
                    ) : (
                        <>
                            <p style={{ color: "var(--text-dim)", fontWeight: "600", fontSize: "0.9rem", marginBottom: "2rem" }}>Synthesize the current search results into a high-fidelity intelligence report.</p>
                            <button onClick={handleSynthesize} style={{ background: "var(--primary-gradient)", padding: "1.1rem 2rem", borderRadius: "1.5rem", color: "white", width: "100%", border: "none", fontWeight: "900", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", boxShadow: "var(--shadow-lg)" }}>
                               SYNTHESIZE STREAM <Sparkles size={20} />
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-dim)", fontWeight: "800", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            <Clock size={14} /> {stories.length} SIGNALS SYNCHRONIZED
        </div>
      </div>
    </div>
  );
};

export default NewsNavigator;
