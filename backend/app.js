import express from "express"
const app = express();
import mongoose from "mongoose"
const port = 7981;
import booksRouter from "./routes/books.js"

// Middleware to parse JSON bodies
app.use(express.json());

mongoose
  .connect('mongodb+srv://jacky0504zou:Zyl65086382!@books.p3ztp5o.mongodb.net/books_collection?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use('/books', booksRouter);