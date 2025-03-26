// Importing modules
import express from 'express'; // external module for using express
import pg from 'pg';
const { Client } = pg;
import config from './config.js'; // internal module for connecting to our config file

const app = express();
const port = 3005;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Helper Functions
async function getAllLanguages() {
    const client = new Client(config);
    await client.connect();
    let result = await client.query("SELECT * FROM programming_languages");
    await client.end();
    return result.rows;
}

async function getOneLanguage(id) {
    const client = new Client(config);
    await client.connect();
    let result = await client.query(`SELECT * FROM programming_languages WHERE id = '${id}'`);
    await client.end();
    return result.rows;
}

async function addOneLanguage(obj) {
    const client = new Client(config);
    await client.connect();
    let result = await client.query(`INSERT INTO programming_languages(id, name, released_year, githut_rank, pypl_rank, tiobe_rank) VALUES ('18', '${obj.name}', ${obj.releasedYear}, ${obj.githutRank}, ${obj.pyplRank}, ${obj.tiobeRank})`);
    console.log(result);
    await client.end();
}

async function deleteOneLanguage(id) {
    const client = new Client(config);
    await client.connect();
    let result = await client.query(`DELETE FROM programming_languages WHERE id = '${id}'`);
    await client.end();
    return result.rowCount > 0;
}


async function getLanguagesSortedBy(column) {
    const validColumns = ["id", "name", "released_year", "githut_rank", "pypl_rank", "tiobe_rank"];
    if (!validColumns.includes(column)) {
        throw new Error("Invalid column name.");
    }

    const client = new Client(config);
    await client.connect();
    let result = await client.query(`SELECT * FROM programming_languages ORDER BY ${column} ASC`);
    await client.end();
    return result.rows;
}

async function searchLanguagesByName(name) {
    const client = new Client(config);
    await client.connect();
    let result = await client.query(`SELECT * FROM programming_languages WHERE LOWER(name) LIKE LOWER('%${name}%')`);
    await client.end();
    return result.rows;
}

// API Endpoints
// Get all languages
app.get("/get-all-languages", async (req, res) => {
    let languages = await getAllLanguages();
    res.json(languages);
});

// Get one language
app.get("/get-one-language/:id", async (req, res) => {
    let language = await getOneLanguage(req.params.id);
    res.json(language);
});

// Add one language
app.post("/add-one-language", async (req, res) => {
    await addOneLanguage(req.body);
    res.send("Success! You added a language!");
});

// Delete one language
app.delete("/delete-one-language/:id", async (req, res) => {
    let deleted = await deleteOneLanguage(req.params.id);
    if (deleted) {
        res.send("Success! Language deleted.");
    } else {
        res.status(404).send("Language not found.");
    }
});

// Get all languages sorted by a specific column
app.get("/get-all-languages/sort-by/:column", async (req, res) => {
    try {
        let sortedLanguages = await getLanguagesSortedBy(req.params.column);
        res.json(sortedLanguages);
    } catch (error) {
        res.status(400).send("Invalid column name. Please use 'id', 'name', 'released_year', 'githut_rank', 'pypl_rank', or 'tiobe_rank'.");
    }
});

// Search for languages by name
app.get("/search-languages-by-name/:name", async (req, res) => {
    let languages = await searchLanguagesByName(req.params.name);
    if (languages.length > 0) {
        res.json(languages);
    } else {
        res.status(404).send("No languages found matching the search.");
    }
});