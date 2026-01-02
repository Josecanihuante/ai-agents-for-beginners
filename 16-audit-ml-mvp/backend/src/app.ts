import express from "express";
import helmet from "helmet";
import { auditRoutes } from "./presentation/routes/auditRoutes";
import { helmetConfig } from "./infrastructure/security/helmetConfig";

export const createApp = () => {
  const app = express();

  app.use(helmet(helmetConfig));
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", auditRoutes);

  return app;
};
