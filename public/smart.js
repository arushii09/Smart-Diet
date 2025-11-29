
  function getStarted() {
    window.location.href = "signup/login.html"; // Replace with your actual login page path
  }

 function tryScanner() {
    window.location.href = "signup/scan.html"; // Replace with your actual login page path
  }

  function createAcc() {
    window.location.href = "signup/login.html"; // Replace with your actual login page path
  }

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
    