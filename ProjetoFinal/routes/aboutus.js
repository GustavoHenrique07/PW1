const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('aboutus', { title: 'Sobre Nós' });
});

module.exports = router;
