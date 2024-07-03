const app = require('./src/config/serverConfig');

const api_port = process.env.PORT;
const api_host = process.env.HOST;

app.listen(api_port, () => console.log(`Node server started on : ${api_host}:${api_port}`));
