// tina/config.ts
import { defineConfig, LocalAuthProvider } from "tinacms";

// tina/auth-provider.ts
import { AbstractAuthProvider } from "tinacms";
var BetterAuthProvider = class extends AbstractAuthProvider {
  async authenticate() {
    window.location.assign("/login");
    return new Promise(() => {
    });
  }
  async getUser() {
    const res = await fetch("/api/auth/get-session", { credentials: "same-origin" });
    if (!res.ok) return null;
    const session = await res.json();
    return session?.user?.twoFactorEnabled ? session.user : null;
  }
  // Leeres Token: Tina hängt keinen Authorization-Header an, wertet es aber als angemeldet.
  async getToken() {
    return { id_token: "" };
  }
  async logout() {
    await fetch("/api/auth/sign-out", { method: "POST", credentials: "same-origin" });
    window.location.assign("/login");
  }
  // Ohne Bearer-Token würde die Basisklasse ein 401 nicht als abgelaufene Session melden.
  async fetchWithToken(input, init) {
    const res = await fetch(input, { ...init, credentials: "same-origin" });
    if (res.status === 401) this.sessionExpiredListener?.();
    return res;
  }
};

// tina/config.ts
var tokenBausteine = ["ColorPalette", "TypeScale", "LogoUsage", "Schriftstufen"].map((name) => ({
  name,
  label: name,
  fields: [{ type: "string", name: "unused", ui: { component: "hidden" } }]
}));
var isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
var config_default = defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  authProvider: isLocal ? new LocalAuthProvider() : new BetterAuthProvider(),
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
