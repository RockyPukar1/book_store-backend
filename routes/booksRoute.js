import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// save a new book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res
        .status(400)
        .json({ message: "Title or Author or Publish Year is missing" });
    }
    const newBook = await Book.create({ title, author, publishYear });
    return res.status(201).json(newBook);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
});

// get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    if (!books.length) {
      return res.status(404).json({ message: "Matching id doesnot exist" });
    }
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
});

// get book with id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Matching id does not exist" });
    }
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
});

// update a book with id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isBookExists = await Book.findById(id);
    if (!isBookExists) {
      return res.status(404).json({ message: "Matching id doesnot exist" });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
});

// delete a book with id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isBookExists = await Book.findById(id);
    if (!isBookExists) {
      return res.status(404).json({ message: "Matching id doesnot exist" });
    }
    await Book.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted the book successfully" });
  } catch (error) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
});

export default router;