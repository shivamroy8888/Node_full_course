// const fs = require('fs');

const { param } = require('../app');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//-----for checking the id--------
// exports.checkID = (req,res,next,val) =>{
//   console.log(`tour id is ${val}`)
//   if (req.params.id*1 > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'tour not found' });
//   }
//   next();
// }

// exports.checkBody = (req,res,next) =>{
//   if(!req.body.name || !req.body.price){
//     return res.status(400).json({
//       status : "error",
//       message:'missing name and price'
//     }) ;
//   }
//   next();
// }

exports.getAlltours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.Status(404).json({
      error: 'Something went wrong',
      massege: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      error: 'something went wrong',
      massege: err,
    });
  }

  // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
};

// if(id>tours.length){
// if (!tour) {
//   return res.status(404).json({ message: 'tour not found' });
// }
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      Status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      massege: 'Invalid data sent',
    });
  }
  // const newTour = new Tour({})
  // newTour.save();
};
// // console.log(req.body);
// const newId = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newId }, req.body);
// tours.push(newTour);
// fs.writeFile(
//   `${__dirname}/dev-data/data/tours-simple.json`,
//   JSON.stringify(tours),
//   (err) => {

//     });
//   }
// );
// // res.send('done')

exports.deletTour = async (req, res) => {
  await Tour.findByIdAndDelete(req.params.id)
  try{
    res.status(204).json({
      status: 'success',
      data: null,
    });

  }catch(err){
    res.Status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.updateTour = async (req, res) => {
  // if (req.params.id > tours.length) {
  //   return res.status(404).json({ message: 'tour not found' });
  // }
try{
const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
  new: true,
  runValidators: true
})
  res.status(200).json({
    status: 'success',
    data: {
      tour
    },
  });
}catch(err){
  res.status(400).json({
    status: 'error',
    massege: err
  });
}
};
