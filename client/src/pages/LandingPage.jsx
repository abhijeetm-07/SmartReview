import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-400" />
          <span className="font-bold text-xl tracking-tight">SmartReview</span>
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-slate-400 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-blue-600 rounded-full font-medium hover:bg-blue-500 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-24 text-center px-4">
        <h1 className="text-6xl font-black mb-6 leading-tight">
          Ship <span className="text-blue-500">Cleaner</span> Code <br />
          with AI Audits.
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
          SmartReview uses Gemini 2.5 Flash to scan your snippets for bugs,
          security risks, and performance bottlenecks in seconds.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition text-lg"
        >
          Start Your First Audit <ArrowRight size={20} />
        </Link>
      </header>

      {/* Features */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-20">
        <FeatureCard
          icon={<ShieldCheck className="text-emerald-400" />}
          title="Security First"
          desc="Detect SQL injections, XSS, and insecure dependencies before they hit production."
        />
        <FeatureCard
          icon={<Zap className="text-yellow-400" />}
          title="Instant Feedback"
          desc="Get a comprehensive score and line-by-line suggestions in under 2 seconds."
        />
        <FeatureCard
          icon={<Sparkles className="text-purple-400" />}
          title="AI Driven"
          desc="Powered by the latest LLMs trained on millions of high-quality commits."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
