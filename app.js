// Citation for connecting webapp to database:
//      # Date: 1/11/2024
//      # Copied from assignment description
//      # Source URL: https://canvas.oregonstate.edu/courses/1946034/assignments/9456203


// Citation for displaying data
//      # Date: 3/9/2024
//      # Adapted from assignment tutorial
//      # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

//Citation for adding data (Create) with app.post methods
//      # Date: 3/9/2024
//      # Adapted from assignment tutorial
//      # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

//Citation for deleting data (Delete) with app.delete methods
//      # Date: 3/9/2024
//      # Adapted from assignment tutorial
//      # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

//Citation for updating data (Updating) with app.put methods
//      # Date: 3/9/2024
//      # Adapted from assignment tutorial
//      # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data



/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 20130;                 // Set a port number at the top so it's easy to change in the future


//handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

//JSON form data requirements
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname +'/public'))




// Database
var db = require('./database/db-connector');



/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.


app.get('/trails.html', function(req, res)
    {
        let query1 = "SELECT trailID, trailName, region, length, elevationGain, description FROM Trails;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('trails', {data: rows});
        })
                          // Note the call to render() and not send(). Using render() ensures the templating engine
    });

app.get('/users.html', function(req, res)
{
    let query1 = "SELECT * FROM Users;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('users', {data: rows});
    })
                        // Note the call to render() and not send(). Using render() ensures the templating engine
});

app.get('/reports.html', function(req, res)
{
    let query1 = "SELECT Reports.reportID, Reports.title, Reports.activity, Reports.distance, Reports.description, Reports.reportDate, Users.userName FROM Reports LEFT JOIN Users ON Reports.userID = Users.UserID;";
    db.pool.query(query1, function(error, reports, fields){

        let query2 = "SELECT trailName, trailID from Trails;"
        db.pool.query(query2, function(error2, trails, fields2){
            let query3 = "SELECT Users.userName, Users.userID FROM Users";
            db.pool.query(query3, function(error3, users, fields3){
                let combinedData = {
                    reports: reports,
                    trails: trails,
                    users: users
                };
                //console.log(combinedData)
                res.render('reports', {data: combinedData});
            });
        });
    });
                        // Note the call to render() and not send(). Using render() ensures the templating engine
});
   
app.get('/comments.html', function(req, res)
{
    let query1 = "SELECT Comments.commentID, Comments.commentText, Comments.commentDate, Comments.reportID, Comments.userID FROM Comments LEFT JOIN Users on Comments.userID = Users.UserID;";
    db.pool.query(query1, function(error, comments, fields){
        let query2 = "SELECT Reports.reportID FROM Reports;";
        db.pool.query(query2, function(error2, reports, fields2){
            let query3 = "SELECT Users.userName, Users.userID FROM Users;";
            db.pool.query(query3, function(error3, users, fields3){
                let combinedData = {
                    comments: comments,
                    reports: reports,
                    users: users
                };
            

        res.render('comments', {data: combinedData});
            })
        })
    })
                        // Note the call to render() and not send(). Using render() ensures the templating engine
});

app.get('/trails_has_reports.html', function(req, res)
{
    let query1 = "SELECT * FROM Trails_has_Reports;";
    db.pool.query(query1, function(error, trailReports, fields){
        let query2 = "SELECT Reports.reportID FROM Reports;";
        db.pool.query(query2, function(error2, reports, fields2){
            let query3 = "SELECT Trails.trailID FROM Trails;";
            db.pool.query(query3, function(error3, trails, fields3){
                let combinedData = {
                    trailReports: trailReports,
                    reports: reports,
                    trails: trails
                };
                res.render('trails_has_reports', {data: combinedData});
            });
        });
    });
                        // Note the call to render() and not send(). Using render() ensures the templating engine
});

app.post('/add-Trails_has_Reports-form', function(req, res)
{
    let data = req.body;

    query = `INSERT INTO Trails_has_Reports (trailID, reportID) VALUES ('${data.trailIDInput}', '${data.reportIDInput}')`;
    db.pool.query(query, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/trails_has_reports.html');
        }
    })

});

app.post('/add-trail-form', function(req, res){
    let data = req.body;



    query1 = `INSERT INTO Trails (trailName, region, length, elevationGain, description) VALUES ('${data.trailNameInput}', '${data['regionInput']}', '${data['lengthInput']}', '${data['elevationInput']}', '${data['descriptionInput']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route
        else
        {
            res.redirect('/trails.html');
        }
    })
});

app.post('/add-user-form', function(req, res){
    let data = req.body;


    query1 = `INSERT INTO Users (userName, age) VALUES ('${data.userNameInput}', '${data['ageInput']}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route
        else
        {
            res.redirect('/users.html');
        }
    })
});


