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

// edit data barang
// app.put("/item/:id", (req, res) => {
//     let id = req.params.id;
//     /*
//     req.checkBody('nama', 'Tidak Boleh dikosongkan').notEmpty();
//     check for errors!
//     var errors = req.validationErrors();
//     if (errors) {
//       res.send('Terjadi kesalahan: ' + util.inspect(errors), 400);
//       return;
//      }
//      */
//     const { nama } = req.body;
//     if (req.body.nama) {
//         Barang.findOneAndUpdate({ kode: id }, { $set: { nama } }, (error, data) => {
//             if (error) return res.status(500).send(error.errors);
//             if (!data) return res.status(304).send("Update Failed!");
//             res.status(201).send("Updated!");
//         });
//     } else res.status(500).send("Terjadi Kesalahan.");
// });


app.listen(1777);