// Animation only
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
// Contact Form Submission (FIXED)
// ===============================
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#contactEmail").value.trim();
    const message = document.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      const response = await fetch("https://portfolio-k68c.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully ✅");

        document.querySelector("#name").value = "";
        document.querySelector("#contactEmail").value = "";
        document.querySelector("#message").value = "";
      } else {
        alert("Failed to send message ❌");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    }
  });
}