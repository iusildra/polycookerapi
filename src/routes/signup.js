const validate = require("../services/tokenVerification");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const format = require("pg-format");
const pool = require("../db");
const uuid = require("uuid");

const userMiddleware = require("../middleware/user");

const error405 = { msg: "Action not authorized !" };

router
    /** Add a new user to the DB */
    .post("/", userMiddleware.validateRegister, (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        let admin = false; //Default value

        if (token != null) {
            validate.validateToken(token, (err, authorizedData) => {
                //If a logged in user create a new user, check if the token is valid and if the user is an admin
                if (err)
                    return res
                        .status(403)
                        .send({ msg: "Unvalid credentials !" });
                if (authorizedData.admin) {
                    //If the user is an admin, then the new user will be given the rights the admin gave him. Otherwise it will be a normal user
                    admin = req.body.isAdmin;
                }
            });
        }

        /** Passwd encryption */
        bcryptjs.hash(req.body.passwd, 10, (err_hash, hash) => {
            if (err_hash) return res.status(500).send({ msg: err_hash });
            else {
                //Hash OK, adding the new user to the DB
                const sql = format(
                    `INSERT INTO users VALUES (%L, %L, %L, %L, %L, NOW())`,
                    uuid.v4(),
                    req.body.email,
                    req.body.username,
                    admin,
                    hash
                );
                pool.query(sql, (err) => {
                    const msg = admin
                        ? "Your admin account has been registered !"
                        : "Your normal account has been registered !";
                    if (err) return res.status(500).send(err);
                    else
                        return res.status(200).send({
                            msg: msg,
                        });
                });
            }
        });
    })
    .get((req, res) => {
        return res.status(405).send(error405);
    })
    .delete((req, res) => {
        return res.status(405).send(error405);
    })
    .put((req, res) => {
        return res.status(405).send(error405);
    })
    .patch((req, res) => {
        return res.status(405).send(error405);
    });

module.exports = router;
