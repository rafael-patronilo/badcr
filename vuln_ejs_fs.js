const ejs = require('ejs');
const fs = require('fs');


const url = 'http://localhost:8080/posts';


async function main(){
    const posts_plain = fs.readFileSync('posts.json', encoding='utf8');
    const posts = JSON.parse(posts_plain);
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