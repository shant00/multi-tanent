import { Client } from "pg";
import config from "../config";
import ApiError from "../errors/ApiError";

const pgClient = new Client({
  connectionString: config.database_url,
})
export const dbConnect = async () => {
  try {

    await pgClient.connect();
    return pgClient;
  } catch (err) {
    throw new ApiError(500, `Error connecting to PostgreSQL database ${err}`);
  }
}

export const dbConnectWithChangeSchema = async (schema: string) => {
  try {
    const pgClient = new Client({
      connectionString: config.database_url,
      options: `-c search_path=${schema}`
    });
    await pgClient.connect();
    await changeSchema(schema, pgClient);
    return pgClient;
  } catch (err) {
    throw new ApiError(500, `Error connecting to PostgreSQL database ${err}`);
  }
}

export const changeSchema = async (username: string, pgClient: Client) => {
  const schema = username;
  return pgClient.query(`SET search_path TO ${schema}, public;`);
}


export const dbDisconnect = async () => {
  try {
    await pgClient.end();
  } catch (err) {
    throw new ApiError(500, `Error disconnecting from PostgreSQL database ${err}`);
  }
}