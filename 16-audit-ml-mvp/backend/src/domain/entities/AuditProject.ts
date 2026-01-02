export type AuditProjectStatus = "pending" | "in_review" | "completed";

export type AuditProject = {
  id: string;
  clientName: string;
  industry: string;
  status: AuditProjectStatus;
  createdAt: Date;
};
