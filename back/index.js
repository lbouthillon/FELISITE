const app = require('./src/app');
const config = require('./config');

app.listen(config.port, () => console.log(`REST Server running on port ${config.port}`));
