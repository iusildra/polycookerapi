const router = require("express").Router();
const pool = require("../db");

router.route("/").all((req, res, next) => {
    pool.query(`SELECT * FROM units`, (err, results) => {
        if (err) res.status(500).send(err);
        else res.status(200).json(results.rows);
    });
});

router
    .route("/:id")
    .get((req, res) => {
        const sql = format(
            `SELECT * FROM units WHERE unit_name=%L`,
            req.params["id"]
        );
        pool.query(sql, (err, results) => {
            if (err) res.status(500).send(err);
            else res.status(200).json(results.rows);
        });
    })
    .post((req, res) => {
        return res.status(405);
    })
    .put((req, res) => {
        return res.status(405);
    })
    .patch((req, res) => {
        return res.status(405);
    })
    .delete((req, res) => {
        return res.status(405);
    });

module.exports = router;
