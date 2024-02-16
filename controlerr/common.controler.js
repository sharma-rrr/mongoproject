const { Request, Response } = require('express');
class CommonController {
    successMessage(data, msg, res) {
        try {
            return res.status(200).send({
                message: msg,
                data:data
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({
                error: {
                    message: 'Internal Server Error'
                }
            });
        }
    }

    errorMessage(msg, res) {
        try {
            return res.status(400).send({
                error: {
                    message: msg
                }
            });
        } catch (e) {
            console.error(e);
            return res.status(500).send({
                error: {
                    message: 'Internal Server Error'
                }
            });
        }
    }
}

module.exports = new CommonController();
