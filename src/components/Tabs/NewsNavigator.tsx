import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Search, Sparkles, Zap, ChevronRight, Loader2, ShieldCheck, Clock, Layers } from "lucide-react";
import { Story, Persona } from "../../types";
import { synthesizeBriefing } from "../../services/aiService";

interface NewsNavigatorProps {
  stories: Story[];
  persona: Persona;
  onNotify: (message: string, type?: "success" | "info" | "error") => void;
}

const NewsNavigator: React.FC<NewsNavigatorProps> = ({ stories = [], persona, onNotify }) => {
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
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h2 className="heading" style={{ fontSize: "2.25rem", color: "white" }}>Intelligence Navigator</h2>
        <div className="glass-panel" style={{ padding: "2rem", borderRadius: "2rem" }}>
          <input 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search signals..." 
            style={{ width: "100%", padding: "1.25rem 2rem", borderRadius: "1rem", background: "rgba(255,255,255,0.05)", border: "none", color: "white" }} 
          />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: activeCategory === cat ? "var(--primary)" : "none", color: "white", border: "1px solid var(--border-subtle)" }}>{cat}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "500px", overflowY: "auto" }}>
          {filteredStories.map((s: any) => (
            <div key={s.id} className="glass-card" style={{ padding: "1rem", display: "flex", gap: "1.25rem", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "0.6rem", color: "var(--primary)" }}>{(s.category || "Strategic").toUpperCase()}</span>
                <h4 style={{ color: "white", fontSize: "0.95rem" }}>{s.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "sticky", top: 0, height: "fit-content" }}>
        <div className="glass-panel" style={{ padding: "2rem", borderRadius: "2rem" }}>
          <h3 className="heading" style={{ color: "white" }}>Aura Synthesis</h3>
          {intelligenceReport ? (
            <div style={{ marginTop: "1rem" }}><p style={{ color: "white", fontStyle: "italic", fontSize: "1rem" }}>{intelligenceReport.summary}</p><button onClick={() => setIntelligenceReport(null)} style={{ marginTop: "1rem", padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid white", background: "none", color: "white" }}>Reset</button></div>
          ) : (
            <button onClick={handleSynthesize} style={{ background: "var(--primary)", marginTop: "1rem", padding: "1rem", borderRadius: "1rem", color: "white", width: "100%", border: "none" }}>{isSynthesizing ? "Synthesizing..." : "Synthesize"}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsNavigator;
