import bcrypt from 'bcrypt';

import connectDB from '../../../utils/connect-db';
import Users from '../../../models/user.model';
import valid from '../../../utils/valid';

connectDB();

const registerAccount = async (req, res) => {
  console.log(req);
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
    default:
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) {
      return res.status(400).json({ err: errMsg });
    }

    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ err: 'This email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      name, email, password: passwordHash, confirmPassword
    });

    await newUser.save();
    res.json({ msg: "Register Success!" });

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

export default registerAccount;
