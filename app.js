const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = require("./config/db");

// tampil data
app.get("/user/get", (req, res) => {
    connection.query("SELECT * FROM users", function(err, data) {
        if (err) return res.json({
            status: "400",
            message: "Failed",
            result: []
        });

        return res.json({
            status: "200",
            message: "success",
            result: data
        });
    });
});

// input data 
app.post("/user/post", (req, res) => {
    let input = JSON.parse(JSON.stringify(req.body));

    // req.getConnection((err, connection) => {
    let data = {
        name: input.name,
        address: input.address,
        email: input.email,
        phone: input.phone
    };

    let query = connection.query("INSERT INTO users set ? ", data, function(
        err,
        rows
    ) {
        if (err) console.log("Error inserting : %s ", err);

        res.redirect("/user/get");
    });

    // });
});

// edit data
app.put("/user/put/:id", (req, res) => {
    let input = JSON.parse(JSON.stringify(req.body));
    let id = req.params.id;

    let data = { name: input.name, address: input.address, email: input.email, phone: input.phone };

    connection.query(
        "UPDATE users set ? WHERE userId = ? ", [data, id],
        function(err, rows) {
            if (err) console.log("Error Updating : %s ", err);

            res.send(data);
        }
    );
});

// hapus data
app.delete('/user/delete/:id', (req, res) => {
    let id = req.params.id;

    connection.query("DELETE FROM users  WHERE userId = ? ", [id], function(err, rows) {

        if (err)
            console.log("Error deleting : %s ", err);

        res.redirect('/user/get');

    });
});

app.listen(1777);