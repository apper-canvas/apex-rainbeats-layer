import rainPresetsData from '../mockData/rainPresets.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const rainPresetService = {
  async getAll() {
    await delay(250)
    return [...rainPresetsData]
  },

  async getById(id) {
    await delay(200)
    const preset = rainPresetsData.find(p => p.id === id)
    if (!preset) throw new Error('Rain preset not found')
    return { ...preset }
  },

  async create(preset) {
    await delay(300)
    const newPreset = {
      ...preset,
      id: Date.now().toString()
    }
    rainPresetsData.push(newPreset)
    return { ...newPreset }
  },

  async update(id, data) {
    await delay(350)
    const index = rainPresetsData.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Rain preset not found')
    
    rainPresetsData[index] = { ...rainPresetsData[index], ...data }
    return { ...rainPresetsData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = rainPresetsData.findIndex(p => p.id === id)
    if (index === -1) throw new Error('Rain preset not found')
    
    rainPresetsData.splice(index, 1)
    return { success: true }
  }
}

export default rainPresetService