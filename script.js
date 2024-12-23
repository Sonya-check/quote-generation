// script.js
const quoteContainer = document.getElementById('quote-container');
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input');
const addQuoteButton = document.getElementById('add-quote-button');
const quotesList = document.getElementById('quotes-list');
const quotesUl = document.getElementById('quotes-ul');
const sortByAuthorButton = document.getElementById('sort-by-author');
const sortByCategoryButton = document.getElementById('sort-by-category');
const getRandomQuoteApiButton = document.getElementById('get-random-quote-api');
const sendQuoteToEmailButton = document.getElementById('send-quote-to-email');

let quotes = [];

// добавление новой цитаты
addQuoteButton.addEventListener('click', (e) => {
    e.preventDefault();
    const quote = quoteInput.value.trim();
    const author = authorInput.value.trim();
    if (quote && author) {
        quotes.push({ quote, author });
        quoteInput.value = '';
        authorInput.value = '';
        renderQuotes();
    }
});

// рендер списка цитат
function renderQuotes() {
    quotesUl.innerHTML = '';
    quotes.forEach((quote) => {
        const li = document.createElement('li');
        li.textContent = `${quote.quote} - ${quote.author}`;
        quotesUl.appendChild(li);
    });
}

// сортировка цитат по авторам
sortByAuthorButton.addEventListener('click', () => {
    quotes.sort((a, b) => a.author.localeCompare(b.author));
    renderQuotes();
});

// сортировка цитат по категориям (не реализовано)
sortByCategoryButton.addEventListener('click', () => {
    console.log('Сортировка по категориям не реализована');
});

// получение случайной цитаты из API (не реализовано)
getRandomQuoteApiButton.addEventListener('click', () => {
    console.log('Получение случайной цитаты из API не реализовано');
});

// отправка цитаты на email (не реализовано)
sendQuoteToEmailButton.addEventListener('click', () => {
    console.log('Отправка цитаты на email не реализована');
});

// генерация случайной цитаты
document.getElementById('generate-quote').addEventListener('click', () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteContainer.innerHTML = `
        <p>${randomQuote.quote}</p>
        <p>${randomQuote.author}</p>
    `;
});