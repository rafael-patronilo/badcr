const fetch = require('node-fetch');
const sqlite3 = require('sqlite3');


const url = 'http://localhost:8080/posts';
const db = new sqlite3.Database('database.sqlite');


async function main() {
    const response = await fetch(url); // source
    const posts = await response.json();
    for (post of posts){
        db.exec(`INSERT INTO posts (title, content) VALUES ('${post[0].title}', '${post[0].content}')`); //sink
    }
}

main();