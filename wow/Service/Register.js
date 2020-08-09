const conn = require('./DbConnection');
const mail = require('./mail');
const { json } = require('express');
const sendtoken = require('./Token').sendToken;
module.exports = {
    register: function (req, res) {
        console.log(req.body);
        conn.query("INSERT INTO `partner_detail` ( `username`, `email`, `store_name`, `password`, `phonenumber` , `address`,`zipcode`) VALUES ('" + req.body.username + "','" + req.body.email + "','" + req.body.store_name + "',sha2('" + req.body.pass_word + "',224),'" + req.body.store_contact + "','" + req.body.Address + "','" + req.body.zipcode + "')", (err, result) => {
            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    res.json({ response: { duplicate_entry_for_column: 'email' } });
                    return;
                }
            }
            let id = result.insertId;
            res.json({ response: id });

        })
    },
    login: function (req, res) {
        console.log(req.body);
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "errors": null, "response": result }));
        }
        conn.query("select email,username,id  from partner_detail where email ='" + req.body.email + "' and password = SHA2('" + req.body.password + "', 224)", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            if (result.length > 0) {
                sendtoken(result, callback, result[0].username);
            }
            else {
                callback({ token: null });
            }
        })
    },
    async updatepswds(req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "errors": null, "response": result }));
        }
        let sql = "select email,username,id  from partner_detail where password = SHA2('" + req.body.oldpassword + "', 224);"
        let p = new Promise((resolver) => {
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    resolver(result);
                }

            })
        });
        let resul = await p;
        if (resul.length > 0) {
            if (resul[0].id == req.params.id) {
                let sql1 = "UPDATE `partner_detail` SET `password` = SHA2('" + req.body.newpassword + "', 224) WHERE (`id` = '" + req.params.id + "');";
                conn.query(sql1, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        sendtoken(result, callback, resul[0].username);
                    }
                })
            }
            else {
                callback("error");
            }
        }
        else {
            callback("error");
        }
    },
    partnerdetail: function (req, res) {
        let msg = req.body;
        console.log("hi");
        console.log(req.body, "bye");
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select username,email,store_name,phonenumber,address,zipcode from partner_detail where id =" + req.params.id, (err, result) => {
            if (err) {
                callback(err);

            }
            mail.checkout(msg, result[0], callback);
        });
    },

    Getpartnerdetail: function (req, res) {

        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select username,email,store_name,phonenumber,address,zipcode from partner_detail where id =" + req.params.id, (err, result) => {
            if (err) {
                callback(err);

            }
            callback(result);
        });
    },
    async savecartitem(req, res) {
        console.log(req.body);
        let promises = [];
        if (req.body != null) {

            for (let i = 0; i < req.body.length; i++) {
                (() => {
                    promises.push(new Promise((resolver) => {
                        req.body[i].prod_desc = "";
                        resolver();
                    }))
                })(req.body[i].prod_desc);
            }

            await Promise.all(promises);

            conn.query("UPDATE  `partner_detail` set `cartitem` =  ('" + JSON.stringify(req.body) + "')  where id=" + req.params.id, (err, result) => {
                if (err) {

                    console.log(err);
                }
                res.json({ response: "updated" });

            })
        }
        else {
            res.json({ response: "updated" });
        }
    },
    mailfrompartner: function (req, res) {
        let msg = req.body.description;
        console.log("hi");
        console.log(req.body, "bye");
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select username,email,store_name,phonenumber,address,zipcode from partner_detail where id =" + req.params.id, (err, result) => {
            if (err) {
                callback(err);
                return
            }
            mail.mail(msg, result[0], callback);
        });
    },
    async getcartitem(req, res) {
        let promises = [];
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));

        }

        let promise1 = new Promise((resolver) => {
            conn.query("select cartitem  from partner_detail where id =" + req.params.id, (err, result) => {
                if (err) {
                    callback(err);
                    return;
                }
                resolver([err, result]);
            });
        });
        let ans = await promise1;
        console.log(ans, ans[1][0], ans[1][0].cartitem);
        console.log(typeof (ans[1][0].cartitem), ans[1][0].cartitem);
        let cartitem = JSON.parse(ans[1][0].cartitem);
        console.log(typeof (cartitem), cartitem);
        if (cartitem != null) {

            for (let i = 0; i < cartitem.length; i++) {
                (() => {
                    promises.push(new Promise((resolver) => {

                        console.log(cartitem[i]);
                        conn.query("select prod_desc from product  where id=" + cartitem[i].id, (err, result) => {
                            if (err) {

                                console.log(err);
                            }
                            console.log(cartitem[i]);
                            cartitem[i].prod_desc = result[0].prod_desc;
                            console.log(cartitem[i].prod_desc);
                            resolver();

                        })


                    }))
                })(cartitem[i]);
            }

            await Promise.all(promises);
            res.send(cartitem);

        }
        else {
            res.send([]);
        }

    },
    order: function (req, res) {
        conn.query("select product_name,NoOfCakes,NoOfPiecesInCake,image ,price from product", (err, result) => {
            res.send(result);
        })
    },
    payment: function (req, res) {
        conn.query("select product_name,NoOfCakes,NoOfPiecesInCake,image ,price from product", (err, result) => {
            res.send(result);
        })
    }
}