const bcrypt = require('bcryptjs')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])+/

const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('user_accounts')
  },

  hasUserWithEmail(db, email) {
    return db('user_accounts')
      .where({ email })
      .first()
      .then(user => !!user)
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('user_accounts')
      .returning('*')
      .then(([user]) => user)
  },

  getById(knex, id) {
    return knex
      .from('user_accounts')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteUser(knex, id) {
    return knex('user_accounts')
      .where({ id })
      .delete()
  },

  updateUser(knex, id, newUserFields) {
    return knex('user_accounts')
      .where({ id })
      .update(newUserFields)
  },

  validatePassword(password) {
    if (password.length < 8) {
      return 'Password should be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password should be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER.test(password)) {
      return 'Password must contain one upper case, lower case and a number'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
}

module.exports = UsersService