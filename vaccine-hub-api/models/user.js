const bcrypt = require("bcrypt")
const db = require("../db");
const {BCRYPT_WORK_FACTOR} = require("../config")
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
  static async fetchUserByEmail(email) {}
  static async login(credentials) {
    //user submits their email and password and the email will be searched in the databse
    //then will see if email matches the password written with the one with the database

    throw new UnauthorizedError("Invalid email/password combination");
  }
  static async register(credentials) {
    //registering a person's email and password and hashing it to create new user
    //that will contain all the info in database
    const requiredFields = ["email", "password", "rsvpStatus", "numGuests"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    })

    if(credentials.email.indexOf("@") <= 0){
        throw new BadRequestError("Invalid email")
    }

    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }

    const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

    const lowercasedEmail = credentials.email.toLowerCase();

    const result = await db.query(
      `
    INSERT INTO users(
        email,
        password, 
        rsvp_status, 
        num_guests
    )
    VALUES($1, $2, $3, $4)
    RETURNING id, email, rsvp_status, num_guests, created_at;
    `,
      [
        lowercasedEmail,
        hashedPassword,
        credentials.rsvpStatus,
        credentials.numGuests,
      ]
    );
    const user = result.rows[0];
    return user;
  }
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
