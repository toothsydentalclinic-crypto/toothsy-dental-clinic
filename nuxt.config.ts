import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css", // fixed: alias instead of relative "./" path
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  },
  runtimeConfig: {
    public: {
      emailjsServiceId: "service_09csxvs",
      emailjsTemplateId: "template_kh59r91",
      emailjsPublicKey: "T8FLPsFfvUtRLmlaa",
    },
  },
  app: {
    baseURL: "/",
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;500;600;700;800&display=swap",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "50x50",
          href: "/company-logo.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/company-logo.png",
        },
      ],
    },
  },
});