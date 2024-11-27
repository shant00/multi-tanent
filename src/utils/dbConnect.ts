import { Client } from "pg";
import config from "../config";
import ApiError from "../errors/ApiError";

export const dbConnect = async () => {
  try {
    const pgClient = new Client({ connectionString: config.database_url });
    await pgClient.connect();
    return pgClient;
  } catch (err) {
    throw new ApiError(500, `Error connecting to PostgreSQL database ${err}`);
  }
}


export const changeSchema = async (username: string, pgClient: Client) => {
  const schema = username;
  return pgClient.query(`SET search_path TO ${schema}, public;`);
}


export const dbDisconnect = async (pgClient: Client) => {
  try {
    await pgClient.end();
  } catch (err) {
    throw new ApiError(500, `Error disconnecting from PostgreSQL database ${err}`);
  }
}