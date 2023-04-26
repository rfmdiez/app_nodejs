import { Router } from "express"
import { getCompany } from "../controllers/companies.controller.js";

const router = Router()

router.get('/companies/:id', getCompany)

export default router