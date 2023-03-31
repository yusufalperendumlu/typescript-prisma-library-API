import expres from "express";
import type { Request, Response } from "express";

import * as AuthorService from "./author.service";

const authorRouter = expres.Router();

authorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const authors = await AuthorService.getAuthors();
    return res.status(200).json(authors);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

authorRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const author = await AuthorService.getAuthor(id);
    return res.status(200).json(author);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

authorRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName } = req.body as Omit<
      AuthorService.Author,
      "id"
    >;
    const newAuthor = await AuthorService.createAuthor({ firstName, lastName });
    return res.status(201).json(newAuthor);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

authorRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body as Omit<
      AuthorService.Author,
      "id"
    >;
    const updatedAuthor = await AuthorService.updateAuthor(id, {
      firstName,
      lastName,
    });
    return res.status(200).json(updatedAuthor);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

authorRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await AuthorService.deleteAuthor(id);
    return res.status(200).json({
      message: "Author deleted successfully!",
      author: deletedAuthor,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { authorRouter };
