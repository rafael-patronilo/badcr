const fetch = require('node-fetch');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('database.sqlite');

const url = 'http://localhost:8080/posts';


async function main(){
    const response = await fetch(url);
    const posts = await response.json();
    for(let post of posts) {
        const { title, content } = post;
        db.exec(`INSERT INTO posts (title, content) VALUES ("${title}", "${content}")`);
    }
}

main();