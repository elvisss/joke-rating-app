import type { Joke, JokeType } from '@/types'

const baseURL = 'https://official-joke-api.appspot.com'

const getTenJokes = async (type: JokeType = 'all'): Promise<Joke[]> => {
  try {
    const response = await fetch(`${baseURL}/jokes${type === 'all' ? '' : `/${type}` }/ten`)
    const data = (await response.json()) as Joke[]
    return data
  } catch (e) {
    throw new Error('Error getting ten jokes')
  }
}

export const getJokes = async(type: JokeType, quantity: number): Promise<Joke[]> => {
  const promises = []
  for (let i = 0; i < Math.floor(quantity / 10); i++) {
    promises.push(getTenJokes(type))
  }

  try {
    const jokes = await Promise.all(promises)
    return jokes.flat()
  } catch (e) {
    throw new Error('Error getting jokes')
  }
}
