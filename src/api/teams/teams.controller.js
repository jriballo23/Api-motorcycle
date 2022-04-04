const Team = require('./teams.model');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile.middleware');

const getAll = async (req, res, next) => {
    try {
        
        const teams = await Team.find().populate('pilots');
        res.status(200).json(teams);
    } catch (error) {
        return next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const team = await Team.findById(id).populate('pilots');
        res.status(200).json(team);
    } catch (error) {
        return next(error)
    }
}


const postOne = async (req, res, next) => {
    try {
        const team = new Team();
        team.name = req.body.name;
        team.country = req.body.country;
        team.fundationYear = req.body.fundationYear;
        team.base = req.body.base;
        team.championships = req.body.championships;
        team.currentBike = req.body.currentBike;
        team.pilots = req.body.pilots;
        if (req.file) team.img = req.file.path
        const teamDB = await team.save();
        return res.status(201).json(teamDB)
    } catch (error) {
        return next(error)
    }
}


const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const team = new Team();
        team.name = req.body.name;
        team.year = req.body.year;
        team.pilots = req.body.pilots;
        if (req.file) team.img = req.file.path
        team._id = id;
        const updateTeam = await Team.findByIdAndUpdate(id, team);
        return res.status(200).json(updateTeam);
    } catch (error) {
        return next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const team = await Team.findByIdAndDelete(id);
        if (team.img) deleteImgCloudinary(team.img)
        return res.status(200).json(team);
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