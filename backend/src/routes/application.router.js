import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createJob,getJobById,getJobs,updateJob,deleteJob } from "../controller/application.controller.js";

const router = express.Router();

router.post('/', protectRoute, createJob);
router.get('/', protectRoute, getJobs);
router.get('/:id', protectRoute, getJobById);
router.put('/:id', protectRoute, updateJob);
router.delete('/:id', protectRoute, deleteJob);

export default router;