const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const format = require("pg-format");
const pool = require("../db");

router
    .route("/")
    /** Log in */
    .post((req, res) => {
        const sql = format(
            `SELECT *
            FROM users
            WHERE username=%L
                OR email=%L`,
            req.body.emailusername,
            req.body.emailusername
        );
        pool.query(sql, (err, results) => {
            //Check the validity of the username/email
            if (err) return res.status(500).send(err);
            if (results.rows.length != 1) {
                return res
                    .status(418)
                    .send({ msg: `I'm not ${req.body.emailusername}` });
            }
            bcryptjs.compare(
                req.body.passwd,
                results.rows[0]["passwd"],
                (bErr, bRes) => {
                    //Check the validity of the password
                    if (bErr) return res.status(500).send(bErr);
                    if (bRes) {
                        //Passwd OK, sign a json web token and send it
                        const token = jwt.sign(
                            {
                                username: results.rows[0].username,
                                userid: results.rows[0]["user_id"],
                                admin: results.rows[0].admin,
                            },
                            "4jRU=HyTeSf*$4JxN9&BupHJxaBNFX-A&F!NvR=JJ&L$LrPYYJqG8%HRNLKY!MKmcnXxGr!88nzXPgA8snQb6ad93NdrjjgK^F7K",
                            {
                                expiresIn: "6h",
                            }
                        );
                        return res.status(200).send({
                            token,
                            user: results.rows[0],
                        });
                    } else {
                        //Password inccorect
                        return res.status(400).send({
                            msg: "Username or password incorrect !",
                        });
                    }
                }
            );
        });
    })
    .get((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    })
    .delete((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    })
    .put((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    })
    .patch((req, res) => {
        return res.status(405).send({ msg: "Action not authorized !" });
    });

module.exports = router;
