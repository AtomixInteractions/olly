
var olly = require('./lib');

var app = olly('./demo.conf');

app.controller('index', {
  approve(req, res)            { res.json({ approve: true }) },
  whitelist(req, res)          { res.json({ whitelist: true }) },
  whitelist_add(req, res)      { res.json({ whitelist_add: true }) },
  whitelist_remove(req, res)   { res.json({ whitelist_remove: true }) },
});

app.controller('session', {
  register(req, res)           { res.json({ register: true }) },
});

app.controller('settings', {
  settings(req, res)           { res.json({ settings: true }) },
  settings_update(req, res)    { res.json({ settings_update: true }) },
});

app.controller('demo', {
  demo(req, res)               { res.json({ demo: 'okay' }) },
  hello(req, res)               { res.json({ hello: 'world' }) },
});


app.listen(3000, function(){
  console.log('Listen app on port', 3000)
});