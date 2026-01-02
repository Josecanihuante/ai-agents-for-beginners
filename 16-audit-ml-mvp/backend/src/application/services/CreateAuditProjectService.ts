import { randomUUID } from "node:crypto";
import type { AuditProject } from "../../domain/entities/AuditProject";
import type { IAuditProjectRepository } from "../../domain/interfaces/IAuditProjectRepository";

export type CreateAuditProjectInput = {
  clientName: string;
  industry: string;
};

export class CreateAuditProjectService {
  constructor(private readonly repository: IAuditProjectRepository) {}

  async execute(input: CreateAuditProjectInput): Promise<AuditProject> {
    const now = new Date();
    const project: AuditProject = {
      id: randomUUID(),
      clientName: input.clientName.trim(),
      industry: input.industry.trim(),
      status: "pending",
      createdAt: now,
    };

    return this.repository.create(project);
  }
}
