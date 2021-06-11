const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },/* 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }, */
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    api:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    genre: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    mine: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });
};
