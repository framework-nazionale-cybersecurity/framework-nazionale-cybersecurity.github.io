import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * I contenuti stanno in content/, fuori da src/, perche' sono il prodotto
 * dell'estrazione da Drupal (fase 1) e restano indipendenti dal generatore:
 * se un giorno Astro non convincesse piu', il Markdown si porta altrove.
 *
 * Lo schema non e' decorativo. Convalida in fase di build cio' che la
 * migrazione non puo' permettersi di sbagliare: la lingua, e soprattutto
 * url_originali, cioe' gli URL storici che devono continuare a rispondere.
 */
const pagine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: z.object({
    nid: z.number(),
    titolo: z.string().min(1),
    lingua: z.enum(['it', 'en', 'und']),
    tipo: z.string(),
    // YAML interpreta 2025-04-11 come data, non come stringa: si tipizzano
    // quindi come date vere, che e' anche piu' corretto per ordinarle.
    creato: z.coerce.date(),
    modificato: z.coerce.date(),
    formato_originale: z.string(),
    traduzione_di: z.number().optional(),
    url_originali: z.array(z.string().startsWith('/')).min(1),
  }),
});

export const collections = { pagine };
