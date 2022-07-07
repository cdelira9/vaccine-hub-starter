const db = require("../db");
const { UnauthorizedError } = require("../utils/errors");

class User {
  static async login(credentials) {
    //user submits their email and password and the email will be searched in the databse
    //then will see if email matches the password written with the one with the database

    throw new UnauthorizedError("Invalid email/password combination");
  }
  static async register(credentials) {
    //registering a person's email and password and hashing it to create new user
    //that will contain all the info in database
  }
}

module.exports = User;
