import type { AuditProject } from "../entities/AuditProject";
import type { IReadRepository } from "./IReadRepository";
import type { IWriteRepository } from "./IWriteRepository";

export interface IAuditProjectRepository
  extends IReadRepository<AuditProject>,
    IWriteRepository<AuditProject> {}
