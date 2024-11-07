let { DataTypes, sequelize } = require("../lib");

let post = sequelize.define("post", {
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,        // Marks `id` as the primary key 
  },
  name: DataTypes.TEXT,
  author: DataTypes.TEXT,
  content: DataTypes.TEXT,
  title: DataTypes.TEXT,
});

module.exports = { post };
