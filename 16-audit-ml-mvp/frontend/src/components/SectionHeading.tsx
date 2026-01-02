import React from "react";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  subtitle: string;
};

const SectionHeading = ({ kicker, title, subtitle }: SectionHeadingProps) => (
  <div style={{ display: "grid", gap: "12px" }}>
    <span className="badge">{kicker}</span>
    <h2 style={{ fontSize: "32px", fontWeight: 700 }}>{title}</h2>
    <p style={{ color: "#475569", maxWidth: "700px" }}>{subtitle}</p>
  </div>
);

export default SectionHeading;
