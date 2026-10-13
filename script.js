const WHATSAPP_NUMBER = "6281278250336";
const bookingMessage = "Hello AneX Taxi Lembongan, I'd like to ask about your transport services in Nusa Lembongan.";
const whatsappUrl = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(bookingMessage)}`
  : `https://wa.me/?text=${encodeURIComponent(bookingMessage)}`;

const pageLoader = document.querySelector("#pageLoader");
const siteNav = document.querySelector(".site-nav");

function updateNavOnScroll() {
  siteNav.classList.toggle("is-scrolled", window.scrollY > 20);
}

updateNavOnScroll();
window.addEventListener("scroll", updateNavOnScroll, { passive: true });

function hidePageLoader() {
  window.setTimeout(() => {
    pageLoader.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("is-loading");
  }, 500);
}

if (document.readyState === "complete") {
  hidePageLoader();
} else {
  window.addEventListener("load", hidePageLoader, { once: true });
}

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  const message = link.dataset.whatsappMessage || bookingMessage;
  const url = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
  link.href = url;
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
    chatMessage.setCustomValidity("Please write a message first.");
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
