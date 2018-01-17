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
// app.post("/item", (req, res) => {
//     let { kode, nama, qtyIn } = req.body;
//     let barang = new Barang({
//         nama: nama,
//         kode: kode
//     });

//     barang.save((error, valueReturn) => {
//         let d = new Date();
//         let tgl = d.getTime() / 1000;
//         req.body.tgl;
//         let transaksi = new Transaksi({
//             id_item: valueReturn._id,
//             qtyIn: qtyIn,
//             tglTransaksi: tgl
//         });

//         transaksi.save(error => {
//             console.log(valueReturn._id);
//             if (error) return res.status(400).send(error.errors);
//             res.status(201).send("Success!");
//         });
//         if (error) return res.status(400).send(error.errors);
//     });
// });

// tampil data barang

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