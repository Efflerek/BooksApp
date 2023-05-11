'use strict';

const app = {
  initMenu: function() {
    const thisApp = this;
    for (let book in thisApp.data.books) {
      new Book(book, thisApp.data.books[book]);
    }
  },

  initData: function() {
    const thisApp = this;
    thisApp.data = dataSource;
  },

  render: function() {
    const thisApp = this;
    const template = document.querySelector('#template-book').innerHTML;
    const booksList = document.querySelector('.books-list');

    for (let book in thisApp.data.books) {
      const bookData = thisApp.data.books[book];

      const bookElement = document.createElement('li');
      bookElement.innerHTML = template.replace(/{{(.*?)}}/g, (match, key) => bookData[key.trim()]);

      booksList.appendChild(bookElement);
    }
  },

  initActions() {
    const thisApp = this;
    const bookListElement = document.querySelector('.books-list');
    const bookImageElements = bookListElement.querySelectorAll('.book__image');

    for (let element of bookImageElements) {
      element.addEventListener('dblclick', function() {
        const bookId = element.getAttribute(thisApp.data.books.id);
        console.log(bookId);
        thisApp.addToFavorites(bookId);
        element.classList.add('.favorite');
      });
    }
  },

  addToFavorites(bookId) {
    const thisApp = this;
    thisApp.favoriteBooks.push(bookId);
  },

  init: function() {
    const thisApp = this;

    thisApp.initData();
    thisApp.render();
    thisApp.favoriteBooks = []; // Inicjalizacja pustej tablicy favoriteBooks
    thisApp.initActions();
  }
};

app.init();
