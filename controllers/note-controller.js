import prismaClient from "../app/database.js";
import bcryptjs from "bcryptjs";

export const createNote = async (req, res) => {
  const { link, duration } = req.body;
  try {
    const dup = await prismaClient.note.findUnique({
      where: { link },
    });

    if (dup) {
      req.flash("error", "Link already used by another user!");
      res.redirect("back");
      return;
    }

    await prismaClient.note.create({
      data: {
        link,
        deletedAt:
          duration === "un"
            ? null
            : new Date(new Date().getTime() + duration * 60000),
        content: "",
      },
    });
    res.redirect(`/${link}`);
  } catch (error) {
    console.error(error);
    res.render("pages/5xx", { layout: false });
  }
};

export const viewNote = async (req, res) => {
  try {
    const note = await prismaClient.note.findUnique({
      where: { link: req.params.noteLink },
    });

    if (!note) {
      return res.render("pages/404", { layout: false });
    }

    if (note.password) {
      return res.render("pages/waiting", { error: req.flash("error")[0] });
    }

    res.render("pages/note", { note, useScript: true });
  } catch (error) {
    console.error(error);
    res.render("pages/5xx", { layout: false });
  }
};

export const viewNoteWithPassword = async (req, res) => {
  const link = req.params.noteLink;

  try {
    const note = await prismaClient.note.findUnique({ where: { link } });

    const match = await bcryptjs.compare(req.body.password, note.password);

    if (!match) {
      req.flash("error", "Wrong Password!");
      res.redirect(`/${link}`);
      return;
    }

    res.render("pages/note", { note, useScript: true });
  } catch (error) {
    console.error(error);
    res.render("pages/5xx", { layout: false });
  }
};

export const saveNote = async (req, res) => {
  try {
    await prismaClient.note.update({
      data: { content: req.body.content },
      where: { link: req.body.noteLink },
    });
    res.status(200).json({
      status: true,
      message: "Note saved!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to save!",
    });
  }
};

export const updatePassword = async (req, res) => {
  if (!req.body.password) {
    return res.redirect(`${req.body.noteLink}`);
  }

  const link = req.body.noteLink;

  console.log(link);

  const hashedPassword = await bcryptjs.hash(req.body.password, 10);

  try {
    await prismaClient.note.update({
      data: { password: hashedPassword },
      where: { link },
    });
    req.flash("info", "Success set password to your note.");
    res.redirect(`/${link}`);
  } catch (error) {
    console.error(error);
    res.render("pages/5xx", { layout: false });
  }
};
