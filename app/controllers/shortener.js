const axios                = require('axios');
const { validationResult } = require('express-validator');

module.exports.home = (application, req, res) => {
    const options = [
        { value: '1h', label: 'uma hora' },
        { value: '3h', label: 'três horas' },
        { value: '1d', label: 'um dia' },
        { value: '1w', label: 'uma semana' },
        { value: '1m', label: 'um mês' }
    ];

    res.render('index', { options });
};

module.exports.redirect = (application, req, res) => {
    const shortURLId = req.params.shortURLId;

    // Realiza consulta ao banco de dados
    const ShortURL = application.models.ShortURL;
    ShortURL.findById(shortURLId, (err, shortURL) => {
        if (!err) {
            if (shortURL) {
                res.render('redirect', { data: shortURL });
            } else {
                res.render('404');
            }
        } else {
            res.render('404');
        }
    });
};

module.exports.shorten = (application, req, res) => {
    // Valida dados do formulário
    const result = validationResult(req);

    // Verifica se não existem erros
    if (result.isEmpty()) {
        try {
            const originalURL    = req.body.original_url;
            const expirationTime = req.body.expiration_time;
            const reCaptcha      = req.body.recaptcha;

            // Realiza validação do reCAPTCHA
            verifyCaptcha(reCaptcha, (err, response) => {
                if (!err) {
                    let data = response.data;

                    // Verfica se a CAPTCHA é válida
                    if (data.success) {
                        const _id    = application.utils.identifier.unique();
                        const now    = new Date();
                        let expireAt = new Date(now.getTime() + application.utils.time.parse(expirationTime));

                        let ShortURL = application.models.ShortURL;

                        // Cria uma nova URL encurtada
                        ShortURL.create({
                            _id,
                            originalURL,
                            createdAt: now,
                            expireAt
                        }, (err) => {
                            
                            if (!err) {
                                res.status(201).json({
                                    payload: {
                                        short_url: `/${_id}`,
                                        expire_at: expireAt.getTime()
                                    }
                                });
                            } else {
                                res.status(400).json({
                                    error: 'Não foi possível encurtar a URL'
                                });
                            }
                        });
                    } else {
                        res.status(400).json({
                            error: 'CAPTCHA inválido'
                        });
                    }
                } else {
                    res.status(400).json({
                        error: 'Erro ao validar CAPTCHA'
                    });
                }
            });
        
        } catch (err) {
            res.status(400).json({
                error: 'Erro ao processar dados'
            });
        }
    } else {
        res.status(400).json({
            error: 'Erro na validação dos dados',
            errors: result['errors']
        });
    }
};

function verifyCaptcha(token, callback) {
    const endpoint   = 'https://www.google.com/recaptcha/api/siteverify';
    const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '6LfPtAYdAAAAAOvgB-YJyyeGjq-MIU4-u_l8sDsM';

    axios({
        method: 'POST',
        url: endpoint,
        params: {
            secret: SECRET_KEY,
            response: token
        }
    }).then(response => {
        callback(null, response);
    }).catch(err => {
        callback(err, null);
    });
}