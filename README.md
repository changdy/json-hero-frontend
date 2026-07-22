# JSON Hero Frontend

`json-hero-frontend` is the standalone React/Vite frontend used by the Avalonia
version of StrToolkit. It contains no server-side code and does not persist data.
The API is implemented by `../avalonia_str` and stores documents in process memory.

## Development

Requirements: Node.js 18+ and .NET 8 SDK.

Start the C# API in one terminal:

```powershell
dotnet run --project ..\avalonia_str\src\StrToolkit -- --jsonhero-server
```

Then start Vite in another terminal:

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`. Vite proxies `/api` to
`http://127.0.0.1:13001`. Set `JSON_HERO_API_URL` before starting Vite if the
C# server selected a different port.

## Production assets

```powershell
npm ci
npm run build
```

The build is written to `dist/`. When that directory exists, the Avalonia
project copies it to its output as `jsonhero-frontend/`; the embedded Kestrel
server then serves the SPA and API from the same loopback origin.

An optional `VITE_API_BASE_URL` can be supplied at build time when the frontend
is hosted separately. Leave it unset for the normal StrToolkit packaging flow.

## Releases

Pushing `main` runs the production build in GitHub Actions. The workflow reads
the version from `package.json` and creates `v<version>` when that GitHub Release
does not already exist. Bump the package version before publishing a new release.

Each release contains:

- `json-hero-frontend-v<version>.tar.gz`
- `json-hero-frontend-v<version>.zip`
- `SHA256SUMS`

Both archives contain a top-level `jsonhero-frontend/` directory. Extract that
directory beside the StrToolkit executable; the embedded Kestrel server will
serve its `index.html` and assets.

## API contract

- `POST /api/create/file`
- `POST /api/create/url`
- `GET /api/create`
- `GET /api/docs/:id`
- `GET /api/docs/:id/raw`
- `POST /api/docs/:id/update`
- `DELETE /api/docs/:id`
- `GET /api/preview/:url`
- `POST /api/public/create`

Documents disappear when StrToolkit exits. No database or files are used.
