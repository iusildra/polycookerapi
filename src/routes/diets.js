const router = require("express").Router();
const format = require("pg-format");
const pool = require("../db");

router.route("/").all((req, res, next) => {
    pool.query(`SELECT * FROM diets ORDER BY diet_name ASC`, (err, results) => {
        if (err) res.status(500).send({ msg: "DB Error, please try again" });
        else res.status(200).json(results.rows);
    });
});

router
    .route("/:id")
    .get((req, res) => {
        const sql = format(
            `SELECT * FROM diets WHERE diet_name=%L`,
            req.params["id"]
        );
        pool.query(sql, (err, results) => {
            if (err)
                res.status(500).send({ msg: "DB Error, please try again" });
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
