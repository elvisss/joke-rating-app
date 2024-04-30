export type jokeType = 'general' | 'knock-knock' | 'programming'
export type jodeId = number

export interface Joke {
  id: jodeId
  type: jokeType
  setup: string
  punchline: string
}

export interface JokesResponse {
  jokes: Joke[]
}
