---------------------------------------------------------------
-- LET'S PRACTICE SQL! 

-- At the top of this file is the SQL code to create 2 tables. 
-- Your task is to answer the questions at the bottom of this file. 

-- Make sure there are no errors in your SQL code. 
-- You can run your SQL code in sqlplayground.app or DB Fiddle to check for errors. 
---------------------------------------------------------------

-- Create a new table for the programming languages. 
CREATE TABLE programming_languages
(
  id            SERIAL NOT NULL,
  name          VARCHAR(255) NOT NULL ,
  released_year INT NOT NULL ,
  githut_rank   INT NULL ,
  pypl_rank     INT NULL ,
  tiobe_rank    INT NULL ,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (id)
);

INSERT INTO programming_languages(id,name,released_year,githut_rank,pypl_rank,tiobe_rank) 
VALUES 
(1,'JavaScript',1995,1,3,7),
(2,'Python',1991,2,1,3),
(3,'Java',1995,3,2,2),
(4,'TypeScript',2012,7,10,42),
(5,'C#',2000,9,4,5),
(6,'PHP',1995,8,6,8),
(7,'C++',1985,5,5,4),
(8,'C',1972,10,5,1),
(9,'Ruby',1995,6,15,15),
(10,'R',1993,33,7,9),
(11,'Objective-C',1984,18,8,18),
(12,'Swift',2015,16,9,13),
(13,'Kotlin',2011,15,12,40),
(14,'Go',2009,4,13,14),
(15,'Rust',2010,14,16,26),
(16,'Scala',2004,11,17,34);

-- Create a new table for the developers who created these programming languages.
CREATE TABLE developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_language_id INT REFERENCES programming_languages(id)
);

INSERT INTO developers (id, name, country, created_language_id) VALUES
    (1, 'Yukihiro Matsumoto', 'Japan', 9),
    (2, 'Brendan Eich', 'USA', 1),
    (3, 'James Gosling', 'Canada', 3),
    (4, 'Guido van Rossum', 'Netherlands', 2);
    
---------------------------------------------------------------
-- ANSWER THE SQL QUESTIONS BELOW ⬇️
---------------------------------------------------------------

-- SELECT everything in the programming_languages table.
SELECT * FROM programming_languages;

-- SELECT everything in the developers table.
SELECT * FROM developers;

-- INSERT the following two programming languages into programming_languages table.
INSERT INTO programming_languages(id,name,released_year,githut_rank,pypl_rank,tiobe_rank) 
VALUES 
(17, 'Dart', 2011, 19, 14, 37),
(18, 'Lua', 1993, 25, 18, 28);

-- UPDATE Rust's tiobe_rank to 20.
UPDATE programming_languages
SET tiobe_rank = 20
WHERE name = 'Rust';

-- DELETE Scala from the programming_languages table.
DELETE FROM programming_languages
WHERE name = 'Scala';

-- What are all of the programming languages that were released before the year 2000?
SELECT * FROM programming_languages
WHERE released_year < 2000;

-- What are all of the programming languages that have a GitHub rank between 1 and 5?
SELECT * FROM programming_languages
WHERE githut_rank BETWEEN 1 AND 5;

-- What is the average released year of all the programming languages in the table?
SELECT AVG(released_year) AS average_released_year
FROM programming_languages;

-- What is the most recently released programming language in the table?
SELECT * FROM programming_languages
ORDER BY released_year DESC
LIMIT 1;

-- What are all the programming languages and their respective creators? Use INNER JOIN to join the two tables together.
SELECT programming_languages.name AS language, developers.name AS creator
FROM programming_languages
INNER JOIN developers
ON programming_languages.id = developers.created_language_id;