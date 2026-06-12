import { motion } from 'framer-motion'
import { memorySections } from '../../data/memories'
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic'
import { HeroSectionView } from '../../components/memories/HeroSection'
import { StoryTimeline } from '../../components/memories/StoryTimeline'
import { PhotoSwipeGallery } from '../../components/memories/PhotoSwipeGallery'
import { FinaleSection } from '../../components/memories/FinaleSection'
import { MusicToggle } from '../../components/memories/MusicToggle'

export function MemoriesPhase() {
  const { muted, toggleMute } = useBackgroundMusic()

  return (
    <motion.div
      className="relative min-h-full w-full max-w-[100vw] overflow-x-hidden bg-[#1a0a12] touch-pan-y"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <MusicToggle muted={muted} onToggle={toggleMute} />

      {memorySections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroSectionView key={section.id} section={section} />
          case 'timeline':
            return <StoryTimeline key={section.id} section={section} />
          case 'gallery':
            return <PhotoSwipeGallery key={section.id} section={section} />
          case 'finale':
            return <FinaleSection key={section.id} section={section} />
          default:
            return null
        }
      })}
    </motion.div>
  )
}
