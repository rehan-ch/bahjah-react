// Action Cable helper functions for real-time WebSocket communication

// Global state for WebSocket connection
let cable = null;
let callbacks = new Map();
let reconnectTimeout = null;

// Initialize Action Cable connection
export const connectToGameChannel = (accessCode, url = 'https://e859ae03c4e5.ngrok-free.app/cable') => {
  try {
    // Close existing connection if any
    if (cable) {
      cable.close();
    }

    cable = new WebSocket(url);
    
    cable.onopen = () => {
      console.log('Action Cable connected');
      subscribeToChannel(accessCode);
    };

    cable.onmessage = (event) => {
      handleMessage(event);
    };

    cable.onclose = () => {
      console.log('Action Cable disconnected');
      // Attempt to reconnect after 3 seconds
      reconnectTimeout = setTimeout(() => {
        connectToGameChannel(accessCode, url);
      }, 3000);
    };

    cable.onerror = (error) => {
      console.error('Action Cable error:', error);
    };
  } catch (error) {
    console.error('Failed to connect to Action Cable:', error);
  }
};

// Subscribe to a specific game channel
const subscribeToChannel = (accessCode) => {
  if (!cable || cable.readyState !== WebSocket.OPEN) {
    console.error('Action Cable not connected');
    return;
  }

  const subscribeMessage = {
    command: 'subscribe',
    identifier: JSON.stringify({
      channel: 'GameChannel',
      access_code: accessCode
    })
  };

  cable.send(JSON.stringify(subscribeMessage));
  console.log(`Subscribed to game channel: game_${accessCode}`);
};

// Handle incoming WebSocket messages
const handleMessage = (event) => {
  try {
    const message = JSON.parse(event.data);
    
    if (message.type === 'ping') {
      // Handle ping messages
      return;
    }

    if (message.message) {
      const { event: eventName, data, timestamp } = message.message;
      console.log('Received event:', eventName, data);
      
      // Call registered callbacks for this event
      if (callbacks.has(eventName)) {
        callbacks.get(eventName).forEach(callback => {
          callback(data, timestamp);
        });
      }
    }
  } catch (error) {
    console.error('Error parsing Action Cable message:', error);
  }
};

// Register callback for specific events
export const subscribeToGameEvent = (eventName, callback) => {
  if (!callbacks.has(eventName)) {
    callbacks.set(eventName, []);
  }
  callbacks.get(eventName).push(callback);
};

// Remove callback for specific events
export const unsubscribeFromGameEvent = (eventName, callback) => {
  if (callbacks.has(eventName)) {
    const eventCallbacks = callbacks.get(eventName);
    const index = eventCallbacks.indexOf(callback);
    if (index > -1) {
      eventCallbacks.splice(index, 1);
    }
  }
};

// Disconnect from Action Cable
export const disconnectFromGameChannel = () => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
  
  if (cable) {
    cable.close();
    cable = null;
  }
  callbacks.clear();
};

// Check if connected
export const isConnected = () => {
  return cable && cable.readyState === WebSocket.OPEN;
};

// Get connection status
export const getConnectionStatus = () => {
  if (!cable) return 'disconnected';
  switch (cable.readyState) {
    case WebSocket.CONNECTING: return 'connecting';
    case WebSocket.OPEN: return 'connected';
    case WebSocket.CLOSING: return 'closing';
    case WebSocket.CLOSED: return 'disconnected';
    default: return 'unknown';
  }
};
