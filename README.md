# Framework Nazionale per la Cybersecurity e la Data Protection — sito

Sito statico di **www.cybersecurityframework.it**, generato con [Astro](https://astro.build)
e pubblicato su GitHub Pages.

Una collaborazione tra il Centro di ricerca CIS — Sapienza Università di Roma
e il Laboratorio Nazionale di Cybersecurity del CINI, con il supporto
dell'Agenzia per la Cybersicurezza Nazionale.

## Come è fatto

    content/_reso.json    il contenuto delle pagine (corpo, menu, spalla), per URL
    content/{it,en,und}/  metadati di ciascuna pagina: titolo, lingua, URL storici
    src/                  schema dei contenuti, impaginazione, rotta unica
    public/               PDF, fogli di calcolo del Core, loghi, fogli di stile

Il contenuto delle pagine è conservato come **HTML**, non come Markdown. È una
scelta deliberata: proviene dal sito precedente e ne riproduce fedelmente
l'aspetto, comprese le dimensioni e gli allineamenti delle immagini, che il
Markdown non sa esprimere.

Una sola rotta, `src/pages/[...percorso].astro`, genera tutti gli indirizzi a
partire dai dati. Gli indirizzi storici restano validi: quelli con un nome
parlante servono la pagina, gli altri rinviano ad essa. Nessun collegamento
esistente deve rompersi, per questo gli URL non sono scritti a mano.

## Sviluppo

    npm install
    npm run dev          # sviluppo, con ricarica automatica
    npm run anteprima    # build reale servita in locale, anche da altri
                         # dispositivi sulla stessa rete
    npm run build        # solo build, in dist/

Richiede Node 22 o superiore.

## Pubblicazione

La messa online **non avviene a ogni commit**: si avvia a mano dalla scheda
Actions, con il workflow *Pubblica su GitHub Pages*, scegliendo l'ambiente
(`prova` o `produzione`) e digitando `PUBBLICA` per conferma. È voluto:
pubblicare deve restare un gesto deliberato.

A ogni push gira invece *Verifica*, che compila il sito e controlla che ogni
pagina attesa sia stata generata, senza pubblicare nulla.

## Contatti

[info@cybersecurityframework.it](mailto:info@cybersecurityframework.it)
