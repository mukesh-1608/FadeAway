// Replace with your API Gateway Invoke URL (e.g., https://abc123.execute-api.us-east-1.amazonaws.com/prod)
const API_URL = 'https://6qa027l7t3.execute-api.ap-south-1.amazonaws.com/prod';

// Generate or reuse room ID from URL hash (e.g., #room123)
const roomId = window.location.hash.substring(1) || Math.random().toString(36).substring(7);
window.location.hash = roomId;

// Send message to Lambda via API Gateway
document.getElementById('send-btn').addEventListener('click', async () => {
  const message = document.getElementById('message-input').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roomId, message, user: 'Anonymous' }),
  });
  document.getElementById('message-input').value = '';
});

// Fetch new messages every 2 seconds (simple polling)
setInterval(async () => {
  const response = await fetch(`${API_URL}?roomId=${roomId}`);
  const messages = await response.json();
  document.getElementById('chat-box').innerHTML = messages
    .map(msg => `<div>${msg.user}: ${msg.message}</div>`)
    .join('');
}, 2000);