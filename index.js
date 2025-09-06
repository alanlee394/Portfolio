// Auto-collapse navigation after 3 seconds
    setTimeout(() => {
    const navPills = document.querySelectorAll('.nav-pill');
    navPills.forEach(pill => {
    pill.classList.remove('expanded');
    pill.classList.add('collapsed');
    });
    }, 3000);

    // Handle navigation clicks and scrolling
    document.querySelectorAll('.nav-item').forEach((item, index) => {
    item.addEventListener('click', function() {
    // Remove active from all items
    document.querySelectorAll('.nav-item').forEach(navItem => {
    navItem.classList.remove('active');
    });
    // Add active to clicked item
    this.classList.add('active');
    
    // Scroll to corresponding section
    const sections = ['hero-section', 'experience', 'contact'];
    const targetSection = document.getElementById(sections[index]) || document.querySelector('.' + sections[index]);
    if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    });
    });

    // Smooth scroll for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
    target.scrollIntoView({
    behavior: 'smooth'
    });
    }
    });
    });

    // Add hover effect to nav items
    document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
    if (this.querySelector('.nav-pill').classList.contains('collapsed')) {
    this.style.transform = 'scale(1.05)';
    }
    });
    
    item.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    });
    });

    // Typing Effect

    const bioText = document.querySelector('.bio');
    const originalText = bioText.textContent;
    let charIndex = 0;
    
    bioText.textContent = '';
    function typeWriter() {
    if (charIndex < originalText.length) {
    bioText.textContent += originalText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 20);
    }
    }
    setTimeout(typeWriter, 1500);
    

// EmailJS Form Handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('form-status');
    
    // Change button state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    
    // EmailJS parameters
    const serviceID = 'service_l7jfj7m'; // Replace with your EmailJS Service ID
    const templateID = 'template_3zfg78i'; // Replace with your EmailJS Template ID
    
    // Send email using EmailJS
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // Success
            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            submitBtn.style.background = '#10b981';
            
            formStatus.style.display = 'block';
            formStatus.style.color = '#10b981';
            formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                
            // Reset form
            this.reset();
            
            // Reset buttonafter 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = '';
                formStatus.style.display = 'none';
            }, 3000);
            
        }, (error) => {
            // Error
            console.error('EmailJS error:', error);
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            
            formStatus.style.display = 'block';
            formStatus.style.color = '#ef4444';
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
});