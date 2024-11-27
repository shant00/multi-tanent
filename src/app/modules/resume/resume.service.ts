import ApiError from "../../../errors/ApiError";
import { changeSchema, dbConnect, dbDisconnect } from "../../../utils/dbConnect";

const getResumes = async (username: string) => {
  try {
    const Client = await dbConnect();
    await changeSchema(username, Client);
    const result = await Client.query("SELECT * FROM resume;");
    return result.rows;
  } catch (error) {
    throw new ApiError(500, `Error fetching resumes: ${(error as Error)?.message}`);
  }
}


const getResumeById = async (username: string, id: string) => {
  try {
    const Client = await dbConnect();
    await changeSchema(username, Client);
    const result = await Client.query("SELECT * FROM resume WHERE id = $1;", [id]);

    if (result.rows.length === 0) {
      throw new ApiError(404, "Resume not found");
    }

    return result.rows[0];
  } catch (error) {
    throw new ApiError(500, `Error fetching resume: ${(error as Error)?.message}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createResume = async (username: string, resumeData: any) => {
  const pgClient = await dbConnect();

  try {
    await changeSchema(username, pgClient);
    const columns = Object.keys(resumeData).join(", ");
    const values = Object.values(resumeData);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

    const query = `INSERT INTO resume (${columns}) VALUES (${placeholders}) RETURNING *;`;
    const result = await pgClient.query(query, values);

    return result.rows[0];
  } catch (error) {
    throw new ApiError(500, `Error creating resume: ${(error as Error)?.message}`);
  } finally {
    dbDisconnect(pgClient);
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateResume = async (username: string, id: string, resumeData: any) => {
  try {
    const pgClient = await dbConnect();
    await changeSchema(username, pgClient);
    const updates = Object.entries(resumeData)
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      .map(([key, _], index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = [...Object.values(resumeData), id];

    const query = `UPDATE resume SET ${updates} WHERE id = $${values.length} RETURNING *;`;
    const result = await pgClient.query(query, values);

    if (result.rows.length === 0) {
      throw new ApiError(404, "Resume not found");
    }

    return result.rows[0];
  } catch (error) {
    throw new ApiError(500, `Error updating resume: ${(error as Error)?.message}`);
  }
}


const deleteResume = async (username: string, id: string) => {
  try {
    const pgClient = await dbConnect();
    await changeSchema(username, pgClient);
    const result = await pgClient.query("DELETE FROM resume WHERE id = $1 RETURNING *;", [id]);

    if (result.rows.length === 0) {
      throw new ApiError(404, "Resume not found");
    }

    return result.rows[0];
  } catch (error) {
    throw new ApiError(500, `Error deleting resume: ${(error as Error)?.message}`);
  }
}

export const ResumeService = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume

}