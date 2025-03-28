// frontend/src/Pages/ResumeExtract.jsx
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import axios from 'axios';

const ResumeExtract = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    onDrop: acceptedFiles => setFile(acceptedFiles[0])
  });

  const handleAnalysis = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8000/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setAnalysisResult({
          skills: response.data.data.skills || [],
          experience: response.data.data.experience || []
        });
      } else {
        setError('Failed to analyze resume: ' + (response.data.error || 'Unknown error'));
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error analyzing resume');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold uppercase text-gray-900 mb-4 tracking-tighter">
            Resume Analyzer
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Upload your resume to extract skills and experience!
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'}`}
          >
            <input {...getInputProps()} />
            <FiUploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-900 font-medium text-lg">
              {file ? file.name : 'Drag & Drop Your Resume Here'}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Supported format: PDF
            </p>
          </div>
          <button
            onClick={handleAnalysis}
            disabled={!file || isProcessing}
            className={`w-full mt-6 py-4 px-8 rounded-lg font-bold text-white transition-colors
              ${(!file || isProcessing) ? 'bg-gray-400' : 'bg-gray-900 hover:bg-gray-800'}
              flex items-center justify-center gap-2`}
          >
            {isProcessing && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            )}
            {isProcessing ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>
        {analysisResult && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Resume Details
              </h2>
            </div>
            {analysisResult.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {analysisResult.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg text-center hover:bg-orange-50 transition-colors"
                    >
                      <span className="text-gray-900 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {analysisResult.experience.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Work Experience</h3>
                <div className="space-y-3">
                  {analysisResult.experience.map((exp, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      {exp}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeExtract;