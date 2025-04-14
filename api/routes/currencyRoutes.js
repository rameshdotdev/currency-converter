import express from "express";
import { getCurrentCurrency } from "../controllers/currencyController.js";


export const currencyRouter = express.Router();

currencyRouter.get('/', getCurrentCurrency);


