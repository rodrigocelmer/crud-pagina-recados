import cors from "cors";
import express, { Express } from "express";

export default (app: Express) => {
    app.use(express.json());
    app.use(cors());
}