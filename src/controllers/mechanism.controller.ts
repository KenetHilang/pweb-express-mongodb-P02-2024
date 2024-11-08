
import MechanismService from "../services/mechanism.service";
import type { Request, Response } from "express";
import formatResponse from "../helpers";



class MechanismController {

  async borrowBook(req: Request, res: Response) {
    
    try {
      const bookId = req.params.id;

      const book = await MechanismService.borrowBook(bookId);
      const response = formatResponse("success", "Book borrowed successfully", {
        currentQty: book?.qty ?? 0,
      });
      res.status(200).json(response);
    } 

    catch (error) {
      if ((error as Error).message === "Book not found") {
        const response = formatResponse("failed", (error as Error).message);
        res.status(404).json(response);
      } else if ((error as Error).message === "Book cannot be borrowed") {
        const response = formatResponse("failed", (error as Error).message);
        res.status(400).json(response);
      } else {
        console.log(error);
        const response = formatResponse("error", (error as Error).message);
        res.status(500).json(response);
      }
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const bookId = req.params.id;

      const book = await MechanismService.returnBook(bookId);
      const response = formatResponse("success", "Book returned successfully", {
        currentQty: book?.qty ?? 0,
      });
      res.status(200).json(response);
    } 

    catch (error) {
      if ((error as Error).message === "Book not found") {
        const response = formatResponse("failed", (error as Error).message);
        res.status(404).json(response);
      } else if ((error as Error).message === "Book cannot be returned") {
        const response = formatResponse("failed", (error as Error).message);
        res.status(400).json(response);
      } else {
        console.log(error);
        const response = formatResponse("error", (error as Error).message);
        res.status(500).json(response);
      }
    }
  }
}

export default new MechanismController();