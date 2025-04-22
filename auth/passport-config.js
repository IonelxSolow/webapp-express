const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('../database/db.js');


function initializePassport(passport) {
    // Login strategy
    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        }, 
        function(email, password, done){
            // Check if the email exists in the database
            const sql = 'SELECT * FROM users WHERE email = ?';
            connection.query(sql, [email], (err, results) => {
                //Handel the db error
                if(err)return done(err);

                //Check if the user exists
                if(results.length === 0){
                    return done(null, false, {message: 'No user with that email'});
                }

                // Take the first user from the results
                const user = results[0];


                //Compare the password with the hashed password in the database
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) return done(err);

                    // If the password does not matches
                    if(!isMatch){
                        return done(null, false, {message: 'Password incorrect'});
                    } 
                    // If the password matches, return the user
                    return done(null, user);
                    
                });




            })

        }) )

    // Register strategy
    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,

    }, function(req, email, password, done){
        // Check if the email exists in the database
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [email], (err, results) => {
            //Handel the db error
            if (err) return done(err);

            //Check if the email already exists
            if(results.length > 0) return done(null, false, {message: 'Email already exists'});
            

            // Hash the password before saving it in the database
            bcrypt.hash(password, 10, function(err, hashedPassword){
                if(err) return done(err);

                // Create a new user object
                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,

                }
                console.log(newUser, password, hashedPassword); // for testing //TODO: remove

                //Insert the new user into the database
                const InsertSql = 'INSERT INTO users SET ?'
                connection.query(InsertSql, newUser, function (err, result) {
                    //Handle the db error
                    if(err) return done(err);

                    //If the user is successfully created, return the user
                    console.log(result, 'result contains the id of the new user'); // for testing //TODO: remove

                    // If the user is created successfully, return the user
                    newUser.id = result.insertId; //Add the id to the newUser object
                    return done(null, newUser);
                })
            })
            


        })

    }))

    //Serialize user
    passport.serializeUser(function (user, done) {
        done(null, user.id); //Store the user id in the session
    });


    //Deserialize user
    passport.deserializeUser(function (id, done) {
        //Find the user by id in the database
        const sql = 'SELECT * FROM users WHERE id = ?';
        connection.query(sql, [id], function(err, results) {
            if(err) return done(err);
            if(results.length === 0) return done(null, false, {message: 'No user found'});

            //Return the user object
            done(null, results[0]); 
        })
    })

}

module.exports = initializePassport