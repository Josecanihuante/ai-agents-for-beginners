import type { Request, Response } from "express";
import { z } from "zod";
import type { CreateAuditProjectService } from "../../application/services/CreateAuditProjectService";
import type { IAuditProjectRepository } from "../../domain/interfaces/IAuditProjectRepository";

const createSchema = z.object({
  clientName: z.string().min(2),
  industry: z.string().min(2),
});

export class AuditProjectController {
  constructor(
    private readonly createService: CreateAuditProjectService,
    private readonly repository: IAuditProjectRepository
  ) {}

  create = async (request: Request, response: Response): Promise<void> => {
    const payload = createSchema.parse(request.body);
    const project = await this.createService.execute(payload);
    response.status(201).json(project);
  };

  list = async (_request: Request, response: Response): Promise<void> => {
    const projects = await this.repository.findAll();
    response.json(projects);
  };
}
