import songsData from '../mockData/songs.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const songService = {
  async getAll() {
    await delay(300)
    return [...songsData]
  },

  async getById(id) {
    await delay(200)
    const song = songsData.find(s => s.id === id)
    if (!song) throw new Error('Song not found')
    return { ...song }
  },

  async create(song) {
    await delay(400)
    const newSong = {
      ...song,
      id: Date.now().toString()
    }
    songsData.push(newSong)
    return { ...newSong }
  },

  async update(id, data) {
    await delay(350)
    const index = songsData.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Song not found')
    
    songsData[index] = { ...songsData[index], ...data }
    return { ...songsData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = songsData.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Song not found')
    
    songsData.splice(index, 1)
    return { success: true }
  },

  async getByMood(mood) {
    await delay(300)
    return songsData.filter(song => song.mood?.includes(mood))
  }
}

export default songService