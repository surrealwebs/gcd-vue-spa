"use strict";

const Promise = require("bluebird");
const sqlite3 = require("sqlite3");
const path = require('path');

module.exports = {
  up: function() {
    return new Promise(function(resolve, reject) {
      /* Here we write our migration function */
      let db = new sqlite3.Database('./database/GDCTodoApp.db');
      //   enabling foreign key constraints on sqlite db
      db.run(`PRAGMA foreign_keys = ON`);
      db.serialize(function() {
        db.run(`CREATE TABLE todos (
          id INTEGER PRIMARY KEY,
          title TEXT,
          details TEXT,
          completed TEXT
        )`);        
      });
      db.close();
    });
  },
  
  down: function() {
    return new Promise(function(resolve, reject) {
      /* This runs if we decide to rollback. In that case we must revert the `up` function and bring our database to it's initial state */
      let db = new sqlite3.Database("./database/GDCTodoApp.db");
      db.serialize(function() {
        db.run(`DROP TABLE todos`);
      });
      db.close();
    });
  }
};