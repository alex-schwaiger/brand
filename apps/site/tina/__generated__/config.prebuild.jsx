// tina/config.ts
import { defineConfig } from "tinacms";
var tokenBausteine = ["ColorPalette", "TypeScale", "LogoUsage", "Schriftstufen"].map((name) => ({
  name,
  label: name,
  fields: [{ type: "string", name: "unused", ui: { component: "hidden" } }]
}));
var config_default = defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  schema: {
    collections: [
      {
        name: "doc",
        label: "Seiten",
        path: "content/docs",
        format: "mdx",
        match: {
          // Änderungen wird aus packages/brand/CHANGELOG.md eingebunden, nicht in Tina bearbeitet
          exclude: "aenderungen"
        },
        fields: [
          { type: "string", name: "title", label: "Titel", isTitle: true, required: true },
          {
            type: "string",
            name: "description",
            label: "Beschreibung",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Inhalt",
            isBody: true,
            templates: tokenBausteine
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
