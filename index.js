const fetch = require('node-fetch');
//const sqlite3 = require('sqlite3');
const ejs = require('ejs');

//const db = new sqlite3.Database('database.sqlite');

const url = 'http://localhost:8080/posts';


async function main(){
    const response = await fetch(url);
    const posts = await response.json();
    // posts = [
    //     { title: 'Post 1', content: 'Give me your password >:)</p> <script type="text/javascript">console.log("Very dangerous javascript")</script><p>' },
    // ]
    console.log(ejs.render(`
        <html>
        <head><title>Post</title></head>
        <body>
            <% for (post of posts) {%>
                <h1><%- post.title %></h1>
                <p><%- post.content %></p>
            <% } %>
        </body>
        </html>
        `, {posts:posts}));
}

main();