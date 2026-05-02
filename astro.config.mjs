import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://artefisual.com/",
  integrations: [tailwind(), icon()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  output: "server",
  security: {
    checkOrigin: false,
  },
  server: {
    port: 3000,
  },
});
