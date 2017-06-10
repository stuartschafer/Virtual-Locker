// Requiring our models
var db = require("../models");

module.exports = function(app) {
    
    app.get("/api/inventory", function(req, res) {
        var query = {};
        if (req.query.UserId) {
            query.UserId = req.query.UserId;
        }

        db.Item.findAll({
            where: query,
            include: [db.User]
        }).then(function(results) { 
            // console.log(results);  
            res.json(results);
        });
    });

    // POST route for saving a new item
    app.post("/api/item", function(req, res) {
        console.log("~~~~~~~HERE~~~~~~~~");
        console.log(req.body);
        db.Item.create(req.body).then(function(result) {
            res.redirect("/add.html");
            // res.json(result);
        });
    });

    // PUT route for updating an item
    app.put("/api/inventory", function(req, res) {
        db.Item.update(
        req.body,
        {
            where: {
            id: req.body.id
            }
        }).then(function(result) {
            res.redirect("/inventory.html");
        });
    });

    // DELETE route for deleting and item
    app.delete("/api/inventory/:id", function(req, res) {
        db.Item.destroy({
        where: {
            id: req.params.id
        }
        }).then(function(result) {
            res.redirect("/inventory.html");
        });
    });
};