import { Router } from "express";
import {
  createNote,
  viewNote,
  updatePassword,
  viewNoteWithPassword,
} from "../controllers/note-controller.js";

const webRouter = Router();

webRouter.get("/", (req, res) => {
  res.render("pages/home", { error: req.flash("error")[0] });
});

webRouter.get("/about", (req, res) => {
  res.render("pages/about");
});

webRouter.get("/pricing", (req, res) => {
  const prices = [
    {
      name: "Paket Basic",
      price: "$10",
      description: "Fitur dasar untuk pemula",
    },
    {
      name: "Paket Pro",
      price: "$20",
      description: "Fitur lengkap untuk profesional",
    },
    {
      name: "Paket Premium",
      price: "$30",
      description: "Semua fitur plus dukungan premium",
    },
  ];
  res.render("pages/pricing", { prices });
});

webRouter.get("/:noteLink", viewNote);

webRouter.post("/note/create", createNote);

webRouter.put("/note/set-password", updatePassword);

webRouter.post("/:noteLink", viewNoteWithPassword);

export default webRouter;
