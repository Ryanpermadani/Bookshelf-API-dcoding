const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pagecount, readpage, reading } = request.payload;


    const id = nanoid(16);
    const finished = pagecount === readpage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBooks = {
        id, name, year, author, summary, publisher, pagecount, readpage, finished, reading, insertedAt, updatedAt,
      };
      books.push(newBooks);
    
     
      const isSuccess = books.filter((books) => books.id === id).length > 0;

      if (name === undefined) {
    
        const response = h.response({    
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
    
        response.code(400);
        return response;
        }

      if (readPage >= pageCount) {
    
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
    
        response.code(400);
        return response;
        
    }
    
    
      if (isSuccess) {
    
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: 
          {
            booksId: id,
          },
    
        });
    
        response.code(201);
        return response
    
      } else {
    
        const response = h.response({
          status: 'Error',
          message: 'Buku gagal ditambahkan',
        });
    
        response.code(500);
        return response
    
      }
        
};

 
module.exports = { addBookHandler };