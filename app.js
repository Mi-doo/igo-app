//
const { app } = require("igo");

const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.run();
