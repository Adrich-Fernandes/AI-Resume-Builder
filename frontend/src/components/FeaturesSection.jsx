import React from 'react';
import { FileText, Target, Zap, TrendingUp } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-yellow-600" />,
      title: 'Upload Your Resume',
      description: 'Simply upload your existing resume in Word format and let AI do the heavy lifting.'
    },
    {
      icon: <Target className="w-6 h-6 text-yellow-600" />,
      title: 'Paste Job Description',
      description: "Add the job description you're targeting and our AI will compare every detail."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: 'Instant AI Analysis',
      description: 'Get precise suggestions on what to add, remove, and edit to maximize your chances.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
      title: 'Boost Your Match Score',
      description: 'See your match percentage and climb higher with actionable keyword recommendations.'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-gray-500 text-lg">Smart tools to align your resume with any job posting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-6 p-8 rounded-2xl bg-white border border-gray-100 hover:border-yellow-200 hover:shadow-xl hover:shadow-yellow-500/5 transition-all group">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
