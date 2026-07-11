import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "fashion-gate",
  title: "Fashion Gate",
  projectId: "4y6hfnze",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool()
  ],
  schema: {
    types: schemaTypes
  }
});
