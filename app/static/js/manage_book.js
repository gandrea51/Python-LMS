document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".manage-search input");
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


// Other

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.manage-search input[type="text"]');
    const dynamicList = document.querySelectorAll('.dynamic-item');

    // 1. Dynamic Search
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        dynamicList.forEach(item => {
            const title = item.querySelector('.book-title').textContent.toLowerCase();
            const author = item.querySelector('.book-author').textContent.toLowerCase();
            if (title.includes(filter) || author.includes(filter)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // 2. Highlight Search Match
    searchInput.addEventListener('input', () => {
        dynamicList.forEach(item => {
            const title = item.querySelector('.book-title');
            const author = item.querySelector('.book-author');
            title.innerHTML = title.textContent.replace(
                new RegExp(searchInput.value, 'gi'),
                match => `<span style="background-color: yellow">${match}</span>`
            );
            author.innerHTML = author.textContent.replace(
                new RegExp(searchInput.value, 'gi'),
                match => `<span style="background-color: yellow">${match}</span>`
            );
        });
    });

    // 3. Hover Effect for Items
    dynamicList.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f0f4f8';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = '#f8f9fa';
        });
    });

    // 4. Button Click Animation
    const buttons = document.querySelectorAll('.action-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // 5. Auto-scroll to First Result
    searchInput.addEventListener('input', () => {
        const visibleItem = [...dynamicList].find(item => item.style.display === '');
        if (visibleItem) {
            visibleItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // 6. Flash Animation on Search
    searchInput.addEventListener('focus', () => {
        searchInput.style.boxShadow = '0 0 10px rgba(50, 150, 250, 0.8)';
    });
    searchInput.addEventListener('blur', () => {
        searchInput.style.boxShadow = 'none';
    });
});
