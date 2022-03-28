const { validateToken } = require("../services/tokenVerification");
const userMiddleware = require("../middleware/user");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const format = require("pg-format");
const pool = require("../db");
const defaultLimit = 25;

const updateUser = `
UPDATE users
SET email=%L,username=%L
`;

router
    .route("/")
    .get((req, res) => {
        let limit = isNaN(req.query["limit"])
            ? defaultLimit
            : req.query["limit"];
        let offset = isNaN(req.query["offset"]) ? 0 : req.query["offset"];
        const sql = format(
            `SELECT user_id, username, registration
			FROM users
			OFFSET %L LIMIT %L`,
            offset,
            limit
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

router
    .route("/id/:id")
    .get((req, res) => {
        let limit = isNaN(req.query["limit"])
            ? defaultLimit
            : req.query["limit"];
        let offset = isNaN(req.query["offset"]) ? 0 : req.query["offset"];
        const sql = format(
            `SELECT user_id, username, registration,
				recipe_id, recipe_name, recipe_for,
				season_name, type_name, diet_name,
				recipe_difficulty, recipe_cost, creation_date
			FROM users
			INNER JOIN recipes ON recipe_author=user_id
            LEFT JOIN seasons ON season_name=recipe_season
            LEFT JOIN types ON type_name=recipe_type
            LEFT JOIN diets ON diet_name=recipe_diet
			WHERE user_id=%L
			ORDER BY recipe_name
			OFFSET %L LIMIT %L`,
            req.params["id"],
            offset,
            limit
        );
        pool.query(sql, (err, results) => {
            if (err) res.status(500).send({ msg: err });
            else res.status(200).json(results.rows);
        });
    })
    .put(userMiddleware.validateChange, async (req, res) => {
        let query = updateUser;
        const update = (sql) =>
            pool.query(sql, (err1, results) => {
                if (err1) res.status(500).send(err1);
                else
                    res.status(200).send({
                        msg: "Information successfully updated",
                    });
            });
        validateToken(req.headers.authorization.split(" ")[1], (err, data) => {
            if (err)
                return res.status(401).send({ msg: "You are not logged in !" });
            if (req.body.passwd) {
                bcryptjs.hash(req.body.passwd, 10, (err_hash, hash) => {
                    if (err_hash) return res.status(500).send(err_hash);
                    query += ",passwd=%L WHERE user_id=%L";
                    query = format(
                        query,
                        req.body.email,
                        req.body.username,
                        hash,
                        req.body.id
                    );
                    update(query);
                });
            } else {
                query += " WHERE user_id=%L";
                query = format(
                    query,
                    req.body.email,
                    req.body.username,
                    req.body.id
                );
                update(query);
            }
        });
    })
    .patch((req, res) => res.status(405))
    .delete((req, res) => {
        validateToken(req.headers.authorization.split(" ")[1], (err, data) => {
            if (err)
                return res.status(401).send({ msg: "You are not logged in !" });
            if (data.userid != req.params["id"]) {
                if (!data.admin) {
                    return res
                        .status(403)
                        .send({ msg: "You cannot delete a user !" });
                }
            }
            const sql = format(
                `DELETE FROM users WHERE user_id=%L`,
                req.params["id"]
            );
            pool.query(sql, (err1) => {
                if (err1) res.status(500).send(err1);
                else
                    res.status(200).send({
                        msg: "Sorry for not satisfying you :(",
                    });
            });
        });
    })
    .post((req, res) => res.status(405));

router
    .route("/username/:username/email/:email")
    .get((req, res) => {
        const sql = format(
            `SELECT user_id FROM users WHERE username=%L AND email=%L`,
            req.params["username"],
            req.params["email"]
        );
        pool.query(sql, (err, results) => {
            if (err) return res.status(500).send({ msg: err });
            if (results.rowCount == 0)
                return res.status(404).send({ msg: "Invalid credentials !" });
            return res
                .status(200)
                .send({
                    msg: "Valid credentials",
                    id: results.rows[0].user_id,
                });
        });
    })
    .post((req, res) => res.status(405))
    .put((req, res) => res.status(405))
    .patch((req, res) => res.status(405))
    .delete((req, res) => res.status(405));

module.exports = router;
