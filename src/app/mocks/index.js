let express = require('express');
let app = express();
app.use('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
let home = require('./modules/home');
app.use('/api', home);
app.listen('8090', () => {
    console.log('监听端口8090');
});
