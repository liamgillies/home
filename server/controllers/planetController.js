const path = require('path');
const fs = require('fs');
const chromeLauncher = require('chrome-launcher');
const exec = require('child_process').exec;
const { clear } = require('console');
const { kill } = require('process');

async function readWriteSync(res) {
    var data = fs.readFileSync(path.resolve(__dirname + '/../pgen/src/main.js'), 'utf-8');
    var newValue = data.replace('new GUIOpts(1, 0.01, 10, 0.01, "World Height")', 'new GUIOpts(1, 0.01, 10, 0.01, "World Height")');
    
    fs.writeFileSync(path.resolve(__dirname + '/../pgen/src/main.js'), newValue, 'utf-8');

    chromeLauncher.launch({
        startingUrl: 'http://localhost:3000/',
      }).then(chrome => {
        console.log(`Chrome debugging port running on ${chrome.port}`);
            function findDownload() {
                exec('ls ~/Downloads | grep temporary_webm', function (error, stdout, stderr) {
                    if(stdout) {
                        clearInterval(interval);
                        kill(chrome.pid);
                    }
                });
            }

            const interval = setInterval(findDownload, 1000);
      });
    

    //res.sendFile(path.resolve(__dirname + '/../pgen/src/index.html'));

    data.replace('new GUIOpts(1, 0.01, 10, 0.01, "World Height")', 'new GUIOpts(1, 0.01, 10, 0.01, "World Height")');
    fs.writeFileSync(path.resolve(__dirname + '/../pgen/src/main.js'), newValue, 'utf-8');
}

function renderPlanet(req, res, next) {
    readWriteSync(res);
}

// Gaian

module.exports = {
    renderPlanet
}