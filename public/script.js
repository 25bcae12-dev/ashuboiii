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
// Contact Form Submission (SAFE VERSION)
// ===============================
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const button = document.querySelector("button");

const loadingMessage = document.querySelector("#loadingMessage"); // Optional: Display loading message while processing

if (button) {
  button.addEventListener("click", async () => {

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const message = messageInput?.value.trim();

    // Check if fields are empty
    if (!name || !email || !message) {
      alert("Please fill all fields ❗");
      return;
    }

    // Email validation (basic check)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address ❌");
      return;
    }

    // Show loading message
    if (loadingMessage) loadingMessage.style.display = "block";

    try {
      const response = await fetch("https://portfolio-15xn.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully ✅");

        // Clear form after successful submission
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      } else {
        alert("Failed to send message ❌");
      }
      
    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    } finally {
      // Hide loading message
      if (loadingMessage) loadingMessage.style.display = "none";
    }
  });
}