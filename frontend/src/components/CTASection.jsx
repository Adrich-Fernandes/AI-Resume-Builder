import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-gray-900 overflow-hidden p-12 md:p-20 text-center">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 blur-[100px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 blur-[80px] -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col items-center">
            <Sparkles className="w-12 h-12 text-yellow-400 mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl">
              Stop sending generic resumes. Tailor your resume to every job in minutes with AI.
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-yellow-400/20 transition-all flex items-center gap-3 active:scale-95">
              Start Optimizing Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
