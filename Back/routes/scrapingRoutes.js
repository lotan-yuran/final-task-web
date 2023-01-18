// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// // Models
// const Category = require("../models/category");
// const Product = require("../models/product");

// // Routes
// router.get("/categories", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://dummyjson.com/products/categories"
//     );

//     const categoriesToCreate = response.data.map((category) => ({
//       name: category,
//     }));

//     const created = await Category.create(categoriesToCreate);
//     res.send(created);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/products", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     const categoriesMap = categories.reduce((acc, { _id, name }) => {
//       acc.set(name, _id.toHexString());
//       return acc;
//     }, new Map());

//     const response = await axios.get("https://dummyjson.com/products?limit=100");

//     const productsToCreate = response.data.products.map(
//       ({ title, description, price, images, category }) => ({
//         name: title,
//         description,
//         price,
//         imageURL: images[0],
//         category: categoriesMap.get(category),
//         isActive: true,
//       })
//     );

//     const created = await Product.create(productsToCreate);
//     res.send(created);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
