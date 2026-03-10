import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import apiClient from "../api/apiClient";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/login", formData);
      const token = response.data.token;

      // Saving the token so the interceptor can use it for Gemini requests
      localStorage.setItem("token", token);

      navigate("/dashboard");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Invalid email or password";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 selection:bg-indigo-500/30">
      {/* Background Subtle Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl shadow-black/50">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-slate-800 rounded-2xl mb-4">
            <LogIn className="text-indigo-400" size={28} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Log in to continue your code audits.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 text-left block">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={formData.email} // Connected to state
                onChange={handleChange} // Updates state
                placeholder="name@work.com"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 text-left block">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="password"
                name="password"
                value={formData.password} // Connected to state
                onChange={handleChange} // Updates state
                placeholder="••••••••"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all group"
          >
            Sign In
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
