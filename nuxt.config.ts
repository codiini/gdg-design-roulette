// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app:{
    head:{
      title: 'GDG CodeJam Design Roulette.'
    }
  },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  devServer: {
    host: "0.0.0.0",
  },

  supabase: {
    redirect: false,
  },
});
