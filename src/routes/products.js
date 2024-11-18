import express from "express";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const router = express.Router();
const dbFile = path.resolve(__dirname, "../../db.json");
const readDB = () => JSON.parse(readFileSync(dbFile));
const writeDB = (data) => writeFileSync(dbFile, JSON.stringify(data, null, 2));

router.get("/", (req, res) => {
  const data = readDB();
  res.json(data.produtos);
});

router.post("/", (req, res) => {
  const data = readDB();
  const newProduct = { id: Date.now(), ...req.body };
  data.produtos.push(newProduct);
  writeDB(data);
  res.status(201).json(newProduct);
});

router.delete("/:id", (req, res) => {
  const data = readDB();
  const id = Number(req.params.id);
  const updatedProducts = data.produtos.filter((p) => p.id !== id);

  if (updatedProducts.length === data.produtos.length) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }

  data.produtos = updatedProducts;
  writeDB(data);
  res.status(204).send();
});

export default router;
