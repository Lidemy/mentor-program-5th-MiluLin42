/* eslint-disable */
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post'
  })
  return Post
}
