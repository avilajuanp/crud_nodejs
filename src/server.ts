import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "./routes";
import { routerAuth } from "./authentication";
import "./database";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";

//initializers
const app = express();
// import('./passport');

//settings
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

//middleware
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(routerAuth);
app.use(passport.initialize());
app.use(passport.session());

//hace falta replicar request response y next?
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  app.locals.success = request.flash("success");
  app.locals.error = request.flash("error");
  app.locals.user = request.user;
  next();

  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
