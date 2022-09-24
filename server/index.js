const express = require("express");
const cors = require("cors");
const data = require("./data");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const applyFilters = (products, { query, sort }) => {
  const filteredProducts = [];
  console.log(sort);
  for (let product of products) {
    if (query && !product.name.toLowerCase().includes(query.toLowerCase())) {
      continue;
    }
    filteredProducts.push(product);
  }

  return filteredProducts.sort((a, b) => {
    const { name: nameA, price: priceA } = a;
    const { name: nameB, price: priceB } = b;
    switch (sort) {
      case "priceAsc":
        return priceB - priceA;
      case "priceDesc":
        return priceA - priceB;
      default:
        return nameA.localeCompare(nameB);
    }
  });
};

app.get("/items", (req, res) => {
  const query = req.query;

  console.log(query);

  setTimeout(() => {
    res.json(applyFilters(data, query));
  }, 150);
});

app.listen(3001, () => {
  console.info("server listening on: 3001");
});
