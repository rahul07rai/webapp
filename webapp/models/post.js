'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	post.belongsTo(models.user, {foreignKey: 'user_id', targetKey: 'id'});
	post.hasMany(models.comment, {
      		foreignKey: 'post_id'
    	});
    }
  };
  post.init({
    username: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};
