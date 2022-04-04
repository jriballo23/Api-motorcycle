const PilotRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/updateFile.middleware');

const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./pilots.controller');

PilotRoutes.get('/', getAll);
PilotRoutes.get('/:id', getOne);
PilotRoutes.delete('/:id', [isAuth], deleteOne);
PilotRoutes.post('/', [isAuth], upload.single('img'), postOne);
PilotRoutes.patch('/:id', [isAuth], upload.single('img'), patchOne);

module.exports = PilotRoutes;