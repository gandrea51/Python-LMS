// JavaScript Effects

// 1. Header Background Change on Hover
const header = document.querySelector(".form-header");
header.addEventListener("mouseenter", () => {
    header.style.background = "linear-gradient(90deg, #ff758c, #ff7eb3)";
    header.style.transition = "background 0.5s ease-in-out";
});
header.addEventListener("mouseleave", () => {
    header.style.background = "linear-gradient(90deg, #6a11cb, #2575fc)";
});

// 2. Highlight Input Field on Focus
document.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("focus", () => {
        input.style.backgroundColor = "#f9f9ff";
    });
    input.addEventListener("blur", () => {
        input.style.backgroundColor = "#fff";
    });
});

// 3. Form Submit Button Ripple Effect
const button = document.querySelector(".save-the-data");
button.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX - e.target.offsetLeft}px`;
    ripple.style.top = `${e.clientY - e.target.offsetTop}px`;
    e.target.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// 4. Flash Message Auto-Close
const flashMessage = document.querySelector(".form-messages");
if (flashMessage) {
    setTimeout(() => {
        flashMessage.style.opacity = "0";
        flashMessage.style.transition = "opacity 1s ease-out";
    }, 5000); // Auto-close after 5 seconds
}

// 5. Real-Time Character Counter for Keywords
const keywords = document.querySelector("#keywords");
const charCounter = document.createElement("div");
charCounter.style.fontSize = "0.8rem";
charCounter.style.textAlign = "right";
charCounter.style.color = "#666";
keywords.parentNode.appendChild(charCounter);

keywords.addEventListener("input", () => {
    const maxChars = 200;
    const currentLength = keywords.value.length;
    charCounter.textContent = `${currentLength}/${maxChars} characters`;
    if (currentLength > maxChars) {
        charCounter.style.color = "red";
    } else {
        charCounter.style.color = "#666";
    }
});

// 6. Scroll Reveal for Form Elements
window.addEventListener("scroll", () => {
    document.querySelectorAll(".form-group").forEach((group) => {
        const rect = group.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            group.style.opacity = "1";
            group.style.transform = "translateY(0)";
            group.style.transition = "opacity 0.6s, transform 0.6s";
        } else {
            group.style.opacity = "0";
            group.style.transform = "translateY(20px)";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-modules");
    const inputs = document.querySelectorAll("input, textarea, select");
    const forbiddenWords = [
        "drop", "alter", "create", "update", "delete", "insert", "shutdown", "truncate", 
        "exec", "execute", "script", "cmd", "bash", "rm", "shutdown", "sudo", "reboot", 
        "chown", "chmod"
    ];

    const isSQLInjection = (value) => {
        const lowerValue = value.toLowerCase();
        return forbiddenWords.some((word) => lowerValue.startsWith(word));
    };

    const showError = (field, message) => {
        field.classList.add("is-invalid");
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains("error-message")) {
            errorElement = document.createElement("div");
            errorElement.className = "error-message";
            errorElement.style.color = "red";
            errorElement.style.marginTop = "5px";
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    };

    const removeError = (field) => {
        field.classList.remove("is-invalid");
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.remove();
        }
    };

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            const value = input.value.trim();

            // Check for SQL injection or OS commands
            if (isSQLInjection(value)) {
                showError(input, "Invalid input: SQL/OS commands are not allowed.");
                return;
            }

            // Check specific input requirements
            if (input.type === "text" && value.length < 3) {
                showError(input, "Input must be at least 3 characters long.");
                return;
            }

            if (input.type === "textarea" && value.length > 200) {
                showError(input, "Text is too long. Maximum 200 characters allowed.");
                return;
            }

            // If no errors
            removeError(input);
        });
    });

    form.addEventListener("submit", (e) => {
        let hasErrors = false;

        inputs.forEach((input) => {
            const value = input.value.trim();

            // Check for SQL injection or OS commands
            if (isSQLInjection(value)) {
                showError(input, "Invalid input: SQL/OS commands are not allowed.");
                hasErrors = true;
            }

            // General checks for empty fields
            if (!value) {
                showError(input, "This field is required.");
                hasErrors = true;
            }
        });

        // Prevent form submission if there are errors
        if (hasErrors) {
            e.preventDefault();
            alert("Please correct the errors in the form before submitting.");
        }
    });
});
