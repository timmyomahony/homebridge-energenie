const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const Registry = function Registry(file) {
    this._file = file;
    mkdirp.sync(path.dirname(this._file));
};

Registry.prototype.reset = function reset() {
    if(fs.existsSync(this._file)) {
        fs.truncateSync(this._file, 0);
    } else {
        fs.closeSync(fs.openSync(this._file, 'w'));
    }
};

Registry.prototype.add = function(accessory) {
    var stream = fs.createWriteStream(this._file, {
        flags: 'a'
    });

    var entry = `ADD ${accessory.registry_name}\n`;
    entry += `type=${accessory.type}\n`;

    if(Array.isArray(accessory.device_id)) {
        entry += `device_id=[${accessory.device_id[0]}, ${accessory.device_id[1]}]\n`;
    } else {
        entry += `device_id=${accessory.device_id}\n`;
    }

    entry += '\n';

    stream.write(entry);

    /*stream.write(`ADD ${accessory.registry_name}\n`);
    stream.write(`type=${accessory.type}\n`);

    if(Array.isArray(accessory.device_id)) {
        stream.write(`device_id=[${accessory.device_id[0]}, ${accessory.device_id[1]}]\n`);
    } else {
        stream.write(`device_id=${accessory.device_id}\n`);
    }

    stream.write(`\n`);*/
    stream.end();
};

Registry.prototype.dir = function dir() {
    return path.dirname(this._file);
};

module.exports = Registry;