import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-50/50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-bold tracking-wide uppercase mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          AI-Powered Resume Optimizer
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]">
          Get Your Resume <span className="relative inline-block text-gray-900">
            Job-Ready
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400 opacity-60" viewBox="0 0 338 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9C118.5 2.5 227.5 2.5 335 9" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </span> in Minutes
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
          Upload your resume, paste a job description, and our AI instantly tells you what to <span className="font-bold text-gray-900">add</span>, <span className="font-bold text-gray-900">remove</span>, and <span className="font-bold text-gray-900">edit</span> to maximize your chances of landing the interview.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-6">
          <button className="group bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg shadow-[0_8px_30px_rgb(250,204,21,0.3)] transition-all flex items-center gap-3 active:scale-95">
            <Sparkles className="w-5 h-5" />
            Analyze My Resume
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
              No sign-up required
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
              Instant results
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
              AI-powered
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-100 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}
