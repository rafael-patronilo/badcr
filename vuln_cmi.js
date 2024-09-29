const fs = require('fs');
const child_process = require('child_process');
const os = require('os');

function savePost(context){
    let dest = `posts/${context.post.title}`;
    fs.writeFileSync(dest, context.post.content);
    if (context.post["date"] !== undefined){
        if (os.type() == 'Linux' ){
            child_process.exec(`touch -t ${context.post.date} "${dest}"`,
                (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    console.log(`${stdout}`);
                    console.error(`${stderr}`);
                }
            );
        } else {
            console.log("Unsupported OS");
        }
    }
}


function savePosts(posts){
    fs.mkdirSync('posts', {recursive: true});
    let i = 0;
    for (let post of posts){
        let context = {index: i, post: post};
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