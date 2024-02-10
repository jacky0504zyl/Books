import express from "express"
const router = express.Router();
import Book from "../models/book.js"

// Get all the books
router.get('/', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST a new book
  router.post('/', async (req, res) => {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      publishDate: req.body.publishDate,
      price: req.body.price
    });
  
    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Middleware to find a book by ID
  async function getBook(req, res, next) {
    let book;
    try {
      book = await Book.findById(req.params.id);
      if (book == null) {
        return res.status(404).json({ message: 'Cannot find book' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.book = book;
    next();
  }
  
  // GET a single book by ID
  router.get('/:id', getBook, (req, res) => {
    res.json(res.book);
  });
  
  // DELETE a book
  router.delete('/:id', getBook, async (req, res) => {
    try {
      const {id} = req.params;
      const result = await Book.findByIdAndDelete(id);
      if(!result){
        return res.json({ message: 'Book not found' });
      }
      return res.json({ message: 'Deleted book' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  export default router;