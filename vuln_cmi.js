const fs = require('fs');
const child_process = require('child_process');
const os = require('os');

function savePost(context){
    let dest = `posts/${context.post.title}`;
    fs.writeFileSync(dest, context.post.content);
    if (context.post["date"] !== undefined){
        child_process.exec(`touch -t ` + context.post.date + ` "${dest}"`);
    }
}

function buildContext(index, post){
    let context = {index: index, post: post};
    return context;
}

function savePosts(posts){
    fs.mkdirSync('posts', {recursive: true});
    let i = 0;
    for (let post of posts){
        let context = buildContext(i, post);
        savePost(context);
        i++;
    }
}

function main(){
    const posts_plain = fs.readFileSync('posts.json', encoding='utf8');
    const posts = JSON.parse(posts_plain);
    savePosts(posts);
}

main();