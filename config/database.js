import { Sequelize } from "sequelize";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const configData = require("./config.json");

const env = "development";
const config = configData[env];

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage
});

export default sequelize;
