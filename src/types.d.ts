export type JokeId = number

export enum JokeType {
  All = 'all',
  General = 'general',
  KnockKnock = 'knock-knock',
  Programming = 'programming',
}

export interface Joke {
  id: JokeId
  type: JokeType
  setup: string
  punchline: string
}
