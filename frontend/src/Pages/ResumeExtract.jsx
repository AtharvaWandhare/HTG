import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';

const ResumeAnalyzer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false,
    onDrop: acceptedFiles => setFile(acceptedFiles[0])
  });

  // Mock analysis function
  const simulateAnalysis = () => {
    const mockSkills = ['Electrical', 'Plumbing', 'Painting', 'Cleaning', 'Repairs'];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          skills: mockSkills,
          fileName: file.name,
          matchPercentage: 85
        });
      }, 1500);
    });
  };

  const handleAnalysis = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const result = await simulateAnalysis();
      setAnalysisResult(result);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold uppercase text-gray-900 mb-4 tracking-tighter">
            Find the Best Tradespeople
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Connecting you with skilled tradespeople near you!
          </p>
        </div>

        {/* Upload Section */}
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
              Supported formats: PDF, DOCX
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

        {/* Results Section */}
        {analysisResult && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Experience Excellence With Our
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-orange-600 font-bold">Home Repairs</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">Moving</span>
                <span className="text-gray-600">Electrical</span>
              </div>
            </div>

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

            {/* Additional Services */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Other Services
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Cleaning', 'Painting', 'Plumbing'].map((service, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg text-center"
                  >
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;