require('dotenv').config();

const app = require('./app');
require('./database');

const server = require('http').createServer(app);

const port = app.get('port');
server.listen(port, () => {
    console.log('Server running on port', port);
})