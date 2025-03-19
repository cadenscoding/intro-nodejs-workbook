// Create a module that accesses the file system and uses ES modules
import fs from "fs/promises"; 

const action = process.argv[2];

async function printAllBooks() {
  try {
    const data = await fs.readFile("./data.json", "utf8");
    const books = JSON.parse(data);

    books.forEach(book => {
      console.log(book.title + "\n");
      console.log(book.text + "\n");
    });
  } catch (err) {
    console.error("Error reading file:", err);
  }
}

async function printOneBook(num) {
  try {
    const data = await fs.readFile("./data.json", "utf8");
    const books = JSON.parse(data);

    if (books[num]) {
      console.log(books[num].title + "\n");
      console.log(books[num].text + "\n");
    } else {
      console.log("Book not found.");
    }
  } catch (err) {
    console.error("Error reading file:", err);
  }
}


if (action === "getAll") {
  printAllBooks();
} else if (action === "getOne") {
  printOneBook(process.argv[3]);
} else {
  console.log("Invalid action! Use 'getAll' or 'getOne'.");
}