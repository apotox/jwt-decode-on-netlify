
require('dotenv').config()

const { headers } = require('./utils/responseOptions')
const { sgMail } = require('./utils/mail')
const fetch = require('node-fetch');

exports.handler = async function (event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;

    //cors
    if (event.httpMethod == "OPTIONS") {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "invalid request", headers };
    }


    let body = null
    if (event.body) {
        try {
            body = JSON.parse(event.body)
        } catch (err) {
            return ({
                headers,
                statusCode: 400,
                body: err.message
            })
        }
    }

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.recaptcha_secret_key}&response=${body["captcha"]}`;

    let googleResponse = await fetch(url, {
        method: 'post'
    }).then(resp => resp.json())

    if (!googleResponse.success) {
        return { statusCode: 401, body: "invalid captcha", headers };
    }


    const msg = {
        to: body["to"],
        from: "jwtdecoded@saphy.net",
        subject: 'Decoded JWT',
        html: body["content"],
    };


    try {
        await sgMail.send(msg);
    } catch (err) {
        return ({
            headers,
            statusCode: 400,
            body: `error sending email ${err.message}`
        })
    }

    return ({
        headers,
        statusCode: 200,
        body: `hello`
    })
}
