import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * Tre collezioni: le pagine, il menu, la spalla.
 *
 * Lo schema non e' decorativo: convalida in fase di build cio' che chi modifica
 * a mano potrebbe sbagliare. Un indirizzo senza barra iniziale, una lingua
 * scritta male, un blocco della spalla a cui manca il documento: la build si
 * ferma e dice dove, invece di pubblicare un sito rotto.
 */

const percorso = z.string().startsWith('/', { message: 'gli indirizzi iniziano con /' });

const pagine = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content' }),
  schema: z.object({
    titolo: z.string().min(1),
    /** Lingua del contenuto. "und" = neutra, servita uguale in italiano e sotto /en. */
    lingua: z.enum(['it', 'en', 'und']),
    /** Indirizzi a cui la pagina viene servita. Il primo e' quello principale. */
    indirizzi: z.array(percorso).min(1),
    /** Indirizzi storici che rinviano al principale (es. i vecchi /node/NNNN). */
    rinvii: z.array(percorso).default([]),
    /** Indirizzo della stessa pagina nell'altra lingua, se esiste. */
    traduzione: percorso.optional(),
  }),
});

const menu = defineCollection({
  loader: file('src/dati/menu.yaml'),
  schema: z.object({
    voci: z.array(
      z.object({
        titolo: z.string(),
        indirizzo: z.string(),
        /** Testo mostrato al passaggio del mouse. */
        suggerimento: z.string().optional(),
        /** false = la voce non viene mai evidenziata come pagina corrente. */
        evidenzia: z.boolean().default(true),
      })
    ),
  }),
});

const spalla = defineCollection({
  loader: file('src/dati/spalla.yaml'),
  schema: z.discriminatedUnion('tipo', [
    z.object({
      tipo: z.literal('logo'),
      immagine: z.string(),
      collegamento: z.string(),
      descrizione: z.string().default(''),
    }),
    z.object({
      tipo: z.literal('download'),
      testo: z.string(),
      copertina: z.string(),
      documento: z.string(),
      descrizione: z.string().default(''),
    }),
  ]),
});

export const collections = { pagine, menu, spalla };
