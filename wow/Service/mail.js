let nodemailer = require('nodemailer');
const Email = require('email-templates');
const { pugEngine } = require("nodemailer-pug-engine");

module.exports =
{
    checkout: function (msg, jsondata, callback) {

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sankeethadafnee@gmail.com',
                pass: 'Nodejs@1996'
            }
        });
        transporter.use('compile', pugEngine({
            templateDir: __dirname + '/template',
            pretty: true
        }));

        var mailOptions = {
            from: 'sankeethadafnee@gmail.com',
            to: 'sankeethadafnee@gmail.com',
            subject: 'Purchase Order ',
            text: JSON.stringify(jsondata),
            template: 'content',
            ctx: {
                obj: jsondata,
                message: msg
            }

        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                callback(null);
            } else {
                console.log('Email sent: ' + info.response);
                callback(jsondata);
            }
        });

    },
    mail: function (msg, jsondata, callback) {


        console.log(msg)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sankeethadafnee@gmail.com',
                pass: 'Sankee@1996'

            }
        });
        transporter.use('compile', pugEngine({
            templateDir: __dirname + '/template',
            pretty: true
        }));

        var mailOptions = {
            from: 'sankeethadafnee@gmail.com',
            to: 'sankeethadafnee@gmail.com',
            subject: 'Purchase Order ',
            text: JSON.stringify(jsondata),
            template: 'mailform',
            ctx: {
                obj: jsondata,
                message: msg
            }

        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                callback(jsondata);
            }
        });

    }
}



