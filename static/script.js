const quoteContainer = document.getElementById('quote-container');
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input');
const categoryInput = document.getElementById('category-input');
const addQuoteButton = document.getElementById('add-quote-button');
const quotesUl = document.getElementById('quotes-ul');
const sortByAuthorButton = document.getElementById('sort-by-author');
const sortByCategoryButton = document.getElementById('sort-by-category');
const getRandomQuoteApiButton = document.getElementById('get-random-quote-api');
const sendQuoteToEmailButton = document.getElementById('send-quote-to-email');
const emailErrorMessage = document.getElementById('email-error-message');
const generateQuoteButton = document.getElementById('generate-quote');
const generateErrorMessage = document.getElementById('generate-error-message');
const errorMessage = document.getElementById('error-message');

let quotes = [];

addQuoteButton.addEventListener('click', (e) => {
    e.preventDefault();
    const quote = quoteInput.value.trim();
    const author = authorInput.value.trim();
    const category = categoryInput.value.trim();

    if (quote && author && category) {
        fetch('/add_quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quote, author, category })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                quoteInput.value = '';
                authorInput.value = '';
                categoryInput.value = '';
                errorMessage.style.display = 'none';
                fetchQuotes();
            } else {
                errorMessage.textContent = 'Ошибка при добавлении цитаты';
                errorMessage.style.display = 'block';
            }
        });
    } else {
        errorMessage.textContent = 'Пожалуйста, заполните все поля: цитата, автор, категория.';
        errorMessage.style.display = 'block';
    }
});

function fetchQuotes() {
    fetch('/get_quotes')
        .then(response => response.json())
        .then(data => {
            quotes = data;
            renderQuotes();
        });
}

function renderQuotes() {
    quotesUl.innerHTML = '';
    quotes.forEach((quote) => {
        const li = document.createElement('li');
        li.textContent = `"${quote[0]}" - ${quote[1]} [${quote[2]}]`;
        quotesUl.appendChild(li);
    });
}

sortByAuthorButton.addEventListener('click', () => {
    quotes.sort((a, b) => a[1].localeCompare(b[1]));
    renderQuotes();
});

sortByCategoryButton.addEventListener('click', () => {
    quotes.sort((a, b) => a[2].localeCompare(b[2]));
    renderQuotes();
});

generateQuoteButton.addEventListener('click', () => {
    if (quotes.length === 0) {
        generateErrorMessage.textContent = 'Список цитат пуст! Пожалуйста, добавьте цитаты.';
        generateErrorMessage.style.display = 'block';
        return;
    }

    generateErrorMessage.style.display = 'none';

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteContainer.innerHTML = `
        <p>${randomQuote[0]}</p>
        <p>— ${randomQuote[1]}</p>
        <p><em>Категория: ${randomQuote[2]}</em></p>
    `;
});

getRandomQuoteApiButton.addEventListener('click', () => {
    fetch('/get_random_quote_api')
        .then(response => response.json())
        .then(data => {
            document.getElementById('api-quote').textContent = data.q;
            document.getElementById('api-author').textContent = `— ${data.a}`;
        });
});

sendQuoteToEmailButton.addEventListener('click', () => {
    const email = document.getElementById('email-input').value.trim();

    if (!email) {
        emailErrorMessage.textContent = 'Пожалуйста, введите email.';
        emailErrorMessage.style.color = 'red';
        emailErrorMessage.style.display = 'block';
        return;
    }

    if (quotes.length === 0) {
        emailErrorMessage.textContent = 'Список цитат пуст! Пожалуйста, добавьте цитаты.';
        emailErrorMessage.style.color = 'red';
        emailErrorMessage.style.display = 'block';
        return;
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    fetch('/send_quote_to_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, quote: randomQuote[0], author: randomQuote[1] })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            emailErrorMessage.textContent = 'Цитата отправлена на email';
            emailErrorMessage.style.color = 'green';
            emailErrorMessage.style.display = 'block';
        } else {
            emailErrorMessage.textContent = 'Ошибка при отправке цитаты на email';
            emailErrorMessage.style.color = 'red';
            emailErrorMessage.style.display = 'block';
        }
    });
});

fetchQuotes();