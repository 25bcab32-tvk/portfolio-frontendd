const API_URL = "https://portfolio-backend-8om0.onrender.com";

// THEME TOGGLE
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
};

// SCROLL FUNCTION
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

// SCROLL ANIMATION
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

// FORM
const form = document.getElementById("contactForm");
const btn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form[0].value;
  const email = form[1].value;
  const message = form[2].value;

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

    if (!res.ok) throw new Error();

    document.getElementById("status").innerText =
      "✅ Message sent successfully. We will contact you soon.";

    form.reset();

  } catch {
    document.getElementById("status").innerText =
      "❌ Failed to send message. Try again.";
  }

  btn.innerText = "Send Message";
  btn.disabled = false;
});