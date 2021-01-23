// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require("http");

http.get(process.env.SERVER_URL, (resp) => {
  if (resp.statusCode === 200) process.exit(0);
  else process.exit(1);
});
