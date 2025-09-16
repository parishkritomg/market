import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Show logo animation
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 200);

    // Show loading animation after logo appears
    const loadingTimer = setTimeout(() => {
      setShowLoading(true);
    }, 800);

    // Auto complete after animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(loadingTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* Minimal logo and branding */}
      <div className={`flex flex-col items-center transition-all duration-800 ease-out ${
        showLogo ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
      }`}>
        {/* Zentro logo */}
        <div className="mb-6">
          <img 
            src="/assets/logo-for-app.png" 
            alt="Zentro Logo" 
            className="w-20 h-20 object-contain"
          />
        </div>
        
        {/* App name */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Zentro</h1>
        
        {/* Simple tagline */}
        <p className="text-gray-500 text-sm mb-8">Find Your Perfect Home</p>
        
        {/* Loading animation */}
        <div className={`transition-all duration-500 ${
          showLoading ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Spinner */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
            
            {/* Loading dots */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            {/* Loading text */}
            <p className="text-gray-400 text-xs mt-3">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;