import { Router } from "express";
import { saveNote } from "../controllers/note-controller.js";

const apiRouter = Router();

apiRouter.get("/hello", (req, res) => {
  res.json({ message: "hello world" });
});

apiRouter.post("/note/save", saveNote);

export default apiRouter;
