import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-yellow-400 p-1.5 rounded-lg">
              <FileText className="w-6 h-6 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">ResumeAI</span>
          </Link>
          <div className="hidden md:block">
            <Link to="/builder" className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold transition-all flex items-center gap-2">
              Get Started
              <span className="text-lg">→</span>
            </Link>
          </div>
          {/* Mobile menu button could go here */}
        </div>
      </div>
    </nav>
  );
}
