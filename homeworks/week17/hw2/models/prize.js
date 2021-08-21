/* eslint-disable */
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prize.init({
    prizeItem: DataTypes.STRING,
    picUrl: DataTypes.STRING,
    desc: DataTypes.TEXT,
    probability: DataTypes.FLOAT,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Prize'
  })
  return Prize
}
