var ap_parse = require(__dirname + '/src/airport_parser')
  , exec     = require('child_process').exec
  , os       = require('os')
  , nm_parse = require(__dirname + '/src/nm_parser')
  , ns_parse = require(__dirname + '/src/ns_parser')
  ;

function isFunction(func) {
  return func && {}.toString.call(func) === '[object Function]';
}

exports.get_info = function(cb) {
  // First ensure callback is a valid function
  if (!isFunction(cb)) {
    throw "Invalid function passed to get_info()!";
  }

  if (os.platform() === 'linux') {
    exec('nm-tool', function(error, stdout, stderr) {
      if (error || stderr || stderr !== '') {
        cb({error: error, stderr: stderr}, null);
      }
      cb(null, nm_parse(stdout));
    });
  }
  else if (os.platform() === 'darwin') {
    exec('/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport --getinfo', 
        function(error, stdout, stderr) {
      if (error || stderr || stderr !== '') {
        cb({error: error, stderr: stderr}, null);
      }
      var ap_out = ap_parse(stdout);
      exec('netstat -rn', function(nerror, nstdout, nstderr) {
        if (nerror || nstderr || nstderr !== '') {
          cb({error: nerror, stderr: nstderr}, null);
        }
        var ns_out = ns_parse(nstdout);
        cb(null, {access_point: ap_out, netstat: ns_out});
      });
    });
  }
  else {
    cb("Unsupported platform: " + os.platform(), null);
  }
};
