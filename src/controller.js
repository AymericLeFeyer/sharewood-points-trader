const cron = require('./utils/cron');
const router = require('express').Router();
const service = require('./service');

// Init scheduled task
cron.eachDay(service.tradeSharewoodPoints, 'Sharewood');

// Routes
router.get('/', async (req, res) => {
  try {
    const data = await service.tradeSharewoodPoints();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Erreur lors de la récupération des données Sharewood.'
    });
  }
});

module.exports = router;