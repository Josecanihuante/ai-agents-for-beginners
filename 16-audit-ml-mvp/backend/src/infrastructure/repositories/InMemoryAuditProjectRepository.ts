import type { AuditProject } from "../../domain/entities/AuditProject";
import type { IAuditProjectRepository } from "../../domain/interfaces/IAuditProjectRepository";

export class InMemoryAuditProjectRepository implements IAuditProjectRepository {
  private readonly projects = new Map<string, AuditProject>();

  async findById(id: string): Promise<AuditProject | null> {
    return this.projects.get(id) ?? null;
  }

  async findAll(): Promise<AuditProject[]> {
    return Array.from(this.projects.values());
  }

  async create(data: AuditProject): Promise<AuditProject> {
    this.projects.set(data.id, data);
    return data;
  }

  async update(data: AuditProject): Promise<AuditProject> {
    this.projects.set(data.id, data);
    return data;
  }
}
