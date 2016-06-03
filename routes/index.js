var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var Sequelize      = require('sequelize');
var sequelize = new Sequelize('assignment', 'root', 'mysql', {
    //host: 'database-host',
    port: 3306,
    dialect: 'mysql'
});


var Workout = sequelize.define('workout', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    reps: {
        type: Sequelize.INTEGER,
        field: 'reps'
    },
    weight: {
        type: Sequelize.INTEGER,
        field: 'weight'
    },
    date: {
        type: Sequelize.DATE,
        field: 'date'
    },
    lbs: {
        type: Sequelize.BOOLEAN,
        field: 'lbs'
    }
});

/*List all values*/
router.get('/crud',function(req,res,next){
      res.header('Access-Control-Allow-Origin', '*');
        Workout.findAll({
        }).then(function(workout) {
            res.json(workout);
        });
})

/*Get a single row*/

router.get('/crud/get/:id',function(req,res,next)
{
    res.header('Access-Control-Allow-Origin', '*');

    Workout.findAll({ where: {
        id: req.params.id
    }
    }).then(function(workout) {
        res.json(workout);
    });
    
    /*Workout.findById(req.params.id, function(wO) {
        if (wO)
        {
            console.log(wO);
        }
    });*/

})

/*Add new value*/

router.post('/crud/add',function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');

  var name=req.body.name;
  var reps=req.body.reps;
  var weight=req.body.weight;
  var date=req.body.date;
  var lbs=req.body.lbs;

    console.log(name);
    console.log(reps);
    console.log(weight);
    console.log(date);
    console.log(lbs);

    Workout.upsert({ name: name, reps: reps, weight:weight, date:date, lbs:lbs }).then(function(user) {
        console.log('created');
    })
    res.json({status:200});

})

/*Update a record in workouts*/

router.post('/crud/edit/:id',function(req,res,next)
{
    res.header('Access-Control-Allow-Origin', '*');

    console.log('here Iam');
    console.log(req.params.id);

    Workout.update(
        {   name: req.body.name,
            reps : req.body.reps,
            weight : req.body.weight,
            date : req.body.date,
            lbs: req.body.lbs
        },
        {
            fields: ['name', 'reps', 'weight', 'date', 'lbs'],
            where: {id: req.params.id}
        }
    );

   /* Workout.find({ where: {id: req.params.id} }).on('success', function(wO) {
        console.log('asdasdasdasdasd');

        wO.name=req.body.name;
        wO.updateRow(req.params.id);

        if (wO) { // if the record exists in the db
            wO.updateAttributes({
                name:req.body.name,
                reps:req.body.reps
            }).success(function() {});
        }
    })*/

    console.log('Success');

    /*Workout.findById(req.params.id, function (err, wO)
    {
        if (err)
            res.send(err);

        wO.name = req.body.name;
        wO.reps = req.body.reps;

        wO.updateRow(req.params.id);

        console.log('******************');
    });
*/
    Workout.findAll({
    }).then(function(workout) {
        res.json(workout);
    });
})

router.post('/crud/delete/:id',function(req,res,next)
{

    res.header('Access-Control-Allow-Origin', '*');

    console.log('here Iam');
    console.log(req.params.id);


    Workout.destroy({
        where: {
            id: req.params.id //this will be your id that you want to delete
        }
    }).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            console.log('Deleted successfully');
        }
    }, function(err){
        console.log(err);
    });

    /*Workout.destroy(
        {   name: req.body.name,
            reps : req.body.reps
        },
        {
            fields: ['name', 'reps'],
            where: {id: req.params.id}
        }
    );*/

    Workout.findAll({
    }).then(function(workout) {
        res.json(workout);
    });

    /*
        res.header('Access-Control-Allow-Origin', '*');

        return Workout.findById(req.params.id, function (err, wO)
        {
            return wO.remove(function (err)
            {
                if (!err)
                {
                    console.log("removed");
                    return res.send('');
                }
                else
                {
                    console.log(err);
                }
            });
        });
    */

})

module.exports = router;