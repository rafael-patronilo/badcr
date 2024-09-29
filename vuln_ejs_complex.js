const fs = require('fs');
const ejs = require('ejs');
const child_process = require('child_process');

function renderPost(context){
    if (context.post["date"] !== undefined){
        return ejs.render(`
            <h1><strong><%- context.index %></strong> <%- context.post.title %></h1>
            <p><%- context.post.content %></p>
            <p><%- context.post.date %></p>
        `, context);
    }
    return ejs.render(`
        <h1><strong><%- context.index %></strong> <%- context.post.title %></h1>
        <p><%- context.post.content %></p>
    `, context);
}

function renderBody(html){
    return ejs.render(`
        <html>
        <head><title>Post</title></head>
        <body>
            <%- html %>
        </body>
        </html>
    `, {html:html});
}

function renderPosts(posts){
    let renderedPosts = [];
    let i = 0;
    for (let post of posts){
        let context = {index: i, post: post};
        renderedPosts.push(renderPost(context));
        i++;
    }
    return renderBody(
        ejs.render(`
            <li>
            <% for (post of renderedPosts) { %>
                <%- post %>
            <% } %>
            </li>
        `, {renderedPosts:renderedPosts})
    )
}

function main(){
    const posts_plain = fs.readFileSync('posts.json', encoding='utf8');
    const posts = JSON.parse(posts_plain);
    const html = renderPosts(posts);
    console.log(html);
}

main();