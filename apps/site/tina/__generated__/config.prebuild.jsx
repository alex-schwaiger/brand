// tina/config.ts
import { color } from "@alex-schwaiger/brand/tokens";
import { defineConfig } from "tinacms";
var tokenBausteine = [
  "TypeScale",
  "LogoUsage",
  "Schriftstufen",
  "Seitenuebersicht"
].map((name) => ({
  name,
  label: name,
  fields: [{ type: "string", name: "unused", ui: { component: "hidden" } }]
}));
var colorPalette = {
  name: "ColorPalette",
  label: "ColorPalette",
  fields: [
    {
      type: "object",
      name: "rollen",
      label: "Verwendung der Farbrollen",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.rolle ?? "Neue Farbrolle" }) },
      fields: [
        {
          type: "string",
          name: "rolle",
          label: "Farbrolle",
          required: true,
          options: Object.keys(color)
        },
        {
          type: "string",
          name: "verwendung",
          label: "Verwendung",
          required: true,
          ui: { component: "textarea" }
        }
      ]
    }
  ]
};
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
            templates: [colorPalette, ...tokenBausteine]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
