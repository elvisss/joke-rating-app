export type JokeType = 'general' | 'knock-knock' | 'programming' | 'all'
export type JokeId = number

export interface Joke {
  id: JokeId
  type: JokeType
  setup: string
  punchline: string
}
