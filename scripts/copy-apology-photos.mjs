import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const outDir = path.resolve('public/assets/memories')

async function convert(src, dest) {
  await sharp(src)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest)
  console.log(`${src} -> ${dest}`)
}

await convert('C:\\Users\\PC\\Desktop\\1.jpg', path.join(outDir, 'apology-1.jpg'))
await convert('C:\\Users\\PC\\Desktop\\2.jpg', path.join(outDir, 'apology-2.jpg'))

const ambientSrc = 'C:\\Users\\PC\\Desktop\\ambient.mp3'
if (fs.existsSync(ambientSrc)) {
  fs.copyFileSync(ambientSrc, path.join(outDir, 'ambient.mp3'))
  console.log('ambient.mp3 copied')
}
