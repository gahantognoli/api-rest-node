const router = require('express').Router();
const atendimentoController = require('../controllers/atendimentos');

router.get('/', atendimentoController.lista);
router.get('/:id', atendimentoController.obterPorId);
router.post('/', atendimentoController.adiciona);
router.patch('/:id', atendimentoController.atualiza);
router.delete('/:id', atendimentoController.deleta);

module.exports = router;