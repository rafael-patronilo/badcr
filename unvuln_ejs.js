const fs = require('fs');
const ejs = require('ejs');
const xssFilters = require('xss-filters');

function sanitizePost(post){
    sanitized = {
        title: xssFilters.inHTMLData(post.title),
        content: xssFilters.inHTMLData(post.content)
    }
    if (post.date !== undefined){
        sanitized.date = xssFilters.inHTMLData(post.date);
    }
    return sanitized;
}

function renderPost(context){
    context.post = sanitizePost(context.post);
    if (post["date"] !== undefined){
        return ejs.render(`
            <h1><strong><%- index %></strong> <%- post.title %></h1>
            <p><%- post.content %></p>
            <p><%- post.date %></p>
        `, context);
    }
    return ejs.render(`
        <h1><strong><%- index %></strong> <%- post.title %></h1>
        <p><%- post.content %></p>
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
    renderedPosts = [];
    let i = 0;
    for (post of posts){
        context = {index: i, post: post};
        renderedPosts.push(renderPost(context));
        i++;
    }
    return renderBody(
        ejs.render(`
            <li>
            <% for (post of renderedPosts) {%>
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