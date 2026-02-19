document.addEventListener('DOMContentLoaded', () => {

    // ==================== EMAIL COPY TO CLIPBOARD ====================
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('gesiray@gmail.com').then(() => {
                // Optional: show a small toast/tooltip feedback
                emailLink.setAttribute('title', 'Copied!');
                setTimeout(() => emailLink.removeAttribute('title'), 2000);
            });
        });
    }

});