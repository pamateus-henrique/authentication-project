const Job = require('../models/Job');
const {BadRequestError, NotFoundError} = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req,res) => {
    const createdBy = req.user.userId;
    const jobs = await Job.find({createdBy});
    res.status(StatusCodes.OK).json({ jobs });    
}

const getJob = async (req,res) => {
    
    const createdBy = req.user.userId;
    const _id = req.params.id;

    const job = await Job.findOne({createdBy, _id});

    if(!job){
        throw new NotFoundError('no job with this ID');
    }
    res.status(StatusCodes.OK).json({ job });

}

const createJob = async (req,res) => {

    const {company, position} = req.body;
    const createdBy = req.user.userId;
    if(!company || !position){
        throw new BadRequestError('please provide all information');
    }

    const job = await Job.create({company, position, createdBy});
    console.log(job);
    res.status(StatusCodes.CREATED).json({ job });


    // req.body.createdBy = req.user.userId;
    // const job = await Job.create({...req.body});
    // res.status(StatusCodes.CREATED).json({job});
}

const updateJob = async (req,res) => {
    const {company, position} = req.body;
    const createdBy = req.user.userId;
    const _id = req.params.id;

    if(!company || !position){
        throw new BadRequestError('please provide all information');
    }

    const job = await Job.findOneAndUpdate({_id, createdBy}, {company, position}, {runValidators: true, new: true});

    if(!job){
        throw new NotFoundError('no job with this ID');
    }

    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req,res) => {

    const createdBy = req.user.userId;
    const _id = req.params.id;

    const job = await Job.findOneAndDelete({_id, createdBy});

    if(!job){
        throw new NotFoundError('No job with this id');
    }

    res.status(StatusCodes.OK).json({job});
}

module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob};