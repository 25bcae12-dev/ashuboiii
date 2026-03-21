// ===============================
// Animation only
// ===============================
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));


// ===============================
// Contact Form Submission (FIXED SAFE VERSION)
// ===============================
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", async () => {

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const message = messageInput?.value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      const response = await fetch("https://portfolio-cjzh.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully ✅");

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      } else {
        alert("Failed to send message ❌");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    }
  });
}