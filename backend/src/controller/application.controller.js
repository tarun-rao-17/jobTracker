import Job from "../models/job.model.js";




/**
 * @desc    Create new job application
 * @route   POST /api/jobs
 * @access  Private
 */

export const createJob = async (req, res) => {
    try {
        const { company, position, status, jobType, appliedDate, notes } = req.body;
        const userId = req.user._id;
        
        if (!company || !position) {
            return res.status(400).json({ message: "Company and position are required" });
        }
        

        const job = new Job({
            user: userId,
            company,
            position,
            status,
            jobType,
            appliedDate,
            notes
        });

        await job.save();
        return res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Get all job applications for the authenticated user
 * @route   GET /api/jobs
 * @access  Private
 */

export const getJobs = async (req, res) => {
    try {
        const userId = req.user._id;
        const jobs = await Job.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @desc    Get a single job application by ID
 * @route   GET /api/jobs/:id
 * @access  Private
 */

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;
        
        const job = await Job.findOne({ _id: jobId, user: userId });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        return res.status(200).json(job);
    }
    catch (error) {
        console.error("Error fetching job:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * @desc    Update a job application by ID
 * @route   PUT /api/jobs/:id
 * @access  Private
 */

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;
        const { company, position, status, jobType, appliedDate, notes } = req.body;

        const job = await Job.findOne({ _id: jobId, user: userId });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        job.company = company || job.company;
        job.position = position || job.position;
        job.status = status || job.status;
        job.jobType = jobType || job.jobType;
        job.appliedDate = appliedDate || job.appliedDate;
        job.notes = notes || job.notes;

        await job.save();
        return res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @desc    Delete a job application by ID
 * @route   DELETE /api/jobs/:id
 * @access  Private
 */

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;
        
        const job = await Job.findOneAndDelete({ _id: jobId, user: userId });   
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
