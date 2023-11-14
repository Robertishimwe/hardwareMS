const bcrypt =  require('bcrypt');

class Protection {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static checkPassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
}

module.exports = Protection;