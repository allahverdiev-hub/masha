import { memorySections } from '../../data/memories'
import { HeroSectionView } from '../../components/memories/HeroSection'
import { StoryTimeline } from '../../components/memories/StoryTimeline'
import { ParallaxGallery } from '../../components/memories/ParallaxGallery'
import { TextParallax } from '../../components/memories/TextParallax'
import { FinaleSection } from '../../components/memories/FinaleSection'

export function MemoriesPhase() {
  return (
    <div className="relative min-h-full w-full max-w-[100vw] overflow-x-hidden bg-[#1a0a12] touch-pan-y">
      {memorySections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroSectionView key={section.id} section={section} />
          case 'timeline':
            return <StoryTimeline key={section.id} section={section} />
          case 'parallax':
            return <ParallaxGallery key={section.id} section={section} />
          case 'textParallax':
            return <TextParallax key={section.id} section={section} />
          case 'finale':
            return <FinaleSection key={section.id} section={section} />
          default:
            return null
        }
      })}
    </div>
  )
}
