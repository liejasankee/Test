const conn = require('./DbConnection');
const mail = require('./mail');
module.exports = {
    search: function (req, res) {
        console.log(req.params.id);
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("SELECT p.id as prod_id,p.product_name FROM product as p left join  categories_table as ct  on p.category_id= ct.id  where (p.product_name like '" + req.query.id + "%') ", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        });
    },
    clist: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select categories_name,image_url,route,route1,id,sub_categories from categories_table where (id !=0)", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        });


    },
    SubCategory: function (req, res) {
        console.log("hi");
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select * from sub_category where categories_id =" + req.params.id, (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        });
    },
    sale: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where ((InSale=1)or(buyonegetone=1))", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        });
    },
    all: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        });
    },
    byid: function (req, res) {
        console.log(req.params.id);
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where id=" + req.params.id, (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        });
    },
    All_Spices_Masala_Curry: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where (category_id =1)", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    Masala_Spice_Blends: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where ((category_id =1)and (sub_categories_id =2))", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    Spices: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer from product where ((category_id =1)and (sub_categories_id = 3))", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    All_Instant_Mix_Unique: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where (category_id =2)", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    Instant_Mix_BreakfastDinner: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where ((category_id =2)and (sub_categories_id = 5))", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    Sweet_Mix: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where ((category_id =2)and (sub_categories_id = 6))", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    Superfoods: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where (category_id =3)", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    Millets: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where (category_id =4)", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    Cold_Pressed_Oils: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where (category_id =5)", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    },
    Beauty_and_Health: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where (category_id =6)", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    }
    ,
    allcat: function (req, res) {
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        conn.query("select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where (category_id in (select id from categories_table where route1='" + req.params.link + "'))", (err, result) => {
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    }
    ,
    subcat: function (req, res) {
        let subcat = decodeURI(req.params.subcat);
        console.log("hiiiiii", req.params.subcat, subcat);
        function callback(result) {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        }
        let sql = "select product_name,id,NoOfCakes,category_id,NoOfPiecesInCake,image ,price,buyonegetone,InSale,salePrice,Offer,prod_desc from product where (sub_categories_id  in (select id from sub_category where sub_categories_name='" + subcat + "'))"
        conn.query(sql, (err, result) => {
            console.log(sql);
            if (err) {
                callback(err);
                return
            }
            callback(result);
        })
    }





























}; 