import { Request, Response } from "express";
import { SchemaService } from "./schema.service";



// Create schema and table
export const createSchema = async (req: Request, res: Response) => {
  const { username, fields } = req.body;
  if (!username || !fields) {
    return res.status(400).json({ message: "Username and fields are required" });
  }

  try {
    await SchemaService.createNewSchema(username, fields);
    res.status(201).json({ message: `Schema ${username} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating schema", error });
  }
};

// Delete schema
export const deleteSchema = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // await pgClient.query(`DROP SCHEMA IF EXISTS ${username} CASCADE;`);
    res.status(200).json({ message: `Schema ${username} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting schema", error });
  }
};
