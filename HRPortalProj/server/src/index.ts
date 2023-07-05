const { app } = require("./server");
const connection = require("./config/db");

// Make server start listening for requests
const port: number = 3001;
connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is up and running on: http://localhost:${port}`);
  });
});
