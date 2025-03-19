//import statments: 
const express = require("express"); //external module that will allow us to build a web server.
const fs = require("fs").promises; //built-in Node module that allows us to interact with the file system.

const app = express(); //creates a new instance of the express module so that we can use all the methods/functions and properties of express in our web server.
const port = 3000; //port number that the server will listen to.

app.use(express.json()); //middleware that allows us to parse JSON data from the request body.

//create the function that will turn on the server and listen for requests on this port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

//sending data
// app.get("/", (req, res) => {
//     const myData = {
//         id : 47,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myData);
//   });

// //specify a route
// app.get("/user", (req, res) => {
//     const myData = {
//         id : 47,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myData);
//   });

// //specify a route with a parameter
// app.get("/users/:user", (req, res) => {
//     const myData = {
//         id : req.params.user,
//         email: 'test@test.com'
//     }
//     const myJSONData = JSON.stringify(myData);
//     res.send(myData);
//   });

//Helper Functions 
async function getAllBooks () {
    const books = await fs.readFile("../data.json", "utf8");
    let parsedBooks = JSON.parse(books); 
    console.log(parsedBooks);
    return (parsedBooks);
    }; 


async function getOneBook (id) {
    const books = await fs.readFile("../data.json", "utf8");
    let parsedBooks = JSON.parse(books); 
    console.log(parsedBooks);
    return parsedBooks[id];
    }; 

 async function deleteBook (id) {
    const books = await fs.readFile("../data.json", "utf8");
    let parsedBooks = JSON.parse(books); 
    parsedBooks.splice(id, 1);
   const stringBooks = JSON.stringify(parsedBooks);
    await fs.writeFile("../data.json", stringBooks, "utf8");
 }   



//API Endpoints

//The client has requested all of the books

app.get("/get-all-books", async (req, resp) => {
    const books = await getAllBooks();
    resp.send(JSON.stringify(books));
});

app.get("/get-one-book/:id", async (req, resp) => {
    const book = await getOneBook(req.params.id);
    resp.send(JSON.stringify(book));
});

app.delete("/delete-book/:id", async (req, resp) => {
    await deleteBook(req.params.id);
    resp.send("Book Deleted!")
});


// Steps for creating a Node/Express web server:
// 1. in your project folder, run npm init to create a package.json file
// 2. install express by running npm install express
// 3. add a .gitignore file to your project folder and add node_modules to it
// 4. Create a src folder to hold our custom JS code, create an index.js file to serve all of our web server code. 
// 5. Add all of the import statements (3rd party modules, Node modules, your custom modules)
// 6. Add the "boiler plate" code for express, creating the instance, adding the port, adding the listener.
// 7. Add API endpoints + helper functions to handle the requests