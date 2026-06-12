import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import type { Profile } from '../data/profiles'

type ProfileCardProps = {
  profile: Profile
  glow?: boolean
  dragX?: MotionValue<number>
}

export function ProfileCard({ profile, glow = false, dragX }: ProfileCardProps) {
  const fallbackX = useMotionValue(0)
  const xVal = dragX ?? fallbackX
  const showLikeStamp = Boolean(profile.isHer && dragX)

  const likeOpacity = useTransform(xVal, (v) =>
    Math.min(Math.max(v / 80, 0), 1),
  )
  const nopeOpacity = useTransform(xVal, (v) =>
    Math.min(Math.max(-v / 80, 0), 1),
  )

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-3xl bg-[#2a1520] ${
        glow ? 'card-glow' : 'shadow-2xl shadow-black/40'
      }`}
    >
      {glow && (
        <div className="pointer-events-none absolute inset-0 z-30 rounded-3xl p-[3px]">
          <div className="shimmer-border h-full w-full rounded-[21px]" />
        </div>
      )}

      <div className="relative h-full w-full overflow-hidden rounded-3xl">
        <img
          src={profile.photo}
          alt={profile.name}
          className="h-full w-full object-cover"
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

        {!glow && dragX && (
          <>
            {showLikeStamp && (
              <motion.div
                className="absolute left-6 top-8 rotate-[-20deg] rounded-lg border-4 border-green-400 px-3 py-1 text-2xl font-extrabold uppercase tracking-wider text-green-400"
                style={{ opacity: likeOpacity }}
              >
                Like
              </motion.div>
            )}
            <motion.div
              className="absolute right-6 top-8 rotate-[20deg] rounded-lg border-4 border-red-400 px-3 py-1 text-2xl font-extrabold uppercase tracking-wider text-red-400"
              style={{ opacity: nopeOpacity }}
            >
              Nope
            </motion.div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
            <span className="mb-1 text-xl text-white/90">{profile.age}</span>
            {profile.isHer && (
              <span className="mb-1 ml-1 rounded-full bg-[#ff4d8d] px-2 py-0.5 text-xs font-semibold">
                ✨
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-white/70">{profile.city}</p>
          <p className="mt-2 line-clamp-2 text-sm text-white/85">{profile.bio}</p>
          {profile.footerCaption && (
            <p className="mt-5 text-center font-display text-2xl font-bold leading-snug gradient-text sm:text-3xl">
              {profile.footerCaption}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
