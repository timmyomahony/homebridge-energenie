# Homebridge Energenie Plugin

Example `config.json`:

```javascript
{
    "accessories": [{
        "accessory": "Energenie",
        "name": "Lamp",
        "type": "ENER002",
        "device_id": [ "0x99999", 1 ]
    }]
}
```

This plugin supports all [Energenie](https://energenie4u.co.uk/) products that are supported by [pyenergenie](https://github.com/whaleygeek/pyenergenie). 
