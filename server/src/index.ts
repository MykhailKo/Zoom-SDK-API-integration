(async () => {

    const express = require('express');

    let app = express();
    
    app.get('/', (_req: any, res: any) => {
        res.send("Hello world");
    });

    app.listen(3000, () => {
        console.log("Server has started");
    });

})();