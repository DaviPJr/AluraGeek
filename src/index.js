import express from "express";
import productRoutes from "./routes/products.js";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
