const Pilot = require('./pilots.model');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');

const getAll = async (req, res, next) => {
    try {
        const pilots = await Pilot.find();

        res.status(200).json(pilots);
    } catch (error) {
        return next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pilot = await Pilot.findById(id);
        res.status(200).json(pilot);
    } catch (error) {
        return next(error)
    }
}

const postOne = async (req, res, next) => {
    try {
        const pilot = new Pilot();
        pilot.name = req.body.name;
        pilot.nationality = req.body.nationality;
        pilot.birthdate = req.body.birthdate;
        pilot.category = req.body.category;
        pilot.races = req.body.races;
        pilot.victories = req.body.victories;
        if (req.file) pilot.img = req.file.path
        const pilotDB = await pilot.save();
        return res.status(201).json(pilotDB)
    } catch (error) {
        return next(error)
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pilot = new Pilot(req.body);
        pilot._id = id;
        if (req.file) pilot.img = req.file.path
        const updatePilot = await Pilot.findByIdAndUpdate(id, pilot);
        return res.status(200).json(updatePilot);
    } catch (error) {
        return next(error);
    }
}


const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pilot = await Pilot.findByIdAndDelete(id);
        if (pilot.img) deleteImgCloudinary(pilot.img)
        return res.status(200).json(pilot);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}