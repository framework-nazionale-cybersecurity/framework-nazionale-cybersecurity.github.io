// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * L'URL del sito cambia secondo l'ambiente, la build no.
 *
 *   locale      → http://localhost:4321   (default)
 *   anteprima   → l'URL fornito da chi ospita l'anteprima privata
 *   produzione  → https://www.cybersecurityframework.it
 *
 * Si imposta con la variabile SITE_URL, cosi' lo stesso identico artefatto
 * puo' essere promosso da un ambiente all'altro senza ricompilare a mano.
 */
const SITO = process.env.SITE_URL ?? 'http://localhost:4321';
const IN_PRODUZIONE = SITO.includes('cybersecurityframework.it');

export default defineConfig({
  site: SITO,

  // 'directory' produce /framework2/index.html: l'URL storico /framework2
  // continua a rispondere (con un rinvio alla forma con slash finale) su
  // qualunque hosting statico, senza dipendere da come il server tratta
  // le estensioni. Verificato in fase 5 contro docs/mappa-url.md.
  build: { format: 'directory' },
  trailingSlash: 'ignore',

  // Rispecchia l'assetto attuale di Drupal: italiano senza prefisso,
  // inglese sotto /en. E' cio' che rende preservabili i 48 URL storici.
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      // Le pagine di rinvio non vanno in sitemap: servono a non rompere i
      // link esistenti, non a essere indicizzate. Sono i vecchi /node/NNNN
      // piu' /edizione2025, che rinvia alla home come fa Drupal oggi.
      filter: (pagina) => !/\/node\/\d+/.test(pagina) && !/\/edizione2025\/?$/.test(pagina),
      i18n: { defaultLocale: 'it', locales: { it: 'it-IT', en: 'en-GB' } },
    }),
  ],

  // Finche' non siamo in produzione la build resta indicizzabile solo
  // localmente: l'anteprima privata aggiunge comunque il proprio noindex.
  vite: {
    define: {
      __IN_PRODUZIONE__: JSON.stringify(IN_PRODUZIONE),
    },
  },
});
