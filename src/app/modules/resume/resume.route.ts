import { Router } from "express";
import { createResume, deleteResume, getResumeById, getResumes, updateResume } from "./resume.controller";


const router = Router();
// Resume routes
router.post("/:username", createResume);
router.get("/:username", getResumes);
router.get("/:username/:id", getResumeById);
router.put("/:username/:id", updateResume);
router.delete("/:username/:id", deleteResume);

export const ResumeRoutes = router;
