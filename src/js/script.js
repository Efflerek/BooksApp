/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.book__image',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(
      document.querySelector(select.templateOf.books).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      this.initData();
      this.getElements();
      this.render();
      this.initActions();
      this.setRating();
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      this.filters = [];
      this.favoriteBooks = [];
      this.bookContainer = document.querySelector(select.containerOf.books);
      this.filterContainer = document.querySelector(select.containerOf.filters);
    }

    render() {
      for (let book of this.data) {
        const ratingWidthTemp = 10 * book.rating;
        const ratingBgcTemp = this.setRating(book.rating);

        const bookHTML = templates.bookTemplate({
          id: book.id,
          price: book.price,
          name: book.name,
          image: book.image,
          rating: book.rating,
          ratingWidth: ratingWidthTemp,
          ratingBgc: ratingBgcTemp,
        });

        const bookDOM = utils.createDOMFromHTML(bookHTML);
        this.bookContainer.appendChild(bookDOM);
      }
    }

    setRating(rating) {
      let background;

      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      
      return background;
    }

    initActions() {
      const thisBooksList = this;

      const favoriteBooks = this.favoriteBooks;

      this.bookContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const clickedElement = event.target.offsetParent;

        if (clickedElement.classList.contains(select.book.image.substring(1))) {
          clickedElement.classList.toggle('favorite');
          let imageId = clickedElement.getAttribute('data-id');

          if (!favoriteBooks.includes(imageId)) favoriteBooks.push(imageId);
          else if (favoriteBooks.includes(imageId))
            favoriteBooks.splice(favoriteBooks.indexOf(imageId, 1));
        }
      });

      this.filterContainer.addEventListener('click', function (event) {
        const clickedElement = event.target;
        if (
          clickedElement.tagName === 'INPUT' &&
          clickedElement.name === 'filter' &&
          clickedElement.type === 'checkbox'
        ) {
          if (clickedElement.checked)
            thisBooksList.filters.push(clickedElement.value);
          if (!clickedElement.checked)
            thisBooksList.filters.splice(
              thisBooksList.filters.indexOf(clickedElement.value, 1)
            );
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;
      //console.log(thisBooksList.filters);

      for (let book of thisBooksList.data) {
        //console.log(book.details);
        //console.log(book);
        let shouldBeHidden = false;
        for (let filter of thisBooksList.filters) {
          //console.log(filter);
          if (!book.details[filter]) {
            //console.log(book.details[filter]);
            shouldBeHidden = true;
            break;
          }
        }
        const bookDataID = document.querySelector(
          select.book.image + '[data-id="' + book.id + '"]'
        );
        //console.log(document.querySelector(select.book.image + bookDataID));
        //console.log(document.querySelectorAll(select.book.image + bookDataID));
        //console.log(document.querySelector(select.book.image));
        if (shouldBeHidden) bookDataID.classList.add('hidden');
        else bookDataID.classList.remove('hidden');
      }
    }
  }

  const app = {
    init: function () {
      new BooksList();
    },
  };
  app.init();
}


  /*const app = {
    initMenu() {
      const thisApp = this;
      for (let book in thisApp.data.books) {
        new Book(book, thisApp.data.books[book]);
        console.log(Book);
      }
    },*/





    /*initActions() {
      const thisBooksList = this;

      const favoriteBooks = this.favoriteBooks;
      //const filters = this.filters;

      this.bookContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const clickedElement = event.target.offsetParent;

        if (clickedElement.classList.contains(select.book.image.substring(1))) {
          clickedElement.classList.toggle('.favorite');
          let imageID = clickedElement.getAttribute('data-id');
          //console.log(clickedElement);
          if (!favoriteBooks.includes(imageID)) 
            favoriteBooks.push(imageID);
          else if (favoriteBooks.includes(imageID))
            favoriteBooks.splice(favoriteBooks.indexOf(imageID, 1));
          //console.log(favoriteBooks);
        }
      });
    }

  addToFavorites(bookId) {
      console.log(addtoFavorites);
      const thisApp = this;
      thisApp.favoriteBooks.push(bookId);
    },

    removeFromFavorites(bookId) {
      console.log(removeFromFavorites);
      const thisApp = this;
      const index = thisApp.favoriteBooks.indexOf(bookId);
      if (index !== -1) {
        thisApp.favoriteBooks.splice(index, 1);
      }
    },*/

   // init() {
   //   const thisApp = this;
   //   thisApp.initData();
   //   thisApp.render();
   //   thisApp.favoriteBooks = []; // Starting empty favoriteBooks
   //   thisApp.initActions();

 // app.init();