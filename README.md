# Framework Nazionale per la Cybersecurity e la Data Protection — sito

Sito statico di **www.cybersecurityframework.it**, generato con [Astro](https://astro.build)
e pubblicato su GitHub Pages.

Una collaborazione tra il Centro di ricerca CIS — Sapienza Università di Roma
e il Laboratorio Nazionale di Cybersecurity del CINI, con il supporto
dell'Agenzia per la Cybersicurezza Nazionale.

---

## Dove sta cosa

| Per cambiare… | si modifica… |
|---|---|
| il testo di una pagina | il suo file in `content/` |
| il menu in alto | `src/dati/menu.yaml` |
| i loghi e i download nella colonna di sinistra | `src/dati/spalla.yaml` |
| un PDF o un'immagine | il file in `public/` |
| l'aspetto del sito | `public/stili/sito.css`, `src/layouts/`, `src/componenti/` |

I contenuti non contengono nulla dell'aspetto, e l'aspetto non contiene nulla
dei contenuti: si può rifare la grafica senza toccare una pagina, e scrivere una
pagina senza sapere nulla di grafica.

---

## Modificare una pagina

Ogni pagina è un file in `content/`, diviso per lingua: `it/`, `en/`, `und/`.
Si apre con un editor di testo qualsiasi.

```markdown
---
titolo: "Controlli Essenziali di Cybersecurity"
lingua: und
indirizzi:
  - /csr2016
  - /en/csr2016
rinvii:
  - /node/5920
---

**[Scarica il Cybersecurity Report 2016](/sites/default/files/csr2016web.pdf)**

Testo del paragrafo. Una riga vuota separa un paragrafo dal successivo.
```

La parte fra i due `---` descrive la pagina; il resto è il testo, in Markdown.

### Il testo in Markdown

| Si scrive | Si ottiene |
|---|---|
| `**grassetto**` | **grassetto** |
| `*corsivo*` | *corsivo* |
| `[testo del collegamento](/pagina)` | un collegamento |
| `[scarica il PDF](/documenti/file.pdf)` | un collegamento a un file |
| `- voce` all'inizio di più righe | un elenco puntato |
| `1. voce` all'inizio di più righe | un elenco numerato |
| `## Titolo` | un titolo di sezione |
| `---` su una riga da solo | una linea di separazione |
| `\` a fine riga | un a capo senza nuovo paragrafo |

### La descrizione della pagina

| Campo | Significato |
|---|---|
| `titolo` | il titolo mostrato in cima e nella scheda del browser |
| `lingua` | `it`, `en`, oppure `und` per una pagina uguale nelle due lingue, servita sia in italiano sia sotto `/en` |
| `indirizzi` | dove la pagina si raggiunge; **il primo è il principale** |
| `rinvii` | (facoltativo) vecchi indirizzi che devono continuare a portare qui |
| `traduzione` | (facoltativo) l'indirizzo della stessa pagina nell'altra lingua: la bandierina punta lì |

---

## Aggiungere una pagina

1. Crea un file in `content/it/` (o `en/`, `und/`), per esempio `content/it/nuova-pagina.md`:

   ```markdown
   ---
   titolo: "Titolo della nuova pagina"
   lingua: it
   indirizzi:
     - /nuova-pagina
   ---

   Il testo della pagina.
   ```

2. Se deve comparire nel menu, aggiungi una voce in `src/dati/menu.yaml`.

Il nome del file è libero: l'indirizzo lo decide il campo `indirizzi`. Usa
lettere minuscole, numeri e trattini, senza spazi.

### Cambiare l'indirizzo di una pagina esistente

**Non cancellare il vecchio indirizzo: spostalo fra i `rinvii`.** Gli indirizzi
di questo sito sono citati in pubblicazioni e su altri siti: chi arriva dal
vecchio verrà portato al nuovo.

```yaml
indirizzi:
  - /nuovo-indirizzo
rinvii:
  - /vecchio-indirizzo
```

---

## Il menu

`src/dati/menu.yaml` contiene due liste, `it` ed `en`. Per aggiungere una voce
si copia un blocco e si cambiano titolo e indirizzo; l'ordine è quello della
lista. La voce della pagina corrente si evidenzia da sola.

```yaml
    - titolo: Nuova voce
      indirizzo: /nuova-pagina
```

## La colonna di sinistra

`src/dati/spalla.yaml` contiene i blocchi nell'ordine in cui compaiono. Per
aggiungere un documento da scaricare si copia un blocco `download`:

```yaml
framework-2026:
  tipo: download
  testo: "Scarica il Framework Nazionale ed. 2026:"
  copertina: /documenti/copertina-2026.png
  documento: /documenti/framework-2026.pdf
```

La riga che finisce con `:` è un nome a scelta, senza spazi, diverso per ogni blocco.

---

## PDF, fogli di calcolo, immagini

Si mettono in `public/`. Un file in `public/documenti/rapporto.pdf` si
raggiunge come `/documenti/rapporto.pdf`.

- **Per i file nuovi usa `public/documenti/`**, con nomi senza spazi.
- **Non spostare né rinominare i file in `public/sites/default/files/`.** Hanno
  gli indirizzi del sito precedente, e sono citati da pubblicazioni e siti
  esterni: spostarli romperebbe quei collegamenti.

---

## Immagini con dimensioni e video

Un'immagine semplice si scrive in Markdown: `![descrizione](/documenti/figura.png)`.
Quando servono dimensioni o allineamento, la pagina deve avere estensione
**`.mdx`** e si usa un componente:

```mdx
<Immagine src="/documenti/copertina.png" larghezza={150} altezza={212}
  allinea="destra" cornice collegamento="/documenti/framework.pdf" />
```

| Proprietà | Significato |
|---|---|
| `src` | il file dell'immagine (obbligatoria) |
| `alt` | descrizione per chi non vede l'immagine |
| `larghezza`, `altezza` | in pixel |
| `allinea="destra"` | il testo scorre a sinistra dell'immagine |
| `cornice` | bordo sottile |
| `collegamento` | dove porta il clic |
| `nuovaFinestra` | il collegamento si apre in una nuova scheda |

Un'immagine **allineata** si scrive all'inizio del paragrafo, sulla stessa riga
del testo che la circonda. Un'immagine **non allineata** va su una riga a sé.

Un video incorporato:

```mdx
<Video src="https://indirizzo-del-video" />
```

---

## Casi particolari

**Collegamenti che si aprono in una nuova finestra.** Il Markdown non sa farlo:
è l'unico caso in cui si scrive HTML.

```html
<a href="https://www.nist.gov/cyberframework" target="_blank">Cybersecurity Framework</a>
```

**`&nbsp;` su una riga da solo.** Riproduce lo spazio verticale che il sito
originale otteneva con paragrafi vuoti. Si può togliere liberamente.

**`&nbsp;` o `&#32;` dentro un grassetto o un collegamento.** Riproducono uno
spazio che nell'originale stava dentro l'elemento. Pochi casi in tutto,
conservate per fedeltà; si possono togliere.

---

## Vedere le modifiche prima di pubblicarle

Serve Node 22 o superiore. La prima volta:

```bash
npm install
```

Poi:

```bash
npm run dev
```

e si apre **http://localhost:4321**. Le modifiche ai file compaiono appena salvate.

`npm run anteprima` costruisce il sito definitivo e lo serve anche agli altri
dispositivi sulla stessa rete, per vederlo dal telefono.

---

## Pubblicare

1. Salva le modifiche nel repository (`git commit` e `git push`, oppure
   direttamente dall'interfaccia web di GitHub).
2. Parte da solo il controllo **Verifica**: compila il sito e controlla che
   ogni collegamento e ogni immagine interni portino a qualcosa che esiste.
   Se fallisce, la scheda *Actions* dice quale collegamento è rotto e in quale pagina.
3. A verifica superata: **Actions → Pubblica su GitHub Pages → Run workflow**,
   ambiente **`produzione`**, e scrivi `PUBBLICA` nella conferma.

La pubblicazione non avviene mai da sola: è un gesto voluto.

### Modificare dal browser

Per correzioni di testo non serve installare nulla: su GitHub si apre il file
in `content/`, si preme la matita, si modifica, si salva con *Commit changes*.
Poi si pubblica come sopra. Manca solo l'anteprima: se la modifica tocca
immagini o impaginazione, meglio provarla prima con `npm run dev`.

---

## Se la build si ferma

Il sito controlla i propri dati prima di pubblicare e si ferma con un messaggio
che dice dove guardare. I casi più comuni:

| Messaggio | Causa |
|---|---|
| `L'indirizzo /x è dichiarato due volte` | due pagine hanno lo stesso indirizzo: succede copiando una pagina per farne un'altra |
| `gli indirizzi iniziano con /` | in `indirizzi` o `rinvii` manca la barra iniziale |
| un errore su `lingua` | il valore non è `it`, `en` o `und` |
| un errore in `spalla.yaml` o `menu.yaml` | manca un campo obbligatorio, o l'indentazione non è allineata |

---

## Contatti

[info@cybersecurityframework.it](mailto:info@cybersecurityframework.it)
