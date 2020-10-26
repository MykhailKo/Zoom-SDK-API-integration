(async () => {

    const express = require('express');
    const crypto = require('crypto');

    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    let app = express();
    
    app.get('/', (_req: any, res: any) => {
        res.send("Hello world");
    });

    app.post('/gensignature', (_req: any, _res: any) => {
        const timestamp = new Date().getTime() - 30000
        const msg = Buffer.from(apiKey + _req.body.meetingNumber + timestamp + _req.body.role).toString('base64')
        const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
        const signature = Buffer.from(`${apiKey}.${_req.body.meetingNumber}.${timestamp}.${_req.body.role}.${hash}`).toString('base64')
        _res.status(201).send({signature})
    });

    app.listen(8000, () => {
        console.log("Server has started");
    });

})();