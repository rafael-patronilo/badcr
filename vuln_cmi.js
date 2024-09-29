const fs = require('fs');
const child_process = require('child_process');
const os = require('os');

function savePost(post){
    let dest = `posts/${post.title}`;
    fs.writeFileSync(dest, post.content);
    if (post["date"] !== undefined){
        child_process.exec(`touch -t ` + post.date + ` "${dest}"`);
    }
}

function savePosts(posts){
    fs.mkdirSync('posts', {recursive: true});
    for (let post of posts){
        savePost(post);
    }
}

function main(){
    const posts_plain = fs.readFileSync('posts.json', encoding='utf8');
    const posts = JSON.parse(posts_plain);
    savePosts(posts);
}

main();