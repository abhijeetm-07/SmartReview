import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Zap, ArrowRight, Github } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-indigo-500/20 overflow-x-hidden font-sans">
      {/* Muted Background Depth */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-[#020617]/80">
        <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
          {/* Minimalist Logo */}
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="bg-slate-800 p-2 rounded-xl group-hover:bg-indigo-600 transition-all duration-300">
              <Sparkles
                size={18}
                className="text-indigo-400 group-hover:text-white"
              />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">
              SmartReview
            </span>
          </div>

          {/* Simple Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#features"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Platform
            </a>
            <Link
              to="/login"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all duration-200 shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-24 text-center px-4 max-w-4xl mx-auto">
        {/* Subdued Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-slate-800 bg-slate-900/50 text-slate-400 text-[10px] font-bold mb-8 tracking-widest uppercase">
          <Zap size={12} className="text-indigo-500" /> Powered by Gemini 3
        </div>

        {/* Clean Typography */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">
          Modern code reviews <br />
          <span className="text-slate-500">for modern teams.</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Automated auditing that understands logic, catches vulnerabilities,
          and optimizes performance in seconds.
        </p>

        {/* Tactile Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="group flex items-center gap-2 px-7 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-[0.98]"
          >
            Start Your First Audit
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <a
            href="https://github.com"
            className="flex items-center gap-2 px-7 py-3.5 bg-slate-900 border border-slate-800 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            <Github size={18} />
            GitHub
          </a>
        </div>
      </header>

      {/* Features Grid */}
      <section
        id="features"
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-32"
      >
        <FeatureCard
          icon={<ShieldCheck className="text-indigo-400" />}
          title="Security Scanning"
          desc="Automated detection of OWASP risks and sensitive data leaks."
        />
        <FeatureCard
          icon={<Zap className="text-indigo-400" />}
          title="Sub-second Audits"
          desc="Optimized feedback loops powered by the latest Gemini architecture."
        />
        <FeatureCard
          icon={<Sparkles className="text-indigo-400" />}
          title="Style Intelligence"
          desc="Maintain clean code standards across your entire repository."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group p-8 bg-slate-900/30 border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-all duration-300">
      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm font-normal">
        {desc}
      </p>
    </div>
  );
}
