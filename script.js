// script.js
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
const generateQuoteButton = document.getElementById('generate-quote');

let quotes = [];

// добавление новой цитаты
addQuoteButton.addEventListener('click', (e) => {
    e.preventDefault();
    const quote = quoteInput.value.trim();
    const author = authorInput.value.trim();
    const category = categoryInput.value.trim(); // Получаем категорию

    if (quote && author && category) {
        quotes.push({ quote, author, category }); // Добавляем категорию к объекту цитаты
        quoteInput.value = '';
        authorInput.value = '';
        categoryInput.value = '';
        renderQuotes();
    } else {
        alert('Пожалуйста, заполните все поля: цитата, автор, категория.');
    }
});

// рендер списка цитат
function renderQuotes() {
    quotesUl.innerHTML = '';
    quotes.forEach((quote) => {
        const li = document.createElement('li');
        li.textContent = `"${quote.quote}" - ${quote.author} [${quote.category}]`; // Добавляем категорию в отображение
        quotesUl.appendChild(li);
    });
}

// сортировка цитат по авторам
sortByAuthorButton.addEventListener('click', () => {
    quotes.sort((a, b) => a.author.localeCompare(b.author));
    renderQuotes();
});

// сортировка цитат по категориям
sortByCategoryButton.addEventListener('click', () => {
    quotes.sort((a, b) => a.category.localeCompare(b.category));
    renderQuotes();
});

// получение случайной цитаты из списка
generateQuoteButton.addEventListener('click', () => {
    if (quotes.length === 0) {
        alert('Список цитат пуст! Пожалуйста, добавьте цитаты.');
        return;
    }
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteContainer.innerHTML = `
        <p>${randomQuote.quote}</p>
        <p>— ${randomQuote.author}</p>
        <p><em>Категория: ${randomQuote.category}</em></p>
    `;
});

// получение случайной цитаты из API (не реализовано)
getRandomQuoteApiButton.addEventListener('click', () => {
    console.log('Получение случайной цитаты из API не реализовано');
});

// отправка цитаты на email (не реализовано)
sendQuoteToEmailButton.addEventListener('click', () => {
    console.log('Отправка цитаты на email не реализована');
});