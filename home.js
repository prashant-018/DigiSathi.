// Navigation functions
function navigateToChat(app) {
    // Add animation/transition before navigation
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        window.location.href = `chat.html?app=${app}`;
    }, 300);
}

// Search functionality
function searchHelp() {
    const query = document.getElementById('userQuery').value.trim();
    const button = document.querySelector('.search-bar button');
    
    if(query) {
        // Add loading indicator
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            window.location.href = `chat.html?query=${encodeURIComponent(query)}`;
        }, 500);
    } else {
        // Show error if query is empty
        const input = document.getElementById('userQuery');
        input.focus();
        input.style.border = '1px solid var(--error-color)';
        setTimeout(() => {
            input.style.border = 'none';
        }, 2000);
    }
}

// Keyboard accessibility
function setupKeyboardAccessibility() {
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
            }
        });
    });
    
    const searchInput = document.getElementById('userQuery');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchHelp();
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupKeyboardAccessibility();
});