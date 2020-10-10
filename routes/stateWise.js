const router = require('express').Router();
const statewiseController = require("../controllers/StatewiseDetailsController")

router.get("/getBeds", async(req, res) => {
    const { state } = req.query;
    const { payload, code } = await statewiseController.getBedsController(state)
    res.status(code).send(payload)
})

router.get("/getHelpline", async(req, res) => {
    const { state } = req.query;
    const { payload, code } = await statewiseController.getHelplineController(state)
    res.status(code).send(payload)
})

router.get("/getMedicalSchools", async(req, res) => {
    const { state } = req.query;
    const { payload, code } = await statewiseController.getMedicalCollegesController(state)
    res.status(code).send(payload)
})


module.exports = router;