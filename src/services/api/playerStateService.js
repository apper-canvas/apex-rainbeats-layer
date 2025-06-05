import playerStatesData from '../mockData/playerStates.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const playerStateService = {
  async getAll() {
    await delay(200)
    return [...playerStatesData]
  },

  async getById(id) {
    await delay(150)
    const state = playerStatesData.find(s => s.id === id)
    if (!state) throw new Error('Player state not found')
    return { ...state }
  },

  async create(state) {
    await delay(300)
    const newState = {
      ...state,
      id: Date.now().toString()
    }
    playerStatesData.push(newState)
    return { ...newState }
  },

  async update(id, data) {
    await delay(250)
    const index = playerStatesData.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Player state not found')
    
    playerStatesData[index] = { ...playerStatesData[index], ...data }
    return { ...playerStatesData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = playerStatesData.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Player state not found')
    
    playerStatesData.splice(index, 1)
    return { success: true }
  },

  async getCurrentState() {
    await delay(100)
    return playerStatesData[0] || null
  }
}

export default playerStateService