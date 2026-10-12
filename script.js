const WHATSAPP_NUMBER = "";
const bookingMessage = "Halo AneX Taxi Lembongan, saya ingin bertanya tentang layanan perjalanan di Nusa Lembongan.";
const whatsappUrl = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(bookingMessage)}`
  : `https://wa.me/?text=${encodeURIComponent(bookingMessage)}`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = whatsappUrl;
});

const chatPanel = document.querySelector("#whatsappChat");
const chatToggle = document.querySelector("[data-chat-toggle]");
const chatClose = document.querySelector("[data-chat-close]");
const chatForm = document.querySelector("[data-chat-form]");
const chatMessage = document.querySelector("#chatMessage");

function setChatOpen(isOpen) {
  chatPanel.hidden = !isOpen;
  chatPanel.setAttribute("aria-hidden", String(!isOpen));
  chatToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    chatMessage.focus();
  } else {
    chatToggle.focus();
  }
}

chatToggle.addEventListener("click", () => {
  setChatOpen(chatPanel.hidden);
});

chatClose.addEventListener("click", () => {
  setChatOpen(false);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatMessage.value.trim();

  if (!message) {
    chatMessage.setCustomValidity("Silakan tulis pesan terlebih dahulu.");
    chatMessage.reportValidity();
    return;
  }

  chatMessage.setCustomValidity("");
  const text = `${bookingMessage}\n\n${message}`;
  const url = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank", "noopener,noreferrer");
  chatMessage.value = "";
  setChatOpen(false);
});

chatMessage.addEventListener("input", () => {
  chatMessage.setCustomValidity("");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatPanel.hidden) {
    setChatOpen(false);
  }
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
