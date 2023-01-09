const app = require('./config/app/app');
const config = require('./config/config/config')

// start server
const port = Number(config.app.port);

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
