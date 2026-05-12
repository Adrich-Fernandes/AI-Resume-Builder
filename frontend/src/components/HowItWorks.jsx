import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { id: '01', title: 'Upload Resume' },
    { id: '02', title: 'Add Job Description' },
    { id: '03', title: 'Get AI Feedback' },
    { id: '04', title: 'Land the Interview' },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-500 text-lg mb-16">Four simple steps to a job-winning resume</p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-6 group">
                <div className="w-20 h-20 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center justify-center text-2xl font-bold text-yellow-600 shadow-sm group-hover:scale-110 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  {step.id}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block w-8 h-8 text-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
