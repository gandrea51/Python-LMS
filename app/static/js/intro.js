// Effect 1: Navbar brand bounce effect on hover
document.querySelector('.navbar-brand').addEventListener('mouseover', function () {
    this.classList.add('bounce');
});

document.querySelector('.navbar-brand').addEventListener('mouseout', function () {
    this.classList.remove('bounce');
});



// Effect 3: Navbar links pulsating effect on hover
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
        this.classList.add('pulse');
    });
    link.addEventListener('mouseout', function () {
        this.classList.remove('pulse');
    });
});



// Effect 5: Background color change on mouse enter and leave
document.querySelector('.navbar').addEventListener('mouseenter', function () {
    this.style.background = 'linear-gradient(45deg, #FF4B2B, #FF416C)';
});

document.querySelector('.navbar').addEventListener('mouseleave', function () {
    this.style.background = 'linear-gradient(45deg, #6a11cb, #2575fc)';
});

// Effect 6: Text shadow animation on nav items when hovered
navLinks.forEach(link => {
    link.addEventListener('mouseover', function () {
        this.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
    });
    link.addEventListener('mouseout', function () {
        this.style.textShadow = 'none';
    });
});

// Effect 1: Title animation on hover (scale and rotate)
document.querySelector('.the-title').addEventListener('mouseover', function () {
    this.style.transform = 'scale(1.1) rotate(-5deg)';
});

document.querySelector('.the-title').addEventListener('mouseout', function () {
    this.style.transform = 'scale(1) rotate(0deg)';
});

// Effect 2: Subtitle glow effect on hover
document.querySelector('.the-subtitle').addEventListener('mouseover', function () {
    this.style.color = '#fff';
    this.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.8)';
});

document.querySelector('.the-subtitle').addEventListener('mouseout', function () {
    this.style.color = '#ffdf00';
    this.style.textShadow = 'none';
});

// Effect 3: Motto moves up and changes color when hovered
document.querySelector('.the-motto').addEventListener('mouseover', function () {
    this.style.transform = 'translateY(-5px)';
    this.style.color = '#ffdf00';
});

document.querySelector('.the-motto').addEventListener('mouseout', function () {
    this.style.transform = 'translateY(0)';
    this.style.color = '#ddd';
});

// Effect 4: Fade-in effect for header section on page load
window.addEventListener('load', function () {
    document.querySelector('.first-part-header').style.opacity = '1';
    document.querySelector('.first-part-header').style.transition = 'opacity 2s';
});

// Effect 5: Subtitle background transition effect on hover
document.querySelector('.the-subtitle').addEventListener('mouseover', function () {
    this.style.background = 'linear-gradient(45deg, #ff4b2b, #ff416c)';
    this.style.backgroundClip = 'text';
    this.style.webkitBackgroundClip = 'text';
});

// Effect 6: Parallax scrolling effect on background image
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header-area');
    const scrollPosition = window.scrollY;
    header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
});

document.addEventListener('DOMContentLoaded', () => {
    // Effect 1: Fade-in Animation
    const mainSection = document.querySelector('.area-HowToReach');
    mainSection.style.opacity = '0';
    setTimeout(() => {
        mainSection.style.opacity = '1';
    }, 300);

    // Effect 2: Hover Bounce Effect for List Items
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateY(-10px)';
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Effect 3: Glow Animation on Title Hover
    document.querySelector('.come-on-title').addEventListener('mouseover', function () {
        this.style.textShadow = '0 0 30px #f85032, 0 0 50px #e73827';
    });

    document.querySelector('.come-on-title').addEventListener('mouseout', function () {
        this.style.textShadow = '';
    });

    // Effect 4: Click Ripple Effect on List Items
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - item.offsetLeft}px`;
            ripple.style.top = `${e.clientY - item.offsetTop}px`;
            item.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Effect 5: Background Image Scroll Effect
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        mainSection.style.backgroundPosition = `center ${scrollPos * 0.5}px`;
    });

    // Effect 6: Random Color Change on List Hover
    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.background = `linear-gradient(45deg, ${randomColor()}, ${randomColor()})`;
        });
        item.addEventListener('mouseout', () => {
            item.style.background = 'linear-gradient(45deg, #6a11cb, #2575fc)';
        });
    });

    function randomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer-area');
    const links = document.querySelectorAll('.the-ft-item a');
    const titles = document.querySelectorAll('.the-ft-title, .the-ft-lk-title, .the-ft-at-title');

    // Effect 1: Fade-in Animation
    footer.style.opacity = '0';
    setTimeout(() => {
        footer.style.opacity = '1';
    }, 500);

    // Effect 2: Hover Ripple Effect on Links
    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            link.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });

    // Effect 3: Hover Glow Animation on Titles
    titles.forEach(title => {
        title.addEventListener('mouseover', () => {
            title.style.textShadow = '0 0 30px #ff9a9e, 0 0 50px #fad0c4';
        });

        title.addEventListener('mouseout', () => {
            title.style.textShadow = '';
        });
    });

    // Effect 4: Click Sparkle Effect on Footer
    footer.addEventListener('click', (e) => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });

    // Effect 5: Random Background Change
    setInterval(() => {
        const colors = ['#833ab4', '#fd1d1d', '#fcb045', '#3a1c71', '#d76d77', '#ffaf7b'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        footer.style.background = `linear-gradient(135deg, ${randomColor}, ${colors[Math.floor(Math.random() * colors.length)]})`;
    }, 10000);

    // Effect 6: Bounce-in Effect on Scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.style.transform = 'scale(1)';
                footer.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    footer.style.transform = 'scale(0.9)';
    footer.style.opacity = '0';
    observer.observe(footer);
});
