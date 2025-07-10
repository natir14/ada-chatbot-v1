document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const userInput = document.getElementById("user-input");
  const messages = document.getElementById("messages");

  const userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.textContent = userInput.value;
  messages.appendChild(userMessage);

  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = "Thinking...";
  messages.appendChild(botMessage);

  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput.value })
  });

  const data = await response.json();
  botMessage.textContent = data.reply;
  userInput.value = "";
  messages.scrollTop = messages.scrollHeight;
});