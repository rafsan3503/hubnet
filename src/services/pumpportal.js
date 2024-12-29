import WebSocket from 'ws';

const testPumpPortalWebSocket = () => {
  try {
    const ws = new WebSocket('wss://pumpportal.fun/api/data');

    ws.on('open', function open() {
      console.log('Connected to PumpPortal WebSocket');

      // Subscribe to token creation events
      const newTokenPayload = {
        method: "subscribeNewToken"
      };
      ws.send(JSON.stringify(newTokenPayload));
      console.log('Subscribed to new token events');

      // Subscribe to specific account trades
      const accountPayload = {
        method: "subscribeAccountTrade",
        keys: ["AArPXm8JatJiuyEffuC1un2Sc835SULa4uQqDcaGpAjV"] // Example account
      };
      ws.send(JSON.stringify(accountPayload));
      console.log('Subscribed to account trades');

      // Subscribe to specific token trades
      const tokenPayload = {
        method: "subscribeTokenTrade",
        keys: ["91WNez8D22NwBssQbkzjy4s2ipFrzpmn5hfvWVe2aY5p"] // Example token
      };
      ws.send(JSON.stringify(tokenPayload));
      console.log('Subscribed to token trades');
    });

    ws.on('message', function message(data) {
      const parsedData = JSON.parse(data);
      console.log('Received message:', parsedData);
      
      // Log different types of events
      if (parsedData.type === 'newToken') {
        console.log('New token created:', parsedData.token);
      } else if (parsedData.type === 'trade') {
        console.log('Trade executed:', {
          token: parsedData.token,
          amount: parsedData.amount,
          price: parsedData.price,
          account: parsedData.account
        });
      }
    });

    ws.on('error', function error(err) {
      console.error('WebSocket error:', err);
    });

    ws.on('close', function close() {
      console.log('Disconnected from PumpPortal WebSocket');
    });

    // Cleanup function
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
        console.log('WebSocket connection closed');
      }
    };
  } catch (error) {
    console.error('Error setting up WebSocket:', error);
  }
};

export default testPumpPortalWebSocket; 