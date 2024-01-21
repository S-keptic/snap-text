import express from 'express'
import dbConnect from './db/dbConnect.js';
import userRoutes from './routes/userRoutes.js'
import textRoutes from './routes/textRoutes.js'
import session from 'express-session';
import bodyParser from 'body-parser';


const app = express()
const port = 8000;
const DATABASE_URL =  "mongodb://127.0.0.1:27017"
// app.use('/user/* output.css', (req, res, next) => {
//     res.header('Content-Type', 'text/css');
//     res.header('Content-Type', 'text/css');
//     next();
//   });
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json())
app.use('/',userRoutes)
app.use('/',textRoutes)


dbConnect(DATABASE_URL)

app.listen(port,()=>{
    console.log(`server up on ${port}`)
})
