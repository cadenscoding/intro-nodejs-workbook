const express = require("express");
const fs = require("fs").promises;

const app = express();
const port = 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const asyncHandler = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => {
    res.status(500).send("Server Error: " + error.message);
  });
};


app.get("/recipes", asyncHandler(async (req, res) => {
  const recipes = await readRecipes();
  res.json(recipes);
}));


app.get("/recipe/:id", asyncHandler(async (req, res) => {
  const recipes = await readRecipes();
  const recipe = recipes[req.params.id];
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).send("Recipe not found.");
  }
}));


app.delete("/recipe/:id", asyncHandler(async (req, res) => {
  const recipes = await readRecipes();
  if (recipes[req.params.id]) {
    recipes.splice(req.params.id, 1);
    await saveRecipes(recipes);
    res.send("Recipe deleted.");
  } else {
    res.status(404).send("Recipe not found.");
  }
}));


app.put("/recipe/:id", asyncHandler(async (req, res) => {
  const recipes = await readRecipes();
  if (recipes[req.params.id]) {
    recipes[req.params.id].name = req.body.name;
    await saveRecipes(recipes);
    res.send("Recipe updated.");
  } else {
    res.status(404).send("Recipe not found.");
  }
}));


async function readRecipes() {
  const data = await fs.readFile("../data/recipe-data.json", "utf8");
  return JSON.parse(data);
}


async function saveRecipes(recipes) {
  await fs.writeFile("../data/recipe-data.json", JSON.stringify(recipes), "utf8");
}