import { cp, mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const output = join(root, 'public')

await rm(output, { recursive: true, force: true })
await mkdir(join(output, 'core'), { recursive: true })
await mkdir(join(output, 'sounds'), { recursive: true })
await mkdir(join(output, 'images'), { recursive: true })

await Promise.all([
  cp(join(root, 'web/index.html'), join(output, 'index.html')),
  cp(join(root, 'web/styles.css'), join(output, 'styles.css')),
  cp(join(root, 'web/app.js'), join(output, 'app.js')),
  cp(join(root, 'core/oracle.js'), join(output, 'core/oracle.js')),
  cp(join(root, 'assets/genevaw.r/sounds/mystical-reveal.mp3'), join(output, 'sounds/mystical-reveal.mp3')),
  cp(join(root, 'assets/genevaw.r/images/app-icon.png'), join(output, 'images/app-icon.png')),
])
