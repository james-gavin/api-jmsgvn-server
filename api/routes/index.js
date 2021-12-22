const express = require('express');
const router = express.Router();
const redis = require('redis');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api', function (req, res, next) {

  (async () => {
    const client = redis.createClient();
  
    client.on('error', (err) => console.log('Redis Client Error', err));
  
    await client.connect();
  
    const value = await client.get('server');
    res.status(200).json(JSON.parse(value));
  })();
})

module.exports = router;
