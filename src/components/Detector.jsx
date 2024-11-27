import React, { useState } from 'react';
import axios from 'axios';
import bot from '../assets/aibot.png';

const Detector = () => {
  const [disabled, setDisabled] = useState(false);
  const [text, setText] = useState('');
  const [resp, setResp] = useState('');

  const detect = () => {
    axios
      .post(
        'https://ai-content-detector-ai-gpt.p.rapidapi.com/api/detectText/',
        { text },
        {
          headers: {
            'x-rapidapi-key': '2ce74f3844msh11023f99f55457ep1731eajsn6144224a5700',
            'x-rapidapi-host': 'ai-content-detector-ai-gpt.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setResp(response.data);
        setDisabled(false);

      })
      .catch(() => {
        setResp(null);
        setDisabled(false);
      });
  };

  const handleDetect = () => {
    detect();
    setDisabled(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 flex flex-col items-center py-12 px-6">
      {/* Header Section */}
      <header className="text-center mb-12 lg:flex">
        {/* Illustration Section */}
        <div className="max-w-lg mx-auto mb-8 animate__animated animate__fadeIn animate__delay-2s">
          <img
            src={bot}
            alt="AI Detection Illustration"
            className="lg:w-full mx-auto rounded-lg h-36"
          />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 animate__animated animate__fadeIn animate__delay-1s">
            AI Content Detector
          </h1>
          <p className="text-gray-600 text-lg mt-3 max-w-lg mx-auto">
            Analyze your text to determine the percentage of AI-generated and human-written content. Get insights with a click!
          </p>
        </div>
      </header>



      {/* Textarea Section */}
      <div className="w-full md:w-3/4 lg:w-2/3 bg-white shadow-xl rounded-xl px-8 py-4 mb-6 transition-all transform ">
        <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
          Enter Your Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          id="message"
          rows="10"
          className="block w-full text-gray-800 bg-gray-50 rounded-lg p-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ease-in-out"
          placeholder="Write your text here..."
        ></textarea>

        {/* Response Section */}
        {resp && (
          <div className="mt-6 lg:flex justify-between bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg text-blue-800 transition-all duration-500 ease-in-out transform">
            <div>
              <p className="text-lg font-medium">
                <span className="font-bold">AI Words Count:</span> {resp?.aiWords}
              </p>
              <p className="text-lg font-medium">
                <span className="font-bold">Human:</span> {resp?.isHuman}%
              </p>
              <p className="text-lg font-medium">
                <span className="font-bold">Fake Percentage:</span> {resp?.fakePercentage}%
              </p>
            </div>
            <div className='text-center content-center text-red-500 lg:w-1/2 lg:mt-0 mt-4'>
              {resp?.otherFeedback}
            </div>
          </div>
        )}

        {/* Detect Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleDetect}
            className={`w-full md:w-auto px-10 py-3 text-lg font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-400 transition-all duration-300 ${disabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
            disabled={disabled}
          >
            {disabled ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-teal-200 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              'Detect'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detector;
