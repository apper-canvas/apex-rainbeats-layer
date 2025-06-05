import playlistsData from '../mockData/playlists.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const playlistService = {
  async getAll() {
    await delay(350)
    return [...playlistsData]
  },

  async getById(id) {
    await delay(200)
    const playlist = playlistsData.find(p => p.id === id)
    if (!playlist) throw new Error('Playlist not found')
    return { ...playlist }
  },

  async create(playlist) {
    await delay(450)
    const newPlaylist = {
      ...playlist,
      id: Date.now().toString(),
      isCustom: true
    }
    playlistsData.push(newPlaylist)
    return { ...newPlaylist }
  },

  async update(id, data) {
    await delay(400)
    const index = playlistsData.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Playlist not found')
    
    playlistsData[index] = { ...playlistsData[index], ...data }
    return { ...playlistsData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = playlistsData.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Playlist not found')
    
    playlistsData.splice(index, 1)
    return { success: true }
  },

  async getByMood(mood) {
    await delay(250)
    return playlistsData.filter(playlist => playlist.mood === mood)
  }
}

export default playlistService