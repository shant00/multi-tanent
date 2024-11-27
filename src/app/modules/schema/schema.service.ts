import ApiError from "../../../errors/ApiError";
import { dbConnect, dbDisconnect } from "../../../utils/dbConnect";
import { Field } from "./schema.constant";

const createNewSchema = async (username: string, fields: Field[]) => {
  console.log("object");
  const client = await dbConnect();
  console.log(client);
  if (!client) {
    throw new Error("Failed to connect to the database");
  }


  const queryText = `CREATE SCHEMA IF NOT EXISTS ${username};`;
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${username}.resume (
      id SERIAL PRIMARY KEY,
      userId INT REFERENCES public."User"(id),
      createdAt TIMESTAMPTZ DEFAULT NOW(),
      updatedAt TIMESTAMPTZ DEFAULT NOW(),
      ${fields
      .map(({ name, type, isArray }) => {
        return `${name} ${type}${isArray ? "[]" : ""}`;
      })
      .join(",")}
    );
  `;
  console.log("here");
  try {
    await client.query("BEGIN");

    await client.query(queryText);

    await client.query(createTableQuery);

    await client.query("COMMIT");

    const schema = { username, fields };
    return schema;
  } catch (error) {

    await client.query("ROLLBACK");
    throw new ApiError(500, `Error creating schema: ${(error as Error)?.message}`);
  } finally {
    dbDisconnect(client);
  }
};


export const SchemaService = {
  createNewSchema
}