# spiritual-media

Publicador de Spiritual Practices 777, copiado de `hermes-media` (Hermes Tarot). Esta carpeta va a ser la raíz del repo **público** `matiasosuna/spiritual-media`. Tiene que ser público porque Instagram baja los videos desde el release.

- `calendario.json`: qué sale y cuándo, 2 reels por día. Si un ítem tiene `practica`, al salir en IG la desbloquea en el journal.
- `publicar.mjs`: publica en IG (Graph), YouTube (API) y TikTok (Buffer). Sale uno por plataforma por corrida.
- `publicados.json`: prácticas desbloqueadas. El journal de la web lo lee desde raw.githubusercontent.
- `.github/workflows/publicar.yml`: cadena cada ~15 min en GitHub Actions.
- Videos: release `videos` del repo, con `<id>.mp4` y opcional `tiktok-<id>.mp4`.
- Secretos del repo:
  - `SP_PAGE_TOKEN`
  - `SP_IG_USER_ID`
  - `SP_YT_CLIENT_ID`
  - `SP_YT_CLIENT_SECRET`
  - `SP_YT_REFRESH_TOKEN`
  - `SP_BUFFER_API_KEY`

  Todos están en `web/.env`.
- Buffer: cuenta propia (osuna.devs), org `6ae3c1bfc3aa910dff512c69`. Falta `BUFFER_TIKTOK` en `publicar.mjs` hasta conectar el TikTok.
- Tests: `node --test publicar.test.mjs`.
