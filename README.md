# Anjali — Professional Portfolio

## Included
- `public/index.html` — portfolio page
- `public/style.css` — responsive styling
- `public/script.js` — mobile menu and contact form
- `public/assets/profile.png` — your uploaded portrait
- `models/Contact.js` — MongoDB contact schema
- `server.js` — Express server and contact API
- `.env.example` — environment configuration template

## Run on Windows PowerShell
1. Extract the ZIP file.
2. Open PowerShell in the extracted `portfolio-app` folder.
3. Install packages:
   ```powershell
   npm install
   ```
4. Create your `.env` file from the example:
   ```powershell
   Copy-Item .env.example .env
   ```
5. If you have MongoDB installed or a MongoDB Atlas connection, set `MONGODB_URI` in `.env`.
6. Start the website:
   ```powershell
   npm start
   ```
7. Open `http://localhost:5000` in your browser.

The website can start without MongoDB, but the contact form cannot save messages until a valid MongoDB connection is configured.

## Personalize it
- Change `Anjali L S` in `public/index.html` if you want a different display name.
- Update the About section, skills, and project cards with your real details.
- Replace the portrait by replacing `public/assets/profile.png` with another image using the same filename.
- Do not share your `.env` file or commit it to a public repository.
