// Action Cable helper functions for real-time WebSocket communication

// Global state for WebSocket connection
const BASE_URL = process.env.REACT_APP_URL || 'http://localhost:3000'

// Test WebSocket URL accessibility
export const testWebSocketConnection = async (url = `${BASE_URL}/cable`) => {
  return new Promise((resolve, reject) => {
    const testWs = new WebSocket(url);
    
    testWs.onopen = () => {
      testWs.close();
      resolve(true);
    };
    
    testWs.onerror = (error) => {
      reject(error);
    };
    
    testWs.onclose = () => {};
    
    setTimeout(() => {
      if (testWs.readyState === WebSocket.CONNECTING) {
        testWs.close();
        reject(new Error('WebSocket connection timeout'));
      }
    }, 10000);
  });
};

let cable = null;
let callbacks = new Map();
let reconnectTimeout = null;

// Initialize Action Cable connection
export const connectToGameChannel = (accessCode, userId, url = `${BASE_URL}/cable`) => {
  try {
    if (cable && cable.readyState === WebSocket.OPEN && cable.accessCode === accessCode) {
      return;
    }

    if (cable) {
      cable.close();
    }

    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }

    const wsUrl = userId ? `${url}?user_id=${userId}` : url;
    
    cable = new WebSocket(wsUrl);
    cable.accessCode = accessCode; // Store access code for reference
    cable.userId = userId; // Store user_id for reference
    
    cable.onopen = () => {
      subscribeToChannel(accessCode);
    };

    cable.onmessage = (event) => {
      handleMessage(event);
    };

    cable.onclose = (event) => {
      if ([1002, 1003, 1006, 1011].includes(event.code) && userId) {
        setTimeout(() => {
          connectToGameChannel(accessCode, null, url);
        }, 1000);
        return;
      }
      
      if (event.code !== 1000) {
        reconnectTimeout = setTimeout(() => {
          connectToGameChannel(accessCode, userId, url);
        }, 3000);
      }
    };

    cable.onerror = (error) => {
      if (userId && wsUrl.includes('user_id')) {
        setTimeout(() => {
          connectToGameChannel(accessCode, null, url);
        }, 1000);
      }
    };
  } catch (error) {
    // Silent error handling
  }
};

// Subscribe to a specific game channel
const subscribeToChannel = (accessCode) => {
  if (!cable || cable.readyState !== WebSocket.OPEN) {
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
};

// Handle incoming WebSocket messages
const handleMessage = (event) => {
  try {
    const message = JSON.parse(event.data);
    
    if (message.type === 'ping') {
      return;
    }

    if (message.message) {
      const { event: eventName, data, timestamp } = message.message;
      
      if (callbacks.has(eventName)) {
        callbacks.get(eventName).forEach(callback => {
          callback(data, timestamp);
        });
      }
    }
  } catch (error) {
    // Silent error handling
  }
};

// Register callback for specific events
export const subscribeToGameEvent = (eventName, callback) => {
  if (!callbacks.has(eventName)) {
    callbacks.set(eventName, []);
  }
  
  const eventCallbacks = callbacks.get(eventName);
  if (!eventCallbacks.includes(callback)) {
    eventCallbacks.push(callback);
  }
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
    cable.close(1000, 'Manual disconnect');
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

// Debug connection info
export const getConnectionInfo = () => {
  return {
    status: getConnectionStatus(),
    accessCode: cable?.accessCode,
    userId: cable?.userId,
    readyState: cable?.readyState,
    callbacksCount: callbacks.size,
    hasReconnectTimeout: !!reconnectTimeout
  };
};
