//Importing modules
import express from 'express'; //external module for using express
import pg from 'pg';
const { Client } = pg
import config from './config.js'; // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Helper Function
async function getAllLanguages(){
    const client = new Client(config); //creating our database Client with our config values
    await client.connect(); //connecting to our database
    let result = await client.query("SELECT * FROM programming_languages");
    await client.end(); // disconnecting from our database
    return result.rows;
}

async function getOneLanguage (id) {
    const client = new Client(config); //creating our database Client with our config values
    await client.connect(); //connecting to our database
    // 1. Add a variable into our SQL query
    let result = await client.query(`SELECT * from programming_languages WHERE id = '${id}'`);
    // 2. PG library has a way to pass in variable values as an array
    // let text = `SELECT * from programming_languages WHERE id = $1`;
    // let values = [id]
    // let result = await client.query(text,values);
    await client.end();
    return result.rows;
}

async function addOneLanguage (obj) {
    const client = new Client(config); //creating our database Client with our config values
    await client.connect(); //connecting to our database
    let result = await client.query(`INSERT INTO programming_languages(id, name, released_year, githut_rank, pypl_rank, tiobe_rank) VALUES ('18', '${obj.name}', ${obj.releasedYear}, ${obj.githutRank}, ${obj.pyplRank}, ${obj.tiobeRank})`)
    console.log(result);
    await client.end();
}

// API Endpoint
//Get all languages
app.get("/get-all-languages", async (req, res) => {
    let languages = await getAllLanguages();
    let JSONlanguages = JSON.stringify(languages);
    res.send(JSONlanguages);
});
//Get one language
app.get("/get-one-language/:id", async (req, res) => {
    let language = await getOneLanguage(req.params.id);
    let JSONlanguage = JSON.stringify(language);
    res.send(JSONlanguage);
});
// Add one language
app.post("/add-one-language", async (req,res) => {
    await addOneLanguage(req.body);
    res.send("Success! You added a language!");
});

//For your lab, you will build on this project by adding a POST for adding a new language and a DELETE for removing a language. 