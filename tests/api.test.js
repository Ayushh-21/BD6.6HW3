const { describe, beforeEach } = require('node:test');
const request = require('supertest');

const { getAllBooks, getBookById } = require('../controllers/index.js');
const { app } = require('../index.js');

let http = require('http');

jest.mock('../controllers/index.js', () => ({
  ...jest.requireActual('../controllers/index.js'),
  getAllBooks: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3010, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all Game', async () => {
    let mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];

    getAllBooks.mockReturnValue(mockBooks);
    let res = getAllBooks();
    expect(res).toEqual(mockBooks);
    expect(res.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET /boooks should return all books', async () => {
    let res = await request(server).get('/books');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: [
        {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
        },
        {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
        },
        {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic',
        },
      ],
    });
    expect(res.body.books.length).toBe(3);
  });

  it('GET /books/details/:id should return an book for specific id', async () => {
    let res = await request(server).get('/books/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
    });
  });
});
