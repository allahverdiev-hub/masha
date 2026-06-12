import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import convert from 'heic-convert'

const sourceDir = 'C:\\Users\\PC\\Desktop\\Новая папка'
const outDir = path.resolve('public/assets/memories')

fs.mkdirSync(outDir, { recursive: true })

async function toJpegBuffer(input) {
  const ext = path.extname(input).toLowerCase()
  if (ext === '.heic') {
    const inputBuffer = fs.readFileSync(input)
    return convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.82,
    })
  }
  return sharp(input).rotate().jpeg({ quality: 82, mozjpeg: true }).toBuffer()
}

const files = fs
  .readdirSync(sourceDir)
  .filter((f) => /\.(jpe?g|heic)$/i.test(f))
  .sort((a, b) => {
    const num = (name) => parseInt(name.replace(/\D/g, ''), 10)
    return num(a) - num(b)
  })

for (const file of files) {
  const n = parseInt(file.replace(/\D/g, ''), 10)
  const outName = `${String(n).padStart(2, '0')}.jpg`
  const input = path.join(sourceDir, file)
  const output = path.join(outDir, outName)

  const buffer = await toJpegBuffer(input)
  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output)

  console.log(`${file} -> ${outName}`)
}

const heroSrc = path.join(outDir, '01.jpg')
const heroDst = path.join(outDir, 'hero.jpg')
await sharp(heroSrc)
  .resize({ width: 960, withoutEnlargement: true })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile(heroDst)
console.log('hero.jpg optimized from 01.jpg')

const profileDir = path.resolve('public/assets/profiles')
fs.mkdirSync(profileDir, { recursive: true })

const mashaCandidates = [
  'C:\\Users\\PC\\Desktop\\photo_2023-10-17_14-29-53.jpg',
  'C:\\Users\\PC\\Desktop\\photo_2026-06-07_11-47-55.jpg',
  path.join(outDir, '01.jpg'),
]

const mashaSrc = mashaCandidates.find((p) => fs.existsSync(p))
if (mashaSrc) {
  await sharp(mashaSrc)
    .rotate()
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(profileDir, 'masha.jpg'))
  console.log(`masha.jpg optimized from ${mashaSrc}`)
} else {
  console.warn('masha source not found — profile photo skipped')
}
