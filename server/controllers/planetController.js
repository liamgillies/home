const path = require('path');
const fs = require('fs');

function readWriteSync(res) {
    var data = fs.readFileSync(path.resolve(__dirname + '/../pgen/src/main.js'), 'utf-8');
    var newValue = data.replace('new GUIOpts(1, 0.01, 10, 0.01, "World Height")', 'new GUIOpts(1, 0.01, 10, 0.01, "World Height")');
    
    fs.writeFileSync(path.resolve(__dirname + '/../pgen/src/main.js'), newValue, 'utf-8');

    res.sendFile(path.resolve(__dirname + '/../pgen/src/index.html'));

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