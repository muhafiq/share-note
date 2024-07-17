import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import flash from "express-flash";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import webRouter from "../routes/web.js";
import apiRouter from "../routes/api.js";
import authSession from "./session.js";
import helmet from "helmet";
import morgan from "morgan";

/**
 * Express application
 */
const app = express();

app.use(helmet());
app.use(morgan("common"));

/**
 * Setting view engine
 */
app.set("view engine", "ejs");
app.set("layout", "layouts/app");
app.use(expressEjsLayouts);

/**
 * Express middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

/**
 * Session
 */
app.use(cookieParser("testing"));
app.use(authSession);
app.use(flash());

/**
 * Web routing
 */

app.use(webRouter);
app.use("/api/v1", apiRouter);

app.all("/*", (req, res) => {
  res.render("pages/404", { layout: false });
});

export default app;
