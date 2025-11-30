import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = (password) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

const comparePassword = (plainPassword, hashPassword) => {
  try {
    const isMatch = bcrypt.compareSync(plainPassword, hashPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password: ' + error.message);
  }
};

export default { hashPassword, comparePassword };
