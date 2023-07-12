const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req,res,next,val) =>{
  console.log(`tour id is ${val}`)
  if (req.params.id*1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'tour not found' });
  }
  next();
}

exports.getAlltours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if(id>tours.length){
  // if (!tour) {
  //   return res.status(404).json({ message: 'tour not found' });
  // }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        Status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send('done')
};

exports.deletTour = (req, res) => {
 
 
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.updateTour = (req, res) => {
  // if (req.params.id > tours.length) {
  //   return res.status(404).json({ message: 'tour not found' });
  // }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here..>',
    },
  });
};
