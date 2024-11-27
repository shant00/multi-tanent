import { Request, Response } from "express";
import { ResumeService } from "./resume.service";



// Create a new resume
export const createResume = async (req: Request, res: Response) => {
  const { username, resumeData } = req.params;
  try {
    const result = await ResumeService.createResume(username, resumeData);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating resume", error });
  }
};

// Get all resumes
export const getResumes = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const result = await ResumeService.getResumes(username);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching resumes", error });
  }
};

// Get a single resume
export const getResumeById = async (req: Request, res: Response) => {
  const { username, id } = req.params;

  try {
    const result = await ResumeService.getResumeById(username, id);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching resume", error });
  }
};

// Update a resume
export const updateResume = async (req: Request, res: Response) => {
  const { username, id } = req.params;
  const resumeData = req.body;

  try {
    const result = await ResumeService.updateResume(username, id, resumeData);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating resume", error });
  }
};

// Delete a resume
export const deleteResume = async (req: Request, res: Response) => {
  const { username, id } = req.params;

  try {
    const result = await ResumeService.deleteResume(username, id);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting resume", error });
  }
};
