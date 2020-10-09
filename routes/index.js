const PatientController = require('../controllers/patients');
const router = require('express').Router();

router.post('/recovered/fetch', async (req, res) => {
    const {startDate, endDate, startAge, endAge, gender, state} = req.body
    const response = await PatientController.fetchRecoveredPatients(startDate, endDate, startAge, endAge, gender, state);
    res.status(response.code).send(response);
});

router.post('/deceased/fetch', async (req, res) => {
    const {startDate, endDate, startAge, endAge, gender, state} = req.body
    const response = await PatientController.fetchDeceasedPatients(startDate, endDate, startAge, endAge, gender, state);
    res.status(response.code).send(response);
});

router.post('/all/fetch', async (req, res) => {
    const {startDate, endDate, startAge, endAge, gender, state} = req.body
    const response = await PatientController.fetchAllPatients(startDate, endDate, startAge, endAge, gender, state);
    res.status(response.code).send(response);
});

router.post('/recovered/fetch/India', async (req, res) => {
    const {startDate, endDate, startAge, endAge, gender} = req.body
    const response = await PatientController.fetchRecoveredPatientsIndia(startDate, endDate, startAge, endAge, gender);
    res.status(response.code).send(response);
});

router.post('/deceased/fetch/India', async (req, res) => {
    const {startDate, endDate, startAge, endAge, gender} = req.body
    const response = await PatientController.fetchDeceasedPatientsIndia(startDate, endDate, startAge, endAge, gender);
    res.status(response.code).send(response);
});

router.post('/all/fetch/India', async (req, res) => {
    const {startDate, endDate, startAge, endAge, gender} = req.body
    const response = await PatientController.fetchAllPatientsIndia(startDate, endDate, startAge, endAge, gender);
    res.status(response.code).send(response);
});

router.post('/fetch', async (req, res) => {
    const {startDate, endDate, startAge, endAge, gender,state, status} = req.body
    const response = await PatientController.fetchAll(startDate, endDate, startAge, endAge, gender, state, status);
    res.status(response.code).send(response);
});

module.exports = router;
