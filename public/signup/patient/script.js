function getStarted() {
  window.location.href = "start.html";
}
/*
document.getElementById("healthForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    height: formData.get("height"),
    weight: formData.get("weight"),
    goal: formData.get("goal"),
    conditions: formData.get("conditions"),
  };
  const response = await fetch("/mealplan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById("mealplanOutput").innerText = result.mealplan || "No plan generated yet.";
});
*/
        // Simple animation on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const featureCards = document.querySelectorAll('.feature-card, .community-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            featureCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
            
            // Button hover effects
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // Scanner animation
            const scannerLine = document.querySelector('.scanner-line');
            setInterval(() => {
                scannerLine.style.animation = 'none';
                setTimeout(() => {
                    scannerLine.style.animation = 'scan 2s infinite';
                }, 10);
            }, 4000);
        });
    