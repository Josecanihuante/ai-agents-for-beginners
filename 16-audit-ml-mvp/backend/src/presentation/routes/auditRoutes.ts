import { Router } from "express";
import { AuditProjectController } from "../controllers/AuditProjectController";
import { CreateAuditProjectService } from "../../application/services/CreateAuditProjectService";
import { InMemoryAuditProjectRepository } from "../../infrastructure/repositories/InMemoryAuditProjectRepository";

const repository = new InMemoryAuditProjectRepository();
const createService = new CreateAuditProjectService(repository);
const controller = new AuditProjectController(createService, repository);

export const auditRoutes = Router();

auditRoutes.post("/projects", controller.create);
auditRoutes.get("/projects", controller.list);
