const slugify = require('slugify');

const CommandQueue = require('./lib/CommandQueue');
const Registry = require('./lib/Registry');
const Switch = require('./lib/Switch');

const COMMAND_DELAY = 1000;
const REGISTRY_FILE = "registry.kvs";

const commandQueue = new CommandQueue(COMMAND_DELAY);
const registry = new Registry(REGISTRY_FILE);

let Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    registry.reset();

    homebridge.registerAccessory("homebridge-energenie", "Energenie", EnergenieAccessory);
}

function EnergenieAccessory(log, config) {
    var self = this;
    self.log = log;
    self.name = config["name"];
    self.registry_name = slugify(self.name, "_").toLowerCase();
    self.type = config["type"];
    self.device_id = config["device_id"];

    self.state = false;

    self.service = new Service.Switch(self.name);

    self.service.getCharacteristic(Characteristic.On).value = self.state;

    self.service.getCharacteristic(Characteristic.On).on('get', function(cb) {
        cb(null, self.state);
    }.bind(self));

    self.service.getCharacteristic(Characteristic.On).on('set', function(state, cb) {
        self.state = state;

        commandQueue.queue(function() {
            Switch(self.state ? 'on' : 'off', self.registry_name, cb);
        });
    }.bind(self));

    registry.add(self);
}

EnergenieAccessory.prototype.getServices = function() {
    return [ this.service ];
}
