 
 
document.getElementById("chat-icon").addEventListener("click", function () {
  document.getElementById("chatbot-modal").classList.toggle("open");
});

const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");
const scheduleButton = document.getElementById("toggle-schedule");
const scheduleForm = document.getElementById("schedule-form");

document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault();

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
    const response = await fetch("/chat", {

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

scheduleButton.addEventListener("click", function () {
  scheduleForm.classList.toggle("open");
});

scheduleForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const trip = {
    name: document.getElementById("user-name").value,
    pickup: document.getElementById("pickup").value,
    dropoff: document.getElementById("dropoff").value,
    date: document.getElementById("trip-date").value,
    time: document.getElementById("trip-time").value,
  };

  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = "Scheduling your trip...";
  messages.appendChild(botMessage);

  try {
    const response = await fetch("/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    });

    const data = await response.json();
    botMessage.textContent = data.message;
  } catch (error) {
    botMessage.textContent = "Failed to schedule trip.";
  }

  scheduleForm.reset();
  scheduleForm.classList.remove("open");
  messages.scrollTop = messages.scrollHeight;
});
