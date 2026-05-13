import React, { useState } from 'react';
import { FileText, Briefcase, Upload, Sparkles, FileType, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Builder() {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rawText, setRawText] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.docx') && !selectedFile.name.endsWith('.doc')) {
      setError('Please upload a .doc or .docx file.');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const response = await fetch(`${API_BASE_URL}/resume/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Upload failed');

      setRawText(data.raw_text);
    } catch (err) {
      setError(err.message);
      setFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!rawText) {
      setError('Please upload a resume first.');
      return;
    }
    if (!jobDescription.trim() || jobDescription.trim().length < 50) {
      setError('Please provide a detailed job description (at least 50 characters).');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/analysis/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          raw_text: rawText,
          job_description: jobDescription,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Analysis failed');

      setAnalysisResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#333]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#FFD700] p-2 rounded-lg shadow-sm">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ResumeAI</h1>
            <p className="text-xs text-gray-500 font-medium">Optimize your resume for any job</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#FFD700] font-medium text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Resume Analysis</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Tailor Your Resume to <span className="text-[#FFD700]">Any Job</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Upload your resume and paste the job description. Our AI will tell you exactly what to change to land the interview.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Resume Upload Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-50 p-2 rounded-lg">
                <FileType className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Your Resume</h3>
                <p className="text-sm text-gray-400 font-medium">Upload in Word format (.docx)</p>
              </div>
            </div>

            <div className="relative group">
              <input 
                type="file" 
                className="hidden" 
                id="resume-upload" 
                accept=".doc,.docx" 
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <label 
                htmlFor="resume-upload"
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 transition-all duration-300 cursor-pointer ${
                  file ? 'border-[#FFD700] bg-yellow-50/20' : 'border-gray-200 hover:border-[#FFD700] hover:bg-yellow-50/30'
                }`}
              >
                {isUploading ? (
                  <Loader2 className="w-10 h-10 text-[#FFD700] animate-spin mb-4" />
                ) : (
                  <div className={`p-4 rounded-full mb-4 transition-transform duration-300 ${file ? 'bg-[#FFD700] text-white' : 'bg-yellow-50 text-[#FFD700] group-hover:scale-110'}`}>
                    {file ? <CheckCircle2 className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                  </div>
                )}
                <span className="font-bold text-gray-700 mb-1">
                  {file ? file.name : 'Click to upload your resume'}
                </span>
                <span className="text-sm text-gray-400">
                  {isUploading ? 'Processing document...' : 'Supports .doc and .docx files'}
                </span>
              </label>
            </div>
          </div>

          {/* Job Description Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-50 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Job Description</h3>
                <p className="text-sm text-gray-400 font-medium">Paste the target job description</p>
              </div>
            </div>

            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here... Include requirements, responsibilities, and qualifications for the best analysis."
              className="w-full h-[236px] p-6 bg-[#F9FAFB] border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-[#FFD700] resize-none text-gray-600 placeholder:text-gray-300 leading-relaxed transition-all duration-300"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !rawText || !jobDescription}
            className={`flex items-center gap-2 font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 transform active:scale-95 group ${
              isAnalyzing || !rawText || !jobDescription
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-[#FFD700] hover:bg-[#F0C800] text-gray-800 shadow-yellow-200/50 hover:-translate-y-1'
            }`}
          >
            {isAnalyzing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            )}
            {isAnalyzing ? 'Analyzing with AI...' : 'Analyze Resume'}
          </button>
        </div>

        {/* Results Section */}
        {analysisResult && (
          <div className="mt-16 animate-fade-in scroll-mt-20" id="results">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="bg-[#FFD700]/10 p-8 border-b border-yellow-100 flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-white"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={364.4}
                      strokeDashoffset={364.4 - (364.4 * analysisResult.match_score) / 100}
                      className="text-[#FFD700]"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-gray-800">{analysisResult.match_score}%</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Match</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-800 mb-2">Analysis Summary</h3>
                  <p className="text-gray-600 leading-relaxed text-lg italic">
                    "{analysisResult.summary}"
                  </p>
                </div>
              </div>

              <div className="p-8 grid md:grid-cols-3 gap-8">
                {/* Add Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <div className="bg-green-50 p-1.5 rounded-lg">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Add / Highlight</span>
                  </div>
                  <ul className="space-y-3">
                    {analysisResult.suggestions_add.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-600 bg-green-50/30 p-3 rounded-xl border border-green-50">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Remove Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-600 font-bold">
                    <div className="bg-red-50 p-1.5 rounded-lg">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <span>Remove / Rephrase</span>
                  </div>
                  <ul className="space-y-3">
                    {analysisResult.suggestions_remove.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-600 bg-red-50/30 p-3 rounded-xl border border-red-50">
                        <div className="w-4 h-4 bg-red-400 rounded-full flex-shrink-0 mt-1 flex items-center justify-center text-[10px] text-white font-bold">−</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Keep Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 font-bold">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>Keep / Strengths</span>
                  </div>
                  <ul className="space-y-3">
                    {analysisResult.suggestions_keep.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-600 bg-blue-50/30 p-3 rounded-xl border border-blue-50">
                        <div className="w-4 h-4 bg-blue-400 rounded-full flex-shrink-0 mt-1 flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
