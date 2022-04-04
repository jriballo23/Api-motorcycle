const TeamRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/updateFile.middleware');

const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./teams.controller');

TeamRoutes.get('/', getAll);
TeamRoutes.get('/:id', getOne);
TeamRoutes.delete('/:id', [isAuth], deleteOne);
TeamRoutes.post('/', [isAuth], upload.single('img'), postOne);
TeamRoutes.patch('/:id', [isAuth], upload.single('img'), patchOne);

module.exports = TeamRoutes;