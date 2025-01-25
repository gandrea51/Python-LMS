document.querySelectorAll('.book-title').forEach(title => {
    title.addEventListener('mouseover', function() {
        this.style.color = '#f39c12';
    });
    title.addEventListener('mouseout', function() {
        this.style.color = '';
    });
});

document.querySelectorAll('.book-cover').forEach(cover => {
    cover.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    cover.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.book-item').forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = 1;
            item.style.transition = 'opacity 1s';
        }, index * 300);
    });
});


document.querySelectorAll('.book-title').forEach(title => {
    title.addEventListener('click', function() {
        const bookItem = this.closest('.book-item');
        const details = bookItem.querySelector('.book-author, .book-keywords, .book-cover');
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
        bookItem.style.transition = 'transform 0.3s ease-in-out';
    });
});

const searchInput = document.querySelector('#keywords');
const searchButton = document.querySelector('.search-button');

searchInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        searchButton.style.backgroundColor = '#2980b9';
        searchButton.style.color = 'white';
    } else {
        searchButton.style.backgroundColor = '';
        searchButton.style.color = '';
    }
});

document.querySelectorAll('.book-title').forEach(title => {
    title.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: this.closest('.book-item').offsetTop - 50,
            behavior: 'smooth'
        });
    });
});


document.querySelector('.book-search-form').addEventListener('mouseover', function() {
    const searchInput = this.querySelector('input');
    searchInput.style.transform = 'scale(1.05)';
    searchInput.style.transition = 'transform 0.3s ease';
});

document.querySelector('.book-search-form').addEventListener('mouseout', function() {
    const searchInput = this.querySelector('input');
    searchInput.style.transform = 'scale(1)';
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".book-find input");
    const bookItems = document.querySelectorAll(".dynamic-list .dynamic-item");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();

        bookItems.forEach((item) => {
            const text = item.textContent.toLowerCase();

            // Show or hide the item based on whether it matches the query
            if (text.includes(query)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});