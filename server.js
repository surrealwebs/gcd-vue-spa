const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
import { sanitizeParam } from "express-validator";
const { check, validationResult } = require('express-validator');

// -----------------------------------------------------------------------------
// APPLICATION SETUP                                                       start

// Set Application Port
const PORT = process.env.PORT || 3128;

// create express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//                                                                           end
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// BACKEND "API" ROUTES                                                    start

/**
 * Routes used work with the whole list of TODOs. 
 */
app.route("/api/todos")
    /**
     * Fetches all of the TODO items.
     */
    .get((req, res, next) => {
        // GIVE ME ALL YOUR STUFF
        let db = new sqlite3.Database("./database/GDCTodoApp.db");
        let sql = `SELECT * FROM todos WHERE completed = 0`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            return res.json({
                status: true,
                todos: rows
            });
        });
    }) // end .get
    /**
     * Creates a TODO based on request.
     */
    .post([
        check('title', 'Title is required.')
            .exists()
            .not().isEmpty()
            .trim()
            .escape(),
        check('details')
            .trim()
            .escape(),
        check('completed')
            .customSanitizer((value, { req }) => {
                // Force a 1 or a zero.
                return Number(req.body.completed) !== 1 ? 1 : 0;
            })
    ], (req, res, next) => {
        const errors = validationResult( req );

        if (!errors.isEmpty()) {
            return res.json({
            status: false,
            message: errors().array().join(' ')
            });
        }

        // create invoice
        let db = new sqlite3.Database("./database/GDCTodoApp.db");
        let sql = `INSERT INTO todos (title, details, completed) VALUES( ?, ?, ? )`;
        
        db.run(sql, [
            req.body.title,
            req.body.details,
            req.body.completed,    
        ], (err) => {
            if (err) {
                return res.json({
                    status: false,
                    message: "Sorry, there was an error creating your TODO."
                });
            }

            let lastInsertId = this.lastID;
            return res.json({
                status: true,
                message: "TODO created",
                todo: { 
                    id: lastInsertId,
                    title: req.body.title,
                    details: req.body.details,
                    status: req.body.status
                }
            });
        });
    }); // end .post

/**
 * Route(s) for working with complete TODO's.
 */
app.route("/api/todos/completed")
    .get((req, res, next) => {
        let db = new sqlite3.Database("./database/GDCTodoApp.db");
        let sql = `SELECT * FROM todos WHERE completed = 1`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            return res.json({
                status: true,
                todos: rows
            });
        });
    });

/**
 * Routes used to work with a single TODO item.
 */
app.route("/api/todos/:id")
    .get([
        sanitizeParam('id', 'Invalid ID.').toInt()
    ], (req, res, next) => {
        let db = new sqlite3.Database("./database/GDCTodoApp.db");
        let sql = `SELECT * FROM todos WHERE id = ?`;

        db.get(sql, [ req.params.id ], (err, row) => {
            if (err) {
                throw err;
            }
            return res.json({
                status: true,
                todo: row
            });
        });
    }) // end .get
    .put([
        check('title', 'Title is required.')
            .exists()
            .not().isEmpty()
            .trim()
            .escape(),
        check('details')
            .trim()
            .escape(),
        check('completed')
            .customSanitizer((value, { req }) => {
                // Force a 1 or a zero.
                return Number(req.body.completed) !== 1 ? 1 : 0;
            }),
        sanitizeParam('id', 'Invalid TODO.').toInt()
    ], (req, res, next) => {
        // Save the TODO, if we don't have an ID we want to fail out
        let db = new sqlite3.Database("./database/GDCTodoApp.db");
        let sql = `UPDATE todos (title, details, completed) VALUES ( ?,?,? ) WHERE id = ?`;

        // Save to DB
        db.run(sql, [
            req.body.title,
            req.body.details,
            req.body.completed,
            req.params.id
        ], (res) => {
            if (err) {
                res.json({
                    status: false,
                    message: "Todo was not updated in the database."
                });
            }

            return res.json({
                status: true,
                message: 'Save was not completed successfully.'
            });
        });
    }); // end .put

// Generic catchall route, mainly to catch 404's.
app.use((req, res, next) => {
    res.status(404);
    res.format({
        html: () => {
            res.render('404', { url: req.url })
        },
        json: () => {
            res.json({ error: 'Not found' })
        },
        default: () => {
            res.type('txt').send('Not found')
        }
    })
});

// If you are still here something went wrong.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render( '500', { error: err } );
});

//                                                                           end
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// STARTING LISTENING FOR CALLS                                            start
app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}`);
});
//                                                                           end
// -----------------------------------------------------------------------------
