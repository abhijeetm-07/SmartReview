import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  History,
  LogOut,
  User,
  Zap,
  ShieldCheck,
  SearchCode,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import apiClient from "../api/apiClient";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAudit = async () => {
    if (!code) return;
    setIsAuditing(true);
    // Backend logic will go here
    setTimeout(() => setIsAuditing(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap');
        .glass-sidebar { background: rgba(2, 6, 23, 0.95); border-right: 1px solid rgba(255,255,255,0.05); }
        .workbench-grid { background-image: radial-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px); background-size: 30px 30px; }
        .logo-glow { box-shadow: 0 0 20px rgba(79, 70, 229, 0.4); }
      `}</style>

      {/* SIDEBAR */}
      <aside className="w-64 flex flex-col shrink-0 glass-sidebar">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl logo-glow">
              <Code2 size={20} className="text-white" />
            </div>
            <span
              className="text-xl font-bold text-white tracking-tighter"
              style={{ fontFamily: "Syne" }}
            >
              CodeAudit
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-indigo-400 bg-indigo-400/10 rounded-xl border border-indigo-400/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
            <LayoutDashboard size={18} />
            <span className="font-bold text-sm" style={{ fontFamily: "Syne" }}>
              Dashboard
            </span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 hover:bg-slate-900/50 rounded-xl transition-all group">
            <History size={18} className="group-hover:text-indigo-400" />
            <span className="font-bold text-sm" style={{ fontFamily: "Syne" }}>
              History
            </span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-900">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-slate-900/40 rounded-2xl border border-slate-800/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-[10px] font-bold text-white">
              DEV
            </div>
            <span
              className="text-xs font-semibold text-slate-400 uppercase tracking-widest"
              style={{ fontFamily: "DM Mono" }}
            >
              Developer
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400/80 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <LogOut size={18} />
            <span className="font-bold text-sm" style={{ fontFamily: "Syne" }}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden workbench-grid">
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#020617]/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span
              className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]"
              style={{ fontFamily: "DM Mono" }}
            >
              Engine v1.5 Online
            </span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest"
            style={{ fontFamily: "DM Mono" }}
          >
            <Zap size={12} className="text-amber-400" fill="currentColor" />{" "}
            Gemini Pro
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-6xl mx-auto space-y-10">
            <div>
              <h2
                className="text-4xl font-extrabold text-white tracking-tighter"
                style={{ fontFamily: "Syne" }}
              >
                Workbench
              </h2>
              <p className="text-slate-500 mt-2 font-medium">
                Deploy Gemini 1.5 Pro to audit your code for vulnerabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* EDITOR */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div
                    className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]"
                    style={{ fontFamily: "DM Mono" }}
                  >
                    <SearchCode size={14} className="text-indigo-500" />{" "}
                    Source_Input
                  </div>
                </div>
                <div className="relative group bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden transition-all focus-within:border-indigo-500/50 focus-within:shadow-[0_0_30px_rgba(99,102,241,0.05)]">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// Paste your logic here..."
                    className="w-full h-[450px] bg-transparent p-8 text-indigo-100/90 font-mono text-sm outline-none resize-none leading-relaxed"
                    style={{ fontFamily: "DM Mono" }}
                  />
                  <div className="p-6 border-t border-slate-800/50 flex justify-end bg-slate-950/40">
                    <button
                      onClick={handleAudit}
                      disabled={!code || isAuditing}
                      className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2"
                      style={{ fontFamily: "Syne" }}
                    >
                      {isAuditing ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Zap size={14} fill="currentColor" />
                      )}
                      {isAuditing ? "Analyzing" : "Push to Audit"}
                    </button>
                  </div>
                </div>
              </div>

              {/* RESULTS */}
              <div className="space-y-4">
                <div
                  className="flex items-center gap-2 px-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]"
                  style={{ fontFamily: "DM Mono" }}
                >
                  <ShieldCheck size={14} className="text-emerald-500" />{" "}
                  Audit_Report
                </div>
                <div className="h-[540px] bg-slate-950/50 border border-slate-800 border-dashed rounded-[2rem] flex flex-col items-center justify-center p-12 text-center group">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 shadow-xl group-hover:border-indigo-500/30 transition-colors">
                    <ShieldCheck size={32} className="text-slate-700" />
                  </div>
                  <h3
                    className="text-white font-bold text-xl"
                    style={{ fontFamily: "Syne" }}
                  >
                    {isAuditing ? "Scanning Logic..." : "System Idle"}
                  </h3>
                  <p
                    className="text-slate-600 text-sm mt-3 leading-relaxed max-w-[240px]"
                    style={{ fontFamily: "DM Mono" }}
                  >
                    {isAuditing
                      ? "The AI engine is currently traversing your code for security patterns."
                      : "Input code on the left to generate an automated vulnerability report."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
