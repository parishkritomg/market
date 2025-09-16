import React, { useState } from 'react';
import PullToRefreshTest from '../components/PullToRefreshTest';

const TestPullToRefresh = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);

  const handleRefresh = async () => {
    console.log('🔄 Refresh triggered!');
    setLastRefreshTime(new Date().toLocaleTimeString());
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRefreshCount(prev => prev + 1);
    console.log('✅ Refresh completed!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PullToRefreshTest onRefresh={handleRefresh}>
        <div className="p-6 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h1 className="text-2xl font-bold mb-4">Pull-to-Refresh Test</h1>
            <div className="space-y-2">
              <p><strong>Refresh Count:</strong> {refreshCount}</p>
              <p><strong>Last Refresh:</strong> {lastRefreshTime || 'Never'}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>This should ONLY work when you're at the very top of the page</li>
              <li>Try scrolling down and then pulling - it should NOT work</li>
              <li>Scroll back to the top and try pulling - it should work</li>
              <li>Watch the debug info at the top of the screen</li>
              <li>Check the browser console for detailed logs</li>
            </ul>
          </div>

          {/* Generate content to make the page scrollable */}
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Content Block {i + 1}</h3>
              <p className="text-gray-600">
                This is content block {i + 1}. Scroll down to test that pull-to-refresh 
                is disabled when not at the top. The debug info should show "NOT AT TOP" 
                when you scroll down.
              </p>
              <div className="mt-4 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Placeholder content</span>
              </div>
            </div>
          ))}

          <div className="bg-red-100 border border-red-400 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Test Area</h3>
            <p className="text-red-700">
              If you can trigger pull-to-refresh from this area (when scrolled down), 
              then there's still a bug. The pull-to-refresh should ONLY work at the very top.
            </p>
          </div>
        </div>
      </PullToRefreshTest>
    </div>
  );
};

export default TestPullToRefresh;