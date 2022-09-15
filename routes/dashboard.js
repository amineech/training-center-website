const express = require('express');

const router = express.Router();

//controller
const dashboard = require('../controllers/dashboard.js');

router.get('/dashboard', dashboard.display_dashboard);

module.exports = router;