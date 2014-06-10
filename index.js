var exec  = require('child_process').exec
  , os    = require('os')
  , parse = require(__dirname + '/src/nm_parser')
  , util  = require('util')
  ;

//var results = cb2y(exec, ['nm-tools', {cb2yield_cb_placeholder: true}]);
if (os.platform() === 'linux') {
  exec('nm-tool', function(error, stdout, stderr) {
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    var devices = parse(stdout);
    console.log(util.format('%j', devices));
  });
}
else {
  console.error(util.format('Unsupported platform: %s!', os.platform()));
}
