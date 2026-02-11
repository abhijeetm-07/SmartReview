import { Code, Terminal, Sparkles } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8 flex flex-col items-center">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-blue-400 w-8 h-8" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            SmartReview AI
          </h1>
        </div>
        <p className="text-slate-400">Professional Code Audits in Seconds</p>
      </header>

      <main className="w-full max-w-4xl bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 text-sm font-mono text-blue-400">
          <Terminal size={16} />
          <span>editor.js</span>
        </div>

        <textarea
          placeholder="Paste your code here..."
          className="w-full h-64 bg-slate-900 border border-slate-700 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-all"
        />

        <button className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all group">
          <Code className="group-hover:rotate-12 transition-transform" />
          Analyze Snippet
        </button>
      </main>
    </div>
  );
}

export default App;
