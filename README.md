Control Energenie remote switches via Homebridge on Raspberry Pi.

This is a customized fork of:

https://github.com/narratorben/homebridge-energenie

which itself is a fork of:

https://github.com/adtennant/homebridge-energenie

Instead of relying on `pyenergenie` (which I couldn't get working) this uses my own library:

https://github.com/timmyomahony/energenie-switches

Which is a very basic on/off library for the EN002 Energenie switches.

To setup, install on RPI via:

```sh
sudo npm install -g https://github.com/timmyomahony/homebridge-energenie#master
```

Then add to the Homebridge configuration:

```
"accessories": [
    {
        "accessory": "Energenie",
        "name": "Lamp A",
        "type": "ENER002",
        "device_id": 1
    }
],
```

Where `"device_id": 1` is the number you want to assign the switch between 1-4.
