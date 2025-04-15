// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize theme from localStorage
    initializeTheme();
    
    // Add event listener to theme switcher
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', toggleTheme);
    }
    
    // Add form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
    
    // Add image modal functionality for gallery
    setupGalleryModal();
    
    // Add "Read More" functionality for blog
    setupBlogReadMore();
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

// Update theme switcher icon
function updateThemeIcon(isDark) {
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.innerHTML = isDark ? '☀️' : '🌙';
    }
}

// Form validation
function validateForm(event) {
    const form = event.target;
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    // Reset previous error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    // Validate name
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Nama harus diisi');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'Email tidak valid');
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        showError(messageInput, 'Pesan harus diisi');
        isValid = false;
    }
    
    if (!isValid) {
        event.preventDefault();
    } else {
        // Show success message
        showSuccessMessage(form);
        event.preventDefault(); // Prevent actual form submission for this example
    }
}

// Show error message
function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = 'red';
}

// Show success message
function showSuccessMessage(form) {
    // Hide the form
    form.style.display = 'none';
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.backgroundColor = '#4CAF50';
    successDiv.style.color = 'white';
    successDiv.style.padding = '20px';
    successDiv.style.borderRadius = '5px';
    successDiv.style.textAlign = 'center';
    successDiv.innerHTML = '<h3>Terima Kasih!</h3><p>Pesan Anda telah terkirim. Saya akan menghubungi Anda segera.</p>';
    
    // Add button to reset form
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Kirim Pesan Lagi';
    resetButton.style.backgroundColor = 'white';
    resetButton.style.color = '#4CAF50';
    resetButton.style.border = 'none';
    resetButton.style.padding = '10px 15px';
    resetButton.style.marginTop = '15px';
    resetButton.style.borderRadius = '3px';
    resetButton.style.cursor = 'pointer';
    
    resetButton.addEventListener('click', function() {
        form.reset();
        form.style.display = 'block';
        successDiv.remove();
    });
    
    successDiv.appendChild(resetButton);
    form.parentElement.appendChild(successDiv);
}

// Setup Gallery Modal
function setupGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length > 0) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.zIndex = '1000';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.overflow = 'auto';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        
        const modalContent = document.createElement('img');
        modalContent.className = 'modal-content';
        modalContent.style.margin = 'auto';
        modalContent.style.display = 'block';
        modalContent.style.maxWidth = '80%';
        modalContent.style.maxHeight = '80%';
        modalContent.style.position = 'absolute';
        modalContent.style.top = '50%';
        modalContent.style.left = '50%';
        modalContent.style.transform = 'translate(-50%, -50%)';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '15px';
        closeBtn.style.right = '35px';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.fontWeight = 'bold';
        closeBtn.style.cursor = 'pointer';
        
        modal.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add click events to gallery images
        galleryItems.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalContent.src = this.src;
            });
        });
        
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside the image
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Setup Blog Read More functionality
function setupBlogReadMore() {
    const articles = document.querySelectorAll('article');
    
    articles.forEach(article => {
        const articleContent = article.querySelector('p');
        if (articleContent) {
            const fullText = articleContent.textContent;
            
            if (fullText.length > 100) {
                const shortText = fullText.substring(0, 100) + '...';
                articleContent.textContent = shortText;
                
                const readMoreLink = document.createElement('a');
                readMoreLink.href = '#';
                readMoreLink.className = 'read-more';
                readMoreLink.textContent = 'Baca Selengkapnya';
                
                readMoreLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    if (this.textContent === 'Baca Selengkapnya') {
                        articleContent.textContent = fullText;
                        this.textContent = 'Tutup';
                    } else {
                        articleContent.textContent = shortText;
                        this.textContent = 'Baca Selengkapnya';
                    }
                });
                
                article.appendChild(readMoreLink);
            }
        }
    });
}
