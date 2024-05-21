const {Router} = require("express");
const router = new Router();

router.get('/', (req, res) => {
    return res.send({
        message: "Connected with success"
    });
});

module.exports = router;