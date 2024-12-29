import { useEffect } from 'react';
import testPumpPortalWebSocket from '../services/pumpportal.js';

function PumpPortalTest() {
  useEffect(() => {
    const cleanup = testPumpPortalWebSocket();
    
    // Cleanup on component unmount
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">PumpPortal WebSocket Test</h2>
      <p className="text-gray-600">Check the console for WebSocket messages</p>
    </div>
  );
}

export default PumpPortalTest; 