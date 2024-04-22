const app = require("./src/config/serverConfig");

const api_port = process.env.API_PORT;
const api_host = process.env.API_HOST;

app.listen(api_port, () => console.log(`Node server started on : ${api_host}:${api_port}`));
