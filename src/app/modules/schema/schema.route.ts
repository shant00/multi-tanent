import { Router } from "express";
import { createSchema, deleteSchema } from "./schema.controller";


const router = Router();

// Schema routes
router.post("/", createSchema);
router.delete("/:username", deleteSchema);


export const SchemaRoutes = router;
