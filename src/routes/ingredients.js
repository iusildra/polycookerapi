const valide = require("../services/tokenVerification");
const router = require("express").Router();
const format = require("pg-format");
const pool = require("../db");

router
    .route("/")
    .get((req, res) => res.status(405))
    /** Add a new ingredient to the db. Verify that the user is logged in */
    .post((req, res) => {
        valide.validateToken(
            req.headers.authorization.split(" ")[1],
            (err, data) => {
                if (err)
                    return res
                        .status(401)
                        .send({ msg: "You are not logged in !" });
                const sql = format(
                    `INSERT INTO ingredients VALUES(%L, %L, %L)`,
                    req.body.ingredient_name,
                    req.body.is_allergen,
                    req.body.ingredient_season
                );
                pool.query(sql, (err1, results) => {
                    if (err1) return res.status(500).send({ msg: err1 });
                    res.status(200).send({
                        msg: "Ingredient successfully added !",
                    });
                });
            }
        );
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

router
    .route("/name/:name")
    /** Get every ingredient beginning with :name. Used for autocompletion */
    .get((req, res) => {
        const sql = format(
            `SELECT *
			FROM ingredients
			WHERE LOWER(ingredient_name) LIKE LOWER('%s%%')`,
            req.params["name"]
        );
        pool.query(sql, (err, results) => {
            if (err) res.status(500).send({ msg: err });
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
