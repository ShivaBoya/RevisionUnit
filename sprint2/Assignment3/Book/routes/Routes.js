const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, author, publishedYear, genre } = req.body;
    const book = new Book({ title, author, publishedYear, genre });
    await book.save();
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const { author, available, page = 1, limit = 5 } = req.query;
    const filter = {};

    if (author) filter.author = author;
    if (available !== undefined) filter.available = available === "true";

    const skip = (page - 1) * limit;

    const totalBooks = await Book.countDocuments(filter);
    const books = await Book.find(filter).skip(skip).limit(Number(limit));

    res.json({
      success: true,
      total: totalBooks,
      page: Number(page),
      limit: Number(limit),
      data: books,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const { title, author, publishedYear, genre, available } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found" });

    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (publishedYear !== undefined) book.publishedYear = publishedYear;
    if (genre !== undefined) book.genre = genre;
    if (available !== undefined) book.available = available;

    await book.save();

    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });

    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
