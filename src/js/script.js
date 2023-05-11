const app = {
    initMenu: function() {
      const thisApp = this;
      for (let book in thisApp.data.books) {
        new Product(book, thisApp.data.books[book]);
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
  
    init: function() {
      const thisApp = this;
  
      thisApp.initData();
      thisApp.render();
    }
  };
  
  app.init();