// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Add active class to navigation items on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.highlight-card, .project-card, .skill-category, .publication-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.highlight-card, .project-card, .skill-category, .publication-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Trigger animation on page load
    setTimeout(animateOnScroll, 300);
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-toggle';
mobileMenuButton.innerHTML = '<i class="fas fa-angle-down"></i>';
document.querySelector('nav .container').prepend(mobileMenuButton);

const navList = document.querySelector('nav ul');
let isMenuOpen = false;

mobileMenuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navList.style.display = 'flex';
        mobileMenuButton.innerHTML = '<i class="fas fa-angle-up"></i>';
        mobileMenuButton.classList.add('active');
        navList.classList.add('active');
    } else {
        navList.style.display = 'none';
        mobileMenuButton.innerHTML = '<i class="fas fa-angle-down"></i>';
        mobileMenuButton.classList.remove('active');
        navList.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navList.style.display = 'none';
            mobileMenuButton.innerHTML = '<i class="fas fa-angle-down"></i>';
            isMenuOpen = false;
        }
    });
});

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768) {
        navList.style.display = 'flex';
    } else if (!isMenuOpen) {
        navList.style.display = 'none';
    }
}

window.addEventListener('resize', handleResize);

// Initialize with correct navigation state
handleResize();

// Work Experience Scroll
const scrollContainer = document.querySelector('.experience-scroll');
const scrollLeftBtn = document.querySelector('.scroll-indicator.left');
const scrollRightBtn = document.querySelector('.scroll-indicator.right');

if (scrollContainer) {
    // Calculate scroll amount based on card width + gap
    const scrollAmount = () => {
        if (window.innerWidth >= 1024) {
            return 650; // For larger screens
        } else if (window.innerWidth >= 768) {
            return 500; // For medium screens
        } else {
            return 300; // For mobile
        }
    };

    // Scroll left function
    const scrollLeft = () => {
        scrollContainer.scrollBy({
            left: -scrollAmount(),
            behavior: 'smooth'
        });
    };

    // Scroll right function
    const scrollRight = () => {
        scrollContainer.scrollBy({
            left: scrollAmount(),
            behavior: 'smooth'
        });
    };

    // Add click event listeners to scroll buttons
    if (scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', scrollLeft);
        scrollRightBtn.addEventListener('click', scrollRight);
    }

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    scrollContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    const handleSwipe = () => {
        const swipeThreshold = 50; // Minimum distance to trigger swipe
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe left
                scrollRight();
            } else {
                // Swipe right
                scrollLeft();
            }
        }
    };

    // Hide scroll indicators when at the start/end
    const checkScrollPosition = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        const isAtStart = scrollLeft === 0;
        const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
        
        if (scrollLeftBtn && scrollRightBtn) {
            scrollLeftBtn.style.opacity = isAtStart ? '0.3' : '0.9';
            scrollLeftBtn.style.cursor = isAtStart ? 'default' : 'pointer';
            scrollRightBtn.style.opacity = isAtEnd ? '0.3' : '0.9';
            scrollRightBtn.style.cursor = isAtEnd ? 'default' : 'pointer';
        }
    };

    // Initial check
    checkScrollPosition();

    // Check on scroll
    scrollContainer.addEventListener('scroll', checkScrollPosition);
    // Check on window resize
    window.addEventListener('resize', checkScrollPosition);
}

// Project Modal Functionality
const projectModal = document.createElement('div');
projectModal.className = 'project-modal';
projectModal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h3>项目详情</h3>
            <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
            <!-- Modal content will be inserted here -->
        </div>
    </div>
`;
document.body.appendChild(projectModal);

// Add event listeners to project buttons
document.addEventListener('DOMContentLoaded', () => {
    const projectButtons = document.querySelectorAll('.project-more-btn');
    const closeModal = document.querySelector('.close-modal');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectDetails = projectCard.querySelector('.project-details').innerHTML;
            
            // Update modal content
            const modal = document.querySelector('.project-modal');
            const modalHeader = modal.querySelector('.modal-header h3');
            const modalBody = modal.querySelector('.modal-body');
            
            modalHeader.textContent = projectTitle;
            modalBody.innerHTML = projectDetails;
            
            // Show modal with animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Trigger reflow to enable animation
            void modal.offsetWidth;
            
            // Animate in
            setTimeout(() => {
                modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        });
    });
    
    // Close modal when clicking close button
    closeModal.addEventListener('click', () => {
        closeProjectModal();
    });
    
    // Close modal when clicking outside content
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});

function closeProjectModal() {
    const modal = document.querySelector('.project-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Animate out
    modalContent.style.transform = 'translateY(20px)';
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }, 300);
}
