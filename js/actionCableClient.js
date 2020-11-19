// Opens a WebSocket connection to a specific Chat Room stream.
const createActionCableConnection = (webSocketUrl, channel, identifier) => {

  // Creates the new WebSocket connection.
  actionCableConnection = new WebSocket(webSocketUrl);
  // When the connection is first created, this code runs subscribing the client to a channel
  // and possibly to a specific resource.
  actionCableConnection.onopen = event => {
    console.log('Connected to ActionCable');
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        id: identifier,
        channel: channel
      }),
    };
    actionCableConnection.send(JSON.stringify(msg));
  };

  // When the connection is closed, this code will run.
  actionCableConnection.onclose = event => {
    console.log('WebSocket is closed.');
  };
  // When a message is received through the websocket, this code will run.
  actionCableConnection.onmessage = message => {
    const msg = JSON.parse(message.data);

    // Ignores pings.
    if (msg.type === "ping") {
      return;
    }
    // Render any newly created messages onto the page.
    if (msg.message) {
      renderMessage(msg.message)
    }
  };

  // When an error occurs through the websocket connection...
  actionCableConnection.onerror = error => {
    console.table(error);
  };
}

const broadcastToActionCable = (connection, channel, message) => {
  let stream = {
    command: 'message',
    identifier: JSON.stringify({ channel: channel }),
    data: JSON.stringify({ action: 'repeat', content: message })
  }
  connection.send(JSON.stringify(stream));
  return
}

createActionCableConnection('ws://e72036518062.ngrok.io/cable', 'WebNotificationsChannel')
