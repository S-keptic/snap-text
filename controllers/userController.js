import userModel from '../models/userSchema.js';
import textModel from '../models/textSchema.js'; 
import textController from './textController.js';
import bcrypt from 'bcrypt';

class UserController {
  static home = async (req, res) => {
    res.render('home.ejs');
  }

  static registrationpage = (req, res) => {
    res.render('registration.ejs');
  }

  static loginPage = (req, res) => {
    res.render('login.ejs');
  }

  static userCreateDoc = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).send('Name, email, and password are required.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const doc = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });

      await doc.save();
      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  static login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });

      if (user) {
        if (user.password) {
          const passwordMatched = await bcrypt.compare(password, user.password);

          if (passwordMatched) {
            req.session.user = user;
            res.redirect('/user/dashboard');
          } else {
            return res.send('Wrong credentials!');
          }
        } else {
          return res.status(500).send('Invalid user record');
        }
      } else {
        return res.send('User not registered!');
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  };

  static dashboard = async (req, res) => {
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).send('User not authenticated');
      }

      const user = req.session.user;

      const texts = await textModel.findById(user._id).populate('texts').exec();
      res.render('userDashboard.ejs', { user, texts });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  static uploadImage = async (req, res) => {
    try {
      if (!req.file || !req.file.path) {
        return res.status(400).send('No file uploaded');
      }

      const imagePath = req.file.path;

      if (!req.session || !req.session.user) {
        return res.status(401).send('User not authenticated');
      }

      const user = req.session.user;

      const convertedText = await textController.performOcrAndUpdateUser(user, imagePath);

      console.log('Converted Text:', convertedText);

      res.redirect('/user/notes');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
  static fetchNotes = async (req, res) => {
    try {
      const user = req.session.user;
      const notes = await textModel.find({ userId: user._id }); 

      res.render('notesPage.ejs', { notes });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
}



export default UserController;
