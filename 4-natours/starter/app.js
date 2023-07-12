const express = require('express');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

// middleware

app.use(express.json());
app.use(morgan('dev'));
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from server side', app: 'Natours' });
// });

// app.post('/',(req,res)=>{
// res.send('post to this endpoints....')
// })

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});



// all routes handlers 
// app.get('/api/v1/tours', getAlltours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deletTour);
// new version of app.get('/api/v1/tours', getAlltours);app.post('/api/v1/tours', createTour);

// all routes

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter)
// server starter
module.exports = app