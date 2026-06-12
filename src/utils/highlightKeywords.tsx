const KEYWORDS = ['солнышко', 'манюнька']

export function highlightKeywords(text: string) {
  const parts = text.split(new RegExp(`(${KEYWORDS.join('|')})`, 'gi'))

  return parts.map((part, i) => {
    if (KEYWORDS.some((k) => k.toLowerCase() === part.toLowerCase())) {
      return (
        <span key={i} className="font-medium text-[#ff4d8d]">
          {part}
        </span>
      )
    }
    return part
  })
}
