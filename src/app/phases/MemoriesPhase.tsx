import { motion } from 'framer-motion'
import { memorySections } from '../../data/memories'
import { HeroSectionView } from '../../components/memories/HeroSection'
import { StoryTimeline } from '../../components/memories/StoryTimeline'
import { PhotoGallery } from '../../components/memories/PhotoGallery'
import { QuotesSection } from '../../components/memories/QuotesSection'
import { FinaleSection } from '../../components/memories/FinaleSection'

export function MemoriesPhase() {
  return (
    <motion.div
      className="relative min-h-full bg-[#1a0a12]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {memorySections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroSectionView key={section.id} section={section} />
          case 'timeline':
            return <StoryTimeline key={section.id} section={section} />
          case 'gallery':
            return <PhotoGallery key={section.id} section={section} />
          case 'quote':
            return <QuotesSection key={section.id} section={section} />
          case 'finale':
            return <FinaleSection key={section.id} section={section} />
          default:
            return null
        }
      })}
    </motion.div>
  )
}
