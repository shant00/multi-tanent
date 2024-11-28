import { ENUM_USER_ROLE } from "../../../enums/user";
import { makeHashPassword } from "../../../shared/hashPassword";
import prisma from "../../../shared/prisma";
import { dbConnect, dbDisconnect } from "../../../utils/dbConnect";
import { IUser } from "../user/user.interface";



const registerSchool = async (data: IUser) => {
  const hashedPassword = await makeHashPassword(data.password);

  const findUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (findUser) {
    throw new Error('User already exists with this email');
  }

  const schemaName = data.name.replace(/[^a-zA-Z0-9_]/g, '_');

  // Create the user
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: ENUM_USER_ROLE.TEACHER,
      schema: schemaName
    },
  });

  // Connect to the database
  const client = await dbConnect();
  if (!client) {
    throw new Error('Failed to connect to the database');
  }


  // SQL Queries
  const queryText = `CREATE SCHEMA IF NOT EXISTS "${schemaName}";`;
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "${schemaName}".teacher (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "${schemaName}".student (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        teacher_id INT,
        FOREIGN KEY (teacher_id) REFERENCES "${schemaName}".teacher(id) ON DELETE SET NULL
    );
  `;

  try {
    // Begin transaction
    await client.query('BEGIN');

    // Create schema
    await client.query(queryText);

    // Create tables
    await client.query(createTableQuery);

    // Commit transaction
    await client.query('COMMIT');

    console.log(`Schema and tables created for ${schemaName}`);
    return { ...user, schema: schemaName };
  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    if (error instanceof Error) {
      throw new Error(`Error creating schema: ${error.message}`);
    } else {
      throw new Error('Error creating schema');
    }
  } finally {
    // Disconnect the database client
    await dbDisconnect();
  }

};

const getSchoolData = async (schema: string) => {
  console.log("object");
  return schema;
}



export const SchoolService = {

  registerSchool,
  getSchoolData
}