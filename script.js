 
 
 document.getElementById("chat-icon").addEventListener("click", function () {
  document.getElementById("chatbot-modal").classList.toggle("open");
});

 
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

  const userText = userInput.value;
  userInput.value = "";

  try {
    const response = await fetch("https://ada-chatbot-v1.onrender.com/chat", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    botMessage.textContent = data.reply;
  } catch (error) {
    botMessage.textContent = "Sorry, something went wrong with the server.";
  }

  messages.scrollTop = messages.scrollHeight;
});
