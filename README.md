# Node Wifi Tools

Utility for [Node.js](http://nodejs.org) to work with 802.11 interfaces 

## Installation

You can use **node-wifi-tools** as either a standalone "executable" or as a [npm](https://www.npmjs.org/) module.

### Module

Install **node-wifi-tools** into your project.

    npm install node-wifi-tools --save

You can now use it in your project.

    var nwtool = require('node-wifi-tools');
    
    nwtool.get_info(function (err, info) {
      console.log(JSON.stringify(info, null, 2));
    }

### Standalone

Install **node-wifi-tools** globally on your system

    npm install node-wifi-tools -g

The command **node-wifi-tools** has been added to your global *node_modules/* directory and a link to *bin/node-wifi-tools* has been added to your **$PATH**. 


## Supported Systems

* **Mac OSX**
* **Linux** (with [nm-tool](http://linux.die.net/man/1/nm-tool))
* **Windows 7+** (TODO)
