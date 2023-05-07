const express = require('express');
const router = express.Router();

/**
 * Routing for Articles
 */
const ResourceController = require("../controllers/ResourceController");
const controller = new ResourceController();

router.get('/', (req, res) => { controller.get(req, res) });
router.post('/create', (req, res) => { controller.create(req, res) });
router.put('/list/:id',(req,res)=>{ controller.getByUser(req,res)})
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.remove(req, res));

module.exports = router;
