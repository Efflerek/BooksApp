'use strict';

const select = {
  templateOf: {
    book: '#template-book',
  },
  wrapper: {
    bookList: '.books-list',
    cover: '.book__image',
    filters: '.filters',
  },
  class: {
    favoriteBook: 'favorite',
    hidden: 'hidden',
  },
  form: '.filters form',
};

const templates = {
  booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
};

class BooksList {
  constructor() {
    const thisBookList = this;
    thisBookList.initData();
    thisBookList.getElements();
    thisBookList.render();
    thisBookList.initActions();
  }

  initData() {
    const thisBookList = this;
    thisBookList.data = dataSource.books;
  }

  getElements() {
    const thisBookList = this;
    thisBookList.bookListWrapper = document.querySelector(select.wrapper.bookList);
    thisBookList.filterWrapper = document.querySelector(select.wrapper.filters);
    thisBookList.favoriteBooks = [];
    thisBookList.filters = [];
  }

  render() {
    const thisBookList = this;
    for (let book of thisBookList.data) {
      const generatedHTML = templates.booksList(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBookList.bookListWrapper.appendChild(element);
    }
  }

  initActions() {
    const thisBookList = this;
    thisBookList.bookListWrapper.addEventListener('click', function (event) {
      event.preventDefault();
    });
    thisBookList.bookListWrapper.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedElement = event.target.offsetParent;
      if (clickedElement.classList.contains('book__image')) {
        const id = clickedElement.getAttribute('data-id');
        if (!clickedElement.classList.contains(select.class.favoriteBook)) {
          clickedElement.classList.add(select.class.favoriteBook);
          thisBookList.favoriteBooks.push(id);
        } else {
          clickedElement.classList.remove(select.class.favoriteBook);
          const i = thisBookList.favoriteBooks.indexOf(id);
          thisBookList.favoriteBooks.splice(i, 1);
        }
      }
    });
    thisBookList.filterWrapper.addEventListener('click', function (event) {
      const clickedElement = event.target;
      if (
        clickedElement.tagName === 'INPUT' &
        clickedElement.name === 'filter' &
        clickedElement.type === 'checkbox'
      ) {
        if (clickedElement.checked) {
          thisBookList.filters.push(clickedElement.value);
        } else {
          const i = thisBookList.filters.indexOf(clickedElement.value);
          thisBookList.filters.splice(i, 1);
        }
        thisBookList.filterBooks();
      }
    });
  }

  filterBooks() {
    const thisBookList = this;
    for (let book of thisBookList.data) {
      let shouldBeHidden = false;
      for (let filter of thisBookList.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookDataID = document.querySelector(
        select.wrapper.cover + '[data-id="' + book.id + '"]'
      );
      if (shouldBeHidden) {
        bookDataID.classList.add(select.class.hidden);
      } else {
        bookDataID.classList.remove(select.class.hidden);
      }
    }
  }
}

const app = {
  init () {
    new BooksList();
  },
};

app.init();