//Citation for array.push usage
// Date: 3/11/2024
// Adapted from Mozilla docs
// Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
app.post('/add-report-form', function(req, res){
    let data = req.body;

    /*let pictureInput =  data['pictureInput'];
    if (!pictureInput){
        pictureInput = 'NULL'
    }*/

    query1 = `INSERT INTO Reports (activity, title, distance, description, reportDate, userID) VALUES ('${data.activityInput}', '${data.titleInput}', '${data['distanceInput']}',  '${data.descriptionInput}', '${data.reportDateInput}', '${data.userIDInput}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route
        else
        {   
            let newReportID = rows.insertId;
            if (data.trailsTraveled.length !== 0){
                query2 = 'INSERT INTO Trails_has_Reports (trailID, reportID) VALUES ';
                value_array = [];

                for (let i = 0; i < data.trailsTraveled.length; i++){
                    value_array.push(`(${data.trailsTraveled[i]}, ${newReportID})`);
                }

                let queryStringValues = value_array.join(", ");
                query2 += queryStringValues;

                db.pool.query(query2, function(error2, rows2, fields2){
                    if (error2) {
                        console.error("Error inserting into Trails_has_Reports: ", error)
                    }
                });
            }
            res.redirect('/reports.html');
        }
    });
});

app.delete('/delete-report-ajax', function(req, res, next){
    let data = req.body;

    query1 = `DELETE FROM Reports WHERE reportID = ${data.reportID}`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            console.log("Error!")
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route
        // presents it on the screen
        else
        {
            res.sendStatus(204);
        }
    })
});

app.put('/put-report-ajax', function(req,res,next){
    let data = req.body;
    let reportIDInput = parseInt(data.reportIDInput);
    let activityInput = data.activityInput;
    let titleInput = data.titleInput;
    let distanceInput = parseInt(data.distanceInput);
    let descriptionInput = data.descriptionInput;
    let reportDateInput = data.reportDateInput;
    let userIDInput = data.userIDInput;
    let trailsTraveled = data.trailsTraveledInput;
  
    let queryUpdateReport = `UPDATE Reports SET activity = ?, title = ?, distance = ?, description = ?, reportDate=?, userID = ? WHERE reportID = ?`;
    let selectReport = "SELECT Reports.reportID, Reports.title, Reports.activity, Reports.distance, Reports.description, Reports.reportDate, Users.userName FROM Reports LEFT JOIN Users ON Reports.userID = Users.UserID WHERE Reports.reportID = ?"
  
          // Run the 1st query
          db.pool.query(queryUpdateReport, [activityInput, titleInput, distanceInput, descriptionInput, reportDateInput, userIDInput, reportIDInput], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                console.log(trailsTraveled);
                queryDelIntersect = `DELETE FROM Trails_has_Reports WHERE reportID = '${reportIDInput}'`;
                db.pool.query(queryDelIntersect, function(error2, rows2, fields2){
                    if (error2) {
                        console.error("Error deleting from Trails_has_Reports");
                    }
                });
                if (trailsTraveled.length !== 0){
                    
                    if (Array.isArray(trailsTraveled)){
                        query3 = 'INSERT INTO Trails_has_Reports (trailID, reportID) VALUES ';
                        value_array = [];
                        for (let i = 0; i < trailsTraveled.length; i++){
                            value_array.push(`(${parseInt(trailsTraveled[i])}, ${reportIDInput})`);
                        }
        
                        let queryStringValues = value_array.join(", ");
                        query3 += queryStringValues;
                        console.log(queryStringValues);
                        console.log(query3);
        
                        db.pool.query(query3, function(error3, rows3, fields3){
                            if (error3) {
                                console.error("Error inserting into Trails_has_Reports: ", error)
                            }
                        
                        });
                    }
                    else{
                        query3 = `INSERT INTO Trails_has_Reports (trailID, reportID) VALUES (${parseInt(trailsTraveled)}, ${reportIDInput})`;
                        db.pool.query(query3, function(error3, rows3, fields3){
                            if (error3) {
                                console.error("Error inserting into Trails_has_Reports: ", error)
                            }
                        
                        });
                    }
                    } 

                
                  // Run the  fourth query
                  db.pool.query(selectReport, [reportIDInput], function(error4, rows4, fields4) {
  
                      if (error4) {
                          console.log(error4);
                          res.sendStatus(400);
                      } else {
                          res.send(rows4);
                      }
                  })
              }
  })});

app.post('/add-comment-form', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Comments (commentText, commentDate, reportID, userID) VALUES ('${data.commentTextInput}', '${data.commentDateInput}',  '${data.reportIDInput}', '${data.userIDInput}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route
        // presents it on the screen
        else
        {
            res.redirect('/comments.html');
        }
    })
});

app.delete('/delete-trail-ajax', function(req, res, next){
    let data = req.body;

    query1 = `DELETE FROM Trails WHERE trailID = ${data.trailID}`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            console.log("Error!")
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route
        else
        {
            res.sendStatus(204);
        }
    })
});

app.put('/put-trail-ajax', function(req,res,next){
    let data = req.body;
  
    let trailIDInput = parseInt(data.trailIDInput);
    let regionInput = data.regionInput;
    let elevationInput = parseInt(data.elevationInput);
    let lengthInput = parseInt(data.lengthInput);
    let descriptionInput = data.descriptionInput;
  
    let queryUpdateTrail = `UPDATE Trails SET region = ?, elevationGain = ?, length = ?, description = ? WHERE Trails.trailID = ?`;
    let selectTrail = `SELECT * FROM Trails WHERE trailID = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateTrail, [regionInput, elevationInput, lengthInput, descriptionInput, trailIDInput], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectTrail, [trailIDInput], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});




/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

