const spawn = require('child_process').spawn;

const Switch = function(registry, op, name, device_id, callback) {
    if(name == null) callback("no name provided");
    if(device_id == null) callback("no device id provided");

    let err = "";
    console.log(__dirname);
    console.log(registry.dir() );
    const cmd = spawn("python", [__dirname + "/switch.py", op, device_id ], { cwd: registry.dir() });

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
