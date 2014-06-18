# Node Wifi Tools

Utility for [Node.js](http://nodejs.org) to work with 802.11 interfaces 

## Installation

You can use **node-wifi-tools** as either a standalone "executable" or as an [npm](https://www.npmjs.org/) module.

### Module

Install **node-wifi-tools** into your project.

    npm install node-wifi-tools --save

You can now use it in your project.

```javascript
var co       = require('co')
  , nw_tools = require('node-wifi-tools')
  ;

co(function*() {

  var info = yield nw_tools.get_info();

  console.log(JSON.stringify(info, null, 2));
})();
```

### Standalone

Install **node-wifi-tools** globally on your system

    npm install node-wifi-tools -g

The command **node-wifi-tools** has been added to your global *node_modules/* directory and a link to *bin/node-wifi-tools* has been added to your **$PATH**. 

## Testing

You can run the included test suite with the following command.

    npm test

## Supported Systems

* **Mac OSX**
* **Linux** (with [nm-tool](http://linux.die.net/man/1/nm-tool))
* **Windows+**
