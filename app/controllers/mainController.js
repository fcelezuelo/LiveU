const request = require('request');
const querystring = require('querystring');

const nameModel = require('../models/nameModel');
const lastNameModel = require('../models/lastNameModel');
const emailModel = require('../models/emailModel');
const joinModel = require('../models/joinModel');

const mainController = {
    index: (req, res) => {
        indexRender(res);
    },

    create: (req, res) => {
        const { nome, sobrenome, email } = req.body;
        const form = {
            nome,
            sobrenome,
            email
        };

        const formData = querystring.stringify(form);
        const contentLength = formData.length;

        request({
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: process.env.URL_API,
            body: formData,
            method: 'POST'
        }, async (err, response, body) => {
            if (err) {
                console.log(err);
                res.status(400).send('error')
            } else {
                const resp = await SplitString(body, form, res);

                const nameCod = await nameModel.insert(resp.nome.value,resp.nome.cod);
                const lastNameCod = await lastNameModel.insert(resp.sobrenome.value,resp.sobrenome.cod);
                const emailCod = await emailModel.insert(resp.email.value,resp.email.cod);

                const objName = await nameModel.getSumAndCod(nameCod);
                const objLastName = await lastNameModel.getSumAndCod(lastNameCod);
                const objEmail = await emailModel.getSumAndCod(emailCod);

                const nameSum = Number(objName.cod) + Number(objName.soma);
                const lastNameSum = Number(objLastName.cod) + Number(objLastName.soma);
                const emailSum = Number(objEmail.cod) + Number(objEmail.soma);

                const total = nameSum + lastNameSum + emailSum;

                const finalResult = await joinModel.getFinalResult(total);

                indexRender(res, finalResult);
            }
        });
    }
}

function indexRender(res, result = {}) {
    res.render('index', { result });
}

async function SplitString(body, data, res) {
    const separator = body.substr(body.length - 1, 1);
    body = body.split(separator);
    return {
        nome: { value: data.nome, cod: body[1] },
        sobrenome: { value: data.sobrenome, cod: body[3] },
        email: { value: data.email, cod: body[5] }
    }
}

module.exports = mainController;