const express = require('express');
const router = express.Router();
const login = express.Router();
const chatweb = express.Router();
const checkJWT = require('../Service/middleware').checkToken;
const product = require('./Products');
const chat = require('./Chat');
const partner = require('./Register');
module.exports = function (app) {
    router.get('/sale', checkJWT, product.sale);
    router.get('/search', checkJWT, product.search);
    router.get('/', checkJWT, product.all);
    router.get('/byid/:id', checkJWT, product.byid);
    router.get('/categorylist', checkJWT, product.clist);
    router.get('/All_Spices_Masala_Curry', checkJWT, product.All_Spices_Masala_Curry);
    router.get('/Subcategorylist/:id', checkJWT, product.SubCategory);
    router.get('/test/MasalaSpiceBlends', checkJWT, product.Masala_Spice_Blends);
    router.get('/test/Spices', checkJWT, product.Spices);
    router.get('/All_Instant_Mix_Unique', checkJWT, product.All_Instant_Mix_Unique);
    router.get('/test/InstantMixBreakfastDinner', checkJWT, product.Instant_Mix_BreakfastDinner);
    router.get('/test/SweetMix', checkJWT, product.Sweet_Mix);
    chatweb.post('/messages', chat.communication);
    router.get('/Superfoods', checkJWT, product.Superfoods);
    router.get('/Millets', checkJWT, product.Millets);
    router.get('/Cold_Pressed_Oils', checkJWT, product.Cold_Pressed_Oils);
    router.get('/Beauty_and_Health', checkJWT, product.Beauty_and_Health);
    router.get('/test/:link', checkJWT, product.allcat);
    router.get('/testsubcat/:link/:subcat', product.subcat);
    login.post('/register', partner.register);
    login.get('/getcartitem/:id', checkJWT, partner.getcartitem)
    login.post('/mailfrompartner/:id', checkJWT, partner.mailfrompartner)
    login.post('/login', partner.login);
    login.put('/updatepswd/:id', partner.updatepswds);
    login.post('/savecartitem/:id', checkJWT, partner.savecartitem);
    login.post('/getpartnerdetailcheckout/:id', checkJWT, partner.partnerdetail);
    login.get('/Getpartnerdetail/:id', checkJWT, partner.Getpartnerdetail);
    login.post('/order', checkJWT, partner.order);
    login.post('/payment', checkJWT, partner.payment);
    app.use('/api/products', router);


    app.use('/api/partner', login);
    app.use('/api/chat', chatweb)




}; 