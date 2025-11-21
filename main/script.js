const typingTexts = ['BSIT Student', 'Aspiring Web Designer', 'Graphic Designer', 'Event Production Head', 'A.K.A Eych'];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById('typing-text');
    const currentText = typingTexts[typingIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
    typingElement.textContent = currentText.substring(0, charIndex);
    
    if (!isDeleting && charIndex === currentText.length) {
        // Pause before deleting
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// ============================================
// DARK MODE TOGGLE
// ============================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference from localStorage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// ============================================
// RESUME DOWNLOAD
// ============================================

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Resume.Catpay.pdf';
    link.download = 'Resume.Catpay.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================
// OPEN FCFS CALCULATOR
// ============================================

function openFCFSCalculator() {
    // Open in new window or can be embedded in modal
    window.open('fcfs-calculator.html', 'FCFS_Calculator', 'width=1200,height=900,scrollbars=yes,resizable=yes');
}

// ============================================
// CERTIFICATE UPDATE
// ============================================

function openEcommerce() {
    // Open in new window or can be embedded in modal
    window.open('https://appsdev-midterm.vercel.app/');
}

function updateCertificate(element) {
    const imageUrl = prompt('Enter the image URL for your certificate:');
    if (imageUrl) {
        const certThumbnail = element.querySelector('.cert-thumbnail');
        certThumbnail.innerHTML = `<img src="${imageUrl}" alt="Certificate" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`;
    }
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================

/**
 * Opens modal with content based on type (project, design, certificate)
 * @param {string} type - Type of modal content
 * @param {string} title - Title of the item
 * @param {string} description - Description content
 * @param {string} imagePath - Optional image path for design mockups
 */
function openModal(type, title, description, imagePath = null) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    let content = '';

    switch (type) {
        case 'project':
            content = `
                <h3>${title}</h3>
                <p>${description}</p>
                <p style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
                    <strong>Technologies:</strong> HTML, CSS, JavaScript, React
                </p>
                <p style="margin-top: 1rem;">
                    <strong>Live Link:</strong> <a href="#" style="color: #667eea; text-decoration: none;">View Live Project →</a>
                </p>
            `;
            break;

        case 'design':
            const imageHtml = imagePath ? `<img src="${imagePath}" alt="${title}" style="margin-top: 1.5rem; width: 100%; border-radius: 12px; object-fit: cover; max-height: 400px;">` : `<div style="margin-top: 1.5rem; width: 100%; height: 300px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem;">📐</div>`;
            content = `
                <h3 style="color: #3a3a3aff">${title}</h3>
                <p style="color: #3a3a3aff">${description}</p>
                ${imageHtml}
                <p style="color: #3a3a3aff" margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
                    <strong>Tools Used:</strong> Adobe Illustrator, Adobe Photoshop
                </p>
            `;
            break;

        case 'certificate':
            content = `
                <h3>🏆 ${title}</h3>
                <p>${description}</p>
                <div style="margin-top: 1.5rem; width: 100%; height: 250px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 4rem;">
                    ✓
                </div>
                <p style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e2e8f0;">
                    <strong>Credential ID:</strong> CERT-2024-001234
                </p>
            `;
            break;

        default:
            content = `<h3>${title}</h3><p>${description}</p>`;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the modal
 */
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');

    // Re-enable body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Closes modal when clicking on backdrop
 * @param {Event} event - Click event
 */
function closeModalOnBackdrop(event) {
    if (event.target.id === 'modal') {
        closeModal();
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

/**
 * Close modal with ESC key
 */
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// RESUME DOWNLOAD
// ============================================

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    typeEffect();

    // Add intersection observer for animations if needed
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards for animation
    document.querySelectorAll('.card').forEach((card) => {
        observer.observe(card);
    });
});
