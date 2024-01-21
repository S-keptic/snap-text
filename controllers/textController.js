
import Tesseract from 'tesseract.js';
import textModel from '../models/textSchema.js';
import fs from 'fs'


class textController {
  static performOcrAndUpdateUser = async (user, imagePath) => {
    try {
      const imageBuffer = fs.readFileSync(imagePath);
      console.log('Image read successfully');

      const { data: { text } } = await Tesseract.recognize(imageBuffer);
      console.log('OCR completed successfully');

      await textModel.create({
        userId: user._id,
        text: text,
      });

      console.log('Converted Text:', text);

      return text;
    } catch (err) {
      console.error('Failed to perform OCR and update user');
      throw err;
    }
  }
 
  
  
}

export default textController;
