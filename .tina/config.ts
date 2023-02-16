import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID!, // Get this from tina.io
  token: process.env.TINA_TOKEN!, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "notes",
        label: "Notes",
        path: "/notes",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "headline",
            label: "Headline",
            ui: {
              description: 'Optional title for a note. If this is filled out, it will be rendered as a headline.'
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            ui: {
              timeFormat: "HH:mm"
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
