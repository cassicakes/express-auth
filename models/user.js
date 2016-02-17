'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: { // hook runs before we save data to data base
      beforeCreate: function(user, options, callback) { //where is the documatation that shows all (beforeCreate) stuffs?
        if (user.password) {
          bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return callback(err); // this is just sdafety net in case bcrypt has bug. good coding practice, call back just sends err to sequelize
            user.password = hash; // this stores pw
            callback(null, user); //sequelize needs callback (run a function)
          });
        } else {
          callback(null, user);
        }
      }
    }
  });
  return user;
};