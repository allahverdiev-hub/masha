import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GallerySection } from '../../data/memories'

export function PhotoGallery({ section }: { section: GallerySection }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section className="py-20 safe-x">
      <motion.h2
        className="font-display mb-8 px-6 text-4xl font-bold gradient-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {section.title}
      </motion.h2>

      <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
        {section.photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            className="relative shrink-0 snap-center overflow-hidden rounded-2xl"
            style={{ width: '72vw', maxWidth: 280 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setLightbox(i)}
          >
            <img
              src={photo.src}
              alt={photo.caption ?? `Фото ${i + 1}`}
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
            />
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm text-white/90">{photo.caption}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={section.photos[lightbox].src}
              alt=""
              className="max-h-full max-w-full rounded-xl object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
