const fs = require('fs');
const child_process = require('child_process');

function ping(url){
    try {
        // Execute the command and return the output (example: 'ls -l' for Unix or 'dir' for Windows)
        child_process.execSync(`ping -c 4 ${url}`, { stdio: 'inherit' });
        
        // The output is automatically piped to stdout by the 'stdio: inherit' option
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
}


function main(){
    const urls_plain = fs.readFileSync('urls.json', encoding='utf8');
    const urls = JSON.parse(urls_plain);
    for (let url of urls){
        ping(url);
    }
}

main();