const fetch = require('node-fetch');
const ejs = require('ejs');


const url = 'http://localhost:8080/posts';


async function main(){
    const response = await fetch(url); // source
    const posts = await response.json();
    const html = ejs.render(`
        <html>
        <head><title>Post</title></head>
        <body>
            <% for (post of posts) {%>
                <h1><%- post.title %></h1>
                <p><%- post.content %></p>
            <% } %>
        </body>
        </html>
        `, {posts:posts}); //sink
    console.log(html);
}

main();