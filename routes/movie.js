const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');


router.post('/', (req, res, next) => {
  const data = req.body;

  const movie = new Movie(req.body);
  // movie.save((err, data) => {
  //   if(err)
  //     res.json(err);
  //
  //   res.json(data);
  // });

  const promise = movie.save();

  promise.then( (data) => {
    res.json({status: 1});
  }).catch( (err) =>{
    res.json(err);
  });

});

router.get('/', (req, res) => {
  const promise = Movie.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },
    {
      $unwind: '$director'
    }
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });

  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found!', code: 2 });

    res.json(movie);

  }).catch((err) => {
    res.json(err);
  })
});

router.get('/top10', (req, res) => {
  const promise = Movie.find({}).limit(10).sort( { imdb_score: -1 } );

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


router.get('/:movie_id', (req, res, next) => {
  //res.send(req.params);
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({ message: 'The movie was not found!', code: 1 });

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id, req.body, { new: true });

  promise.then((movie) => {
    if(!movie)
      next({ messxage: 'Err', code: 3 });
    res.json(movie);

  }).catch((err) => {
    res.json(err);
  });
});

router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;

  const promise = Movie.find({
    year: { "$gt": parseInt(start_year), "$lt": parseInt(end_year) }
  });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


module.exports = router;
