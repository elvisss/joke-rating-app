import type { JOKE_TYPES } from './constants'

export type JokeType = keyof typeof JOKE_TYPES
export type JokeId = number

export interface Joke {
  id: JokeId
  type: JokeType
  setup: string
  punchline: string
}
