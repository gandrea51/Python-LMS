// 1. Image Hover Zoom and Opacity
document.querySelector('.show-main-titles img').addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
    this.style.opacity = '0.8';
});
document.querySelector('.show-main-titles img').addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.opacity = '1';
});

// 2. Text Hover Effects for Titles
const showTitles = document.querySelectorAll('.show-title');
showTitles.forEach(title => {
    title.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.color = '#f39c12'; // Change color on hover
    });
    title.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.color = ''; // Reset color
    });
});

// 3. Toggle Book Details
document.querySelector('.show-title-principal').addEventListener('click', function() {
    const details = document.querySelector('.show-keys');
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
});

// 4. Scroll to Top Button
const scrollButton = document.createElement('button');
scrollButton.innerText = '↑';
scrollButton.classList.add('scroll-to-top');
document.body.appendChild(scrollButton);

scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

// 5. Floating Button Animation
const manageButton = document.querySelector('.manage-button');
manageButton.addEventListener('mouseenter', () => {
    manageButton.style.transform = 'rotate(360deg)';
    manageButton.style.transition = 'transform 0.5s ease';
});
manageButton.addEventListener('mouseleave', () => {
    manageButton.style.transform = 'rotate(0deg)';
});

// 6. Smooth Scroll (Anchor Links)
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
