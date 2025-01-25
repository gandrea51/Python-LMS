// Input Focus Glow
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', (event) => {
        event.target.style.animation = "input-focus-effect 0.5s alternate infinite";
    });

    input.addEventListener('blur', (event) => {
        event.target.style.animation = "";
    });
});

// Real-Time Validation
document.querySelector('#email').addEventListener('input', (event) => {
    const value = event.target.value;
    if (!value.includes('@')) {
        event.target.style.borderColor = 'red';
    } else {
        event.target.style.borderColor = '#6a11cb';
    }
});

// Password Strength Indicator
document.querySelector('#password').addEventListener('input', (event) => {
    const value = event.target.value;
    const strength = value.length >= 8 ? 'Strong' : 'Weak';
    const color = value.length >= 8 ? 'green' : 'orange';
    const indicator = document.getElementById('password');
    indicator.textContent = `Password strength: ${strength}`;
    indicator.style.color = color;
});

// Shake on Error
document.querySelector('.save-the-data').addEventListener('click', (event) => {
    const inputs = document.querySelectorAll('.form-control');
    let valid = true;
    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('shake');
            valid = false;
        }
    });
    if (!valid) {
        event.preventDefault();
        setTimeout(() => {
            inputs.forEach(input => input.classList.remove('shake'));
        }, 500);
    }
});
