export interface Principle {
  emoji: string
  rule: string
  note: string
}

export const principles: Principle[] = [
  { emoji: '🎯', rule: 'Clarity over cleverness.', note: 'Smart code that no one can read is not smart code.' },
  { emoji: '📝', rule: "Write notes so future me doesn't suffer.", note: 'Documentation is a love letter to your future self.' },
  { emoji: '🌱', rule: 'Prefer simple systems that can grow.', note: "You don't need to solve next year's problem today." },
  { emoji: '❓', rule: 'Good questions are part of good engineering.', note: 'The right question saves more time than the fastest code.' },
  { emoji: '🔄', rule: "Iterate; don't over-plan.", note: 'Ship something. Learn from it. Adjust. Repeat.' },
  { emoji: '🤝', rule: 'Code is communication.', note: "You're writing for humans first, machines second." },
]
