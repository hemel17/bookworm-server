import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const middleware = [
  morgan("dev"),
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true }),
];

export default middleware;
