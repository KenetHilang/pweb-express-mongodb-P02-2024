// book.controller.ts
import type { Request, Response } from 'express';
import BookService from '../services/book.service';

export class BookController {
  public async addBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await BookService.addBook(req.body);
      res.status(201).json({
        status: "success",
        message: "Book added successfully",
        data: book
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: "failed",
          message: error.message,
          data: {}
        });
      } else {
        res.status(500).json({
          status: "failed",
          message: "Internal server error while adding book",
          data: {}
        });
      }
    }
  }

  public async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json({
        status: "success",
        message: "Books retrieved successfully",
        data: books
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: "failed",
          message: error.message,
          data: []
        });
      } else {
        res.status(500).json({
          status: "failed",
          message: "Internal server error while fetching books",
          data: []
        });
      }
    }
  }

  public async getBookById(req: Request, res: Response): Promise<void> {
    try {
      const book = await BookService.getBookById(req.params.id);
      if (!book) {
        res.status(404).json({
          status: "failed",
          message: "Book not found with the specified ID",
          data: {}
        });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "Book retrieved successfully",
        data: book
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Invalid book ID format')) {
        res.status(400).json({
          status: "failed",
          message: "Invalid book ID format provided",
          data: {}
        });
      } else {
        res.status(500).json({
          status: "failed",
          message: "Internal server error while fetching book",
          data: {}
        });
      }
    }
  }

  public async modifyBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await BookService.modifyBook(req.params.id, req.body);
      res.status(200).json({
        status: "success",
        message: "Book updated successfully",
        data: book
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Invalid book ID format')) {
          res.status(400).json({
            status: "failed",
            message: "Invalid book ID format provided",
            data: {}
          });
        } else if (error.message.includes('not found')) {
          res.status(404).json({
            status: "failed",
            message: "Book not found with the specified ID",
            data: {}
          });
        } else {
          res.status(500).json({
            status: "failed",
            message: "Internal server error while updating book",
            data: {}
          });
        }
      }
    }
  }

  public async removeBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await BookService.removeBook(req.params.id);
      res.status(200).json({
        status: "success",
        message: "Book deleted successfully",
        data: book
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Invalid book ID format')) {
          res.status(400).json({
            status: "failed",
            message: "Invalid book ID format provided",
            data: {}
          });
        } else if (error.message.includes('not found')) {
          res.status(404).json({
            status: "failed",
            message: "Book not found with the specified ID",
            data: {}
          });
        } else {
          res.status(500).json({
            status: "failed",
            message: "Internal server error while deleting book",
            data: {}
          });
        }
      }
    }
  }
}