const spawn = require('child_process').spawn;

const Switch = function(op, device, callback) {
    if(device == null) callback("no device name provided");

    let err = "";
    const cmd = spawn("sudo", [ "python", __dirname + "/switch.py", op, device ]);
    
    cmd.stdout.pipe(process.stdout);
    
    cmd.stderr.on("data", function(data) {
        err += data;
    });
    
    cmd.on("close", function(code) {
        if(callback != null) {
            if(err.length > 0) callback(err);
            else callback(null);
        }
    });
};

module.exports = Switch;