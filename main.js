const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require('./schemas/book.js');
const port = 3000;

mongoose
  .connect("mongodb+srv://pal77381:v3UQ0qdyS24HPfU9@cluster0.2pftsrv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((e) => console.error("Could not connect to MongoDB...", e));

app.use(express.json());

// A temporary in-memory "database" until you integrate a real database
let books = [];

// Create a Book
app.post("/books", async (req, res) => {
  // const { title, author } = req.body;
  // console.log(req.body);
  // if (!title || !author) {
  //   return res.status(400).send("Missing title or author");
  // }

  // const newBook = { id: books.length + 1, title, author };
  // books.push(newBook);
  // res.status(201).send(newBook);
  let book = new Book({ title: req.body.title, author: req.body.author });
  book = await book.save();
  res.send(book);
});

// Get All Books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.send(books);
  // res.json(books);
});

// Get a Single Book
app.get("/books/:id", async (req, res) => {
  // const book = books.find((b) => b.id === parseInt(req.params.id));
  // if (!book) {
  //   return res.status(404).send("Book not found");
  // }
  // res.json(book);
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send('Book not found');
  res.send(book);
});

// Update a Book
app.put("/books/:id", async (req, res) => {
  // const book = books.find((b) => b.id === parseInt(req.params.id));
  // if (!book) {
  //   return res.status(404).send("Book not found");
  // }

  // const { title, author } = req.body;
  // book.title = title || book.title;
  // book.author = author || book.author;

  // res.send(book);
  const book = await Book.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author }, { new: true });
  if (!book) return res.status(404).send('Book not found');
  res.send(book);
});

// Delete a Book
app.delete("/books/:id", async (req, res) => {
  // const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  // if (bookIndex === -1) {
  //   return res.status(404).send("Book not found");
  // }

  // books.splice(bookIndex, 1);
  // res.status(204).send();
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) return res.status(404).send('Book not found');
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
