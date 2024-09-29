const fs = require('fs');
const child_process = require('child_process');

function ping(url){
    child_process.execSync("ping -c 1 " + url, { stdio: 'inherit' });
}


function main(){
    const urls_plain = fs.readFileSync('urls.json', encoding='utf8');
    const urls = JSON.parse(urls_plain);
    for (let url of urls){
        ping(url);
    }
}

main();