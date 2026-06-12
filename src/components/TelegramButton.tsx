import type { ReactNode } from 'react'
import { openTelegramChat } from '../data/siteConfig'

type TelegramButtonProps = {
  children: ReactNode
  className?: string
}

export function TelegramButton({ children, className }: TelegramButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        openTelegramChat()
      }}
      className={className}
    >
      {children}
    </button>
  )
}
