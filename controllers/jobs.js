const getAllJobs = async (req,res) => {
    res.send('getAllJobs');
}

const getJob = async (req,res) => {
    res.send('get single job');
}

const createJob = async (req,res) => {
    res.send('create a job');
}

const updateJob = async (req,res) => {
    res.send('update job');
}

const deleteJob = async (req,res) => {
    res.send('delete job');
}

module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob};