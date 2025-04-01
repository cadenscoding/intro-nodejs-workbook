
const express = require("express"); 
const fs = require("fs/promises"); 


const app = express();
const port = 3000; 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get("/find-recipes", async (req, res) => {
  try {
    const recipes = await readRecipes(); 
    res.json(recipes);
  } catch (error) {
    res.status(500).send("Error reading recipes."); 
  }
});


app.get("/find-recipe/:id", async (req, res) => {
  try {
    const recipes = await readRecipes(); 
    const id = parseInt(req.params.id); 

    if (recipes[id]) {
      res.json(recipes[id]); 
    } else {
      res.status(404).send("Recipe not found."); 
    }
  } catch (error) {
    res.status(500).send("Error finding recipe."); 
  }
});


app.get("/delete-recipe/:id", async (req, res) => {
  try {
    const recipes = await readRecipes();
    const id = parseInt(req.params.id);

    if (recipes[id]) {
      recipes.splice(id, 1); 
      await saveRecipes(recipes); 
      res.send("Recipe deleted.");
    } else {
      res.status(404).send("Recipe not found."); 
    }
  } catch (error) {
    res.status(500).send("Error deleting recipe."); 
  }
});


app.get("/update-recipe/:id", async (req, res) => {
  try {
    const recipes = await readRecipes(); 
    const id = parseInt(req.params.id);
    const newName = req.query.newName; 

    if (!newName) {
      return res.status(400).send("New name is required."); 
    }

    if (recipes[id]) {
      recipes[id].name = newName; 
      await saveRecipes(recipes); 
      res.send("Recipe name updated."); 
    } else {
      res.status(404).send("Recipe not found."); 
    }
  } catch (error) {
    res.status(500).send("Error updating recipe."); 
  }
});


async function readRecipes() {
  try {
    const data = await fs.readFile("./data/recipe-data.json", "utf8"); 
    return JSON.parse(data); 
  } catch (error) {
    console.error("Error reading file:", error); 
    return []; 
  }
}


async function saveRecipes(recipes) {
  try {
    await fs.writeFile("./data/recipe-data.json", JSON.stringify(recipes, null, 2)); 
  } catch (error) {
    console.error("Error saving file:", error); /
  }
}