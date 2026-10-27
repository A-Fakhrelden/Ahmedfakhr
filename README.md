# Ahmed Fakhrelden | Data Portfolio

A fast, responsive, single-page portfolio for a data analyst and machine learning practitioner. Built with plain HTML, CSS and JavaScript: no frameworks, no build step.

## Features

- **Full-screen hero** with an animated bar-chart mark and staggered entrance
- **About section** with a circular profile photo and a career timeline
- **Services cards** summarizing what I offer
- **Filterable projects grid** (Dashboards, Python & EDA, Machine Learning) with a detail popup for each project
- **Certifications and experience galleries** with click-to-enlarge images
- **Contact section** with a copy-email button and a contact form (Formspree)
- **Motion layer:** scroll progress bar, scroll reveals, hover lifts and button shine
- **Accessible and responsive:** keyboard-friendly dialogs, mobile menu, and `prefers-reduced-motion` support
- **Warm beige palette** defined in one stylesheet, easy to change

## Project structure

```
.
├── index.html
├── css/main.css        # compiled / plain CSS used by the site
├── scss/main.scss      # SCSS source (same rules as main.css)
├── js/main.js          # menu, filters, modals, reveals, form handling
├── images/             # project screenshots, certificates, profile photo
├── LICENSE
└── README.md
```

## Run locally

No installation needed. Open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Customize

**Projects.** Each project is an `<article class="work">` in `index.html`. Edit its `data-cat` (`dash`, `py` or `ml`), `data-link`, image, title, tags and the hidden description (`<p class="full" hidden>`).

**Certifications and experience.** Add or edit `<figure>` items inside the `#certifications` and `#experience` galleries.

**Colors.** Change these values in `css/main.css` (and `scss/main.scss`):

| Role | Value |
| --- | --- |
| Primary (buttons, links) | `#9a6b3f` |
| Primary dark (hover) | `#7d5430` |
| Accent gold | `#d4a95a` |
| Page background | `#faf6ef` |

**Profile photo.** Replace `images/ahmed.jpeg` (a roughly square photo with the face centered works best).

**Contact form.** The form uses [Formspree](https://formspree.io). Create a form there, then replace `YOUR_FORM_ID` in `index.html`:

```html
<form ... action="https://formspree.io/f/YOUR_FORM_ID">
```

Until you do, the form shows a "not connected yet" message.

## Deploy on GitHub Pages

1. Push the project to a GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
4. Your site will be published at `https://<your-username>.github.io/<repository-name>/`.

Image file names are case-sensitive on GitHub Pages, so make sure the names in `index.html` match the files in `images/` exactly.

## Tech

HTML5, CSS3 (custom layout, animations), vanilla JavaScript, and Google Fonts (Bricolage Grotesque and Public Sans).

## Contact

- LinkedIn: [ahmedfakhrelden](https://www.linkedin.com/in/ahmedfakhrelden/)
- GitHub: [A-Fakhrelden](https://github.com/A-Fakhrelden)
- Email: eng.ahmed.fakhrelden@gmail.com

## License

The source code is released under the [MIT License](LICENSE). The images, certificates, project screenshots and personal text are **not** covered by that license and may not be reused without permission.
