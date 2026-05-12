import React from 'react';
import { FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-yellow-400 p-1.5 rounded-lg">
            <FileText className="w-6 h-6 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">ResumeAI</span>
        </div>
        <p className="text-gray-500 text-center max-w-xs">
          AI-powered resume optimization for every job seeker
        </p>
      </div>
    </footer>
  );
}
