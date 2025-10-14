describe("User Registration", function() {
  let model;
  let user;

  beforeEach(function() {
      model = new LibraryModel();
      model.users = [];
      model.books = [];
      user = new User(1,'Margaret','myemail@gmail.com','1234');
  });

  it("should add a new user to the system", function() {
    expect(model.getUsers().length).toBe(0);
    model.addUser(user);
    expect(model.getUsers().length).toBe(1);
    expect(model.getUsers()[0].name).toBe('Margaret')
  });
  it("should find the user by their ID", function() {
    expect(model.findUser(1)).toBe(false);
    model.addUser(user);
    expect(model.findUser(1).email).toBe('myemail@gmail.com');
  })
});


describe("Book Creation", function() {
  let model;
  let book;
  let newBook;

  beforeEach(function() {
      model = new LibraryModel();
      model.users = [];
      model.books = [];
      book = new Book(1,'Big Book of Cats','John Author',12345,'Romance');
      newBook = new Book(1,'Big Book of Cars','John Author',12345,'Romance');
  });

  it("should add a new book to the system", function() {
    expect(model.getBooks().length).toBe(0);
    model.addBook(book);
    expect(model.getBooks().length).toBe(1);
    expect(model.getBooks()[0].isbn).toBe(12345);
  });
  it("should update a book with new information", function() {
    model.addBook(book);
    expect(model.getBooks()[0].title).toBe('Big Book of Cats');
    model.updateBook(newBook);
    expect(model.getBooks()[0].title).toBe('Big Book of Cars');
  });
});

describe("Book Borrowing", function() {
  let model;
  let user;
  let user2;
  let book;

  beforeEach(function() {
      model = new LibraryModel();
      model.users = [];
      model.books = [];
      user = new User(1,'Margaret','myemail@gmail.com','1234');
      user2 = new User(2,'Big Man','myCOOLemail@gmail.com','4321');
      book = new Book(1,'Big Book of Cats','John Author',12345,'Romance');
  });

  it("should make the book unavailable", function() {
    model.addUser(user);
    model.addBook(book);
    model.borrowBook(model.findBook(1), model.findUser(1));
    expect(model.findBook(1).available).toBe(false);
    
  });
  it("should prevent other users from borrowing the book", function() {
    model.addUser(user);
    model.addBook(book);
    expect(model.borrowBook(model.findBook(1), model.findUser(1))).toBe(true);
    expect(model.findBook(1).available).toBe(false);
    expect(model.borrowBook(model.findBook(1), model.findUser(2))).toBe(false);
  });
});

describe("Overdue Notifications", function() {
  let model;
  let user;
  let book;
  let record;

  beforeEach(function() {
      model = new LibraryModel();
      model.users = [];
      model.books = [];
      model.records = [];
      model.notifications = [];
      user = new User(1,'Margaret','myemail@gmail.com','1234');
      book = new Book(1,'Big Book of Cats','John Author',12345,'Romance');
      record = new BorrowingRecord(1, book, user, new Date(), new Date(new Date().getTime()-1000));
  });

  it("should create a notification when a book is overdue", function() {
    expect(model.getNotifs().length).toBe(0);
    model.addBook(book);
    model.addRecord(record);
    model.checkOverdueBooks();
    expect(model.getNotifs().length).toBe(1);
  });
  it("should resolve the notification when the book is returned", function() {
    model.addBook(book);
    model.addRecord(record);
    model.checkOverdueBooks();
    expect(model.getNotifs()[0].status).toBe('Unresolved');
    model.updateRecord(record);
    expect(model.getNotifs()[0].status).toBe('Resolved');
  });
});

describe("Search Function", function() {
  let model;
  let book;
  let book2;

  beforeEach(function() {
      model = new LibraryModel();
      model.users = [];
      model.books = [];
      book = new Book(1,'Big Book of Cats','John Author',12345,'Romance');
      book2 = new Book(2,'Bigger Book of Cats','Jane Author',54321,'Comedy');
  });

  it("should find a book from its title", function() {
    model.addBook(book);
    model.addBook(book2);
    expect(model.searchBooks('Big Book of Cats','')[0].bookId).toBe(1);
    expect(model.searchBooks('Bigger Book of Cats','')[0].bookId).toBe(2);
  });
  it("should find a book from its author", function() {
    model.addBook(book);
    model.addBook(book2);
    expect(model.searchBooks('John Author','')[0].bookId).toBe(1);
    expect(model.searchBooks('Jane Author','')[0].bookId).toBe(2);
  });
});