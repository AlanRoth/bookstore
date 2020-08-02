var validateUser = async function (username, password, repeated) {
  var errors = []
  var phrase = ' can not be '
  if (username === null) {
    errors.push('Username' + phrase + ' null!')
  }
  if (password === null) {
    errors.push('Password' + phrase + ' null!')
  }
  if (username === 'undefined') {
    errors.push('Username' + phrase + ' empty!')
  }
  if (password === 'undefined') {
    errors.push('password' + phrase + ' empty!')
  }
  if (username.length < 2) {
    errors.push('Username has to be longer than 2 characters!')
  }
  if (password.length < 7) {
    errors.push('Password has to be longer than 7 characters!')
  }
  if (password !== repeated) {
    errors.push('Passwords must match!')
  }
  return errors
}

module.exports = validateUser
