const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chat-box");
let isTyping = false;

function setDefaultQuestion(question) {
    userInput.value = question;
    userInput.focus();
}

function getResponse() {
    const userMessage = userInput.value.trim();
    if (!userMessage || isTyping) return;

    addMessage("You", userMessage);
    userInput.value = "";
    userInput.focus();

    // Show typing indicator
    const typingIndicator = document.createElement("p");
    typingIndicator.innerHTML = `<strong>DigiSathi:</strong> <span class="dots">Typing</span>`;
    chatBox.appendChild(typingIndicator);
    scrollToBottom();

    animateDots(typingIndicator.querySelector(".dots"));
    isTyping = true;

    puter.ai.chat(`You are DigiSathi, a helpful assistant for digital India. Answer questions about WhatsApp, Paytm, Google Apps and other digital services in India. Keep answers clear and simple. Question: ${userMessage}`)
        .then(response => {
            chatBox.removeChild(typingIndicator);
            addMessage("DigiSathi", response);
        })
        .catch(() => {
            chatBox.removeChild(typingIndicator);
            addMessage("DigiSathi", "Sorry, I'm having trouble connecting. Please try again later.");
        })
        .finally(() => {
            isTyping = false;
        });
}

function addMessage(sender, message) {
    const msgElement = document.createElement("p");
    msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msgElement);
    scrollToBottom();
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

function animateDots(element) {
    let count = 0;
    const interval = setInterval(() => {
        count = (count + 1) % 4;
        element.textContent = "Typing" + ".".repeat(count);
    }, 500);
    element.dataset.interval = interval;
}

function stopDotsAnimation(element) {
    clearInterval(element.dataset.interval);
}

// Handle Enter key press
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getResponse();
    }
});