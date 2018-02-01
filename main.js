var vm = require("vm");
var fs = require('fs');


// Load the old JS file (meant for the web and not for node) for old (pre-transitioned) address generation
var getPreTransitionIota = function() {
  var oldIotaPath = './pre-trans-generator/js/iota.js'
  filedata = fs.readFileSync(oldIotaPath,'utf8');

  // Small tweaks to allow this to work outside of the browser
  filedata = 'window={};console={\'log\':function(){}};' + filedata;

  var context = {};
  vm.runInNewContext(filedata, context, oldIotaPath);

  return new context.window.IOTA();
}


var IOTA = require('iota.lib.js');
var iota = new IOTA({
  'provider': 'https://iotanode.us:443'
});
var iotaOld = getPreTransitionIota();
var seed = process.argv[2] + "" // in case the seed is all 9's (GOSH I HOPE NOT)
var searchPreTransitioned = process.argv[3] === 'p';
var status = 'checking'
var snapshotJan = fs.readFileSync('Snapshot.txt').toString().split("\n");

if (seed.length !== 81) {
  if(seed.length < 81){
    var charsToAdd = 81 - seed.length;
    var oldSeed = seed;
    var i = 0;
    for (i = 0; i < charsToAdd; i++){
      seed = oldSeed.concat("9");
    }
  }
  if(seed.length > 81){
    var oldSeed = seed;
    seed = oldSeed.substring(0, 82);
  }
}

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    if (key.name === 'i') {
      process.exit();
    }
  }
})

var getNewAddressCallback = function(e, d, index, amountToScan) {
  var hits = 0
  for (var i = 0; i < d.length; i++) {
    var addr = d[i]
    var hit = snapshotJan.filter((s) => {
      return s.indexOf(addr) > -1
    })

    if (hit.length > 0 || hit.length > 0) {
      var snapshotDate = ""
      var balance = 0
      if(hit.length > 0){
        balance = parseInt(snapshotJan[snapshotJan.indexOf(hit[0])].split(";")[1])
        var convertedBalance = balance / 1000000
        console.log(`Got a hit! ${addr} has a balance of ${convertedBalance} Mi.`)
      }

        totalBalance += balance
        addressesWithBalances.push({
          address: addr,
          balance,
          keyIndex: index + i,
          security: 2
        })
        hits++
      }
    }
    if (status === 'checking') {
    setTimeout(function() {
      check(index + amountToScan)
    }, 100)
  }
};


if (searchPreTransitioned) {
  console.log('Address Search Type: Pre-Transitioned');
} else {
  console.log('Address Search Type: Regular');
}

console.log('Checking your balance...Press i at any time to stop...');
var addressesWithBalances = []

var totalBalance = 0
var check = (index) => {
  console.log('Checking for new addresses');
  const amountToScan = 2;

  if (!searchPreTransitioned) {
    var f = iota.api.getNewAddress(seed, {
      index,
      total: amountToScan,
      checksum: false
    }, function (e, d) {
      getNewAddressCallback(e, d, index, amountToScan);
    });
  }
  else {
    var f = iotaOld.api.getNewAddress(seed, {
      index,
      total: amountToScan,
      checksum: false
    }, function (e, d) {
      getNewAddressCallback(e, d, index, amountToScan);
    });
  }
}

check(0)
