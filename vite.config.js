import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const BASE = '/flox-web/'

// Páginas independientes dentro de public/ (por ejemplo public/demo-portafolio/index.html).
// GitHub Pages abre /flox-web/demo-portafolio/ solo; Vite (dev y preview) no, y mostraría la web
// de React. Este plugin hace lo mismo que Pages: carpeta → su index.html.
function publicFolderIndex() {
  const middleware = (dir) => (req, res, next) => {
    const [path, query = ''] = req.url.split('?')
    if (!path.startsWith(BASE) || path === BASE) return next()
    const folder = join(dir, decodeURIComponent(path.slice(BASE.length)))
    if (!existsSync(join(folder, 'index.html')) || !statSync(folder).isDirectory()) return next()
    // Sin barra final, se redirige con barra (como Pages) para que los enlaces relativos funcionen
    if (!path.endsWith('/')) {
      res.statusCode = 301
      res.setHeader('Location', `${path}/${query ? `?${query}` : ''}`)
      return res.end()
    }
    req.url = `${path}index.html${query ? `?${query}` : ''}`
    next()
  }
  return {
    name: 'public-folder-index',
    configureServer(server) {
      server.middlewares.use(middleware(server.config.publicDir))
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(server.config.build.outDir))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: BASE,
  plugins: [react(), publicFolderIndex()],
})
