// ===============================
// 🔗 BACKEND URL (IMPORTANT)
// ===============================
const API_URL = "https://portfolio-backend-8om0.onrender.com";

// ===============================
// 🌙 THEME TOGGLE
// ===============================
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.onclick = () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
  };
}

// ===============================
// 📜 SMOOTH SCROLL FUNCTION
// ===============================
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// ===============================
// ✨ SCROLL REVEAL ANIMATION
// ===============================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ===============================
// 📩 CONTACT FORM (FINAL)
// ===============================
const form = document.getElementById("contactForm");
const btn = document.getElementById("submitBtn");
const status = document.getElementById("status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values
    const name = form.querySelector("input[type='text']").value.trim();
    const email = form.querySelector("input[type='email']").value.trim();
    const message = form.querySelector("textarea").value.trim();

    // Basic validation
    if (!name || !email || !message) {
      status.innerText = "⚠️ Please fill all fields properly.";
      return;
    }

    // UI loading
    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (!res.ok) throw new Error("Server error");

      // SUCCESS MESSAGE (PROFESSIONAL 🔥)
      status.innerText =
        "✅ Message sent successfully. I will get back to you shortly.";

      form.reset();

    } catch (error) {
      console.error("ERROR:", error);

      status.innerText =
        "❌ Failed to send message. Please try again later.";
    }

    // Reset button
    btn.innerText = "Send Message";
    btn.disabled = false;
  });
}