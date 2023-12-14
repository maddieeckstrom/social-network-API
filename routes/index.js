const router = require('express').Router();
const apiroutes = require('./api');

router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;