// Fade in the header title
const header = document.querySelector('.abt-title');
header.style.opacity = '0';
header.style.transition = 'opacity 2s';
setTimeout(() => {
    header.style.opacity = '1';
}, 500);

// Slide up effect for each article
document.querySelectorAll('.person-profile').forEach((profile, index) => {
    profile.style.transform = 'translateY(50px)';
    profile.style.opacity = '0';
    profile.style.transition = `transform 0.6s ease ${index * 0.2}s, opacity 0.6s ease ${index * 0.2}s`;
    window.addEventListener('scroll', () => {
        if (profile.getBoundingClientRect().top < window.innerHeight - 50) {
            profile.style.transform = 'translateY(0)';
            profile.style.opacity = '1';
        }
    });
});

// Highlight role titles on hover
document.querySelectorAll('.role-title').forEach((title) => {
    title.addEventListener('mouseenter', () => {
        title.style.color = '#ff7171';
    });
    title.addEventListener('mouseleave', () => {
        title.style.color = '#6a11cb';
    });
});

// Contact form validation
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    const inputs = document.querySelectorAll('.form-control');
    let isValid = true;
    inputs.forEach((input) => {
        if (!input.value) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    if (!isValid) {
        e.preventDefault();
        alert('Please fill in all fields!');
    }
});

// Add shake effect to button
const button = document.querySelector('.save-the-message');
button.addEventListener('click', () => {
    button.classList.add('shake');
    setTimeout(() => button.classList.remove('shake'), 500);
});

// Real-time character count for textarea
const messageInput = document.querySelector('#message');
const messageText = document.querySelector('#message ~ .form-text');
messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    messageText.textContent = `${length}/500 characters`;
    if (length > 500) {
        messageInput.style.borderColor = 'red';
    } else {
        messageInput.style.borderColor = '#6a11cb';
    }
});
