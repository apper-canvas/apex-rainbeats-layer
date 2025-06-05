import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import songService from '../services/api/songService'
import playlistService from '../services/api/playlistService'
import rainPresetService from '../services/api/rainPresetService'

const Home = () => {
  const [songs, setSongs] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [rainPresets, setRainPresets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [rainIntensity, setRainIntensity] = useState(0.3)
  const [selectedRainPreset, setSelectedRainPreset] = useState(null)
  const [currentPlaylist, setCurrentPlaylist] = useState(null)

  // Rain animation state
  const [rainDrops, setRainDrops] = useState([])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [songsData, playlistsData, presetsData] = await Promise.all([
          songService.getAll(),
          playlistService.getAll(),
          rainPresetService.getAll()
        ])
        setSongs(songsData || [])
        setPlaylists(playlistsData || [])
        setRainPresets(presetsData || [])
        
        // Set initial current song and playlist
        if (songsData?.length > 0) {
          setCurrentSong(songsData[0])
        }
        if (playlistsData?.length > 0) {
          setCurrentPlaylist(playlistsData[0])
        }
        if (presetsData?.length > 0) {
          setSelectedRainPreset(presetsData[1]) // Default to "Steady Rain"
        }
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load music data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Rain animation effect
  useEffect(() => {
    if (rainIntensity === 0) {
      setRainDrops([])
      return
    }

    const createRainDrop = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2
    })

    const interval = setInterval(() => {
      const dropCount = Math.floor(rainIntensity * 20)
      const newDrops = Array.from({ length: dropCount }, createRainDrop)
      
      setRainDrops(prev => {
        const current = prev.filter(drop => Date.now() - drop.created < 4000)
        return [...current, ...newDrops.map(drop => ({ ...drop, created: Date.now() }))]
      })
    }, 200)

    return () => clearInterval(interval)
  }, [rainIntensity])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    toast.success(isPlaying ? "Music paused" : "Music playing")
  }

  const handleNextSong = () => {
    if (!currentPlaylist?.songs?.length) return
    
    const currentIndex = currentPlaylist.songs.findIndex(song => song.id === currentSong?.id)
    const nextIndex = (currentIndex + 1) % currentPlaylist.songs.length
    setCurrentSong(currentPlaylist.songs[nextIndex])
    toast.success("Playing next song")
  }

  const handlePrevSong = () => {
    if (!currentPlaylist?.songs?.length) return
    
    const currentIndex = currentPlaylist.songs.findIndex(song => song.id === currentSong?.id)
    const prevIndex = currentIndex === 0 ? currentPlaylist.songs.length - 1 : currentIndex - 1
    setCurrentSong(currentPlaylist.songs[prevIndex])
    toast.success("Playing previous song")
  }

  const handleRainIntensityChange = (intensity) => {
    setRainIntensity(intensity)
    toast.success(`Rain intensity set to ${Math.round(intensity * 100)}%`)
  }

  const handleRainPresetSelect = (preset) => {
    setSelectedRainPreset(preset)
    setRainIntensity(preset.intensity)
    toast.success(`Rain preset: ${preset.name}`)
  }

  const handlePlaylistSelect = (playlist) => {
    setCurrentPlaylist(playlist)
    if (playlist.songs?.length > 0) {
      setCurrentSong(playlist.songs[0])
      setIsPlaying(true)
      toast.success(`Playing ${playlist.name}`)
    }
  }

  const comingSoonToast = (feature) => {
    toast.info(`${feature} coming soon!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mb-4 mx-auto"></div>
          <p className="text-gray-300 font-heading">Loading RainBeats...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="h-16 w-16 text-red-400 mb-4 mx-auto" />
          <p className="text-red-400 font-heading">Error: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Rain Animation */}
      <div className="rain-container">
        {rainDrops.map(drop => (
          <div
            key={drop.id}
            className="rain-drop"
            style={{
              left: `${drop.left}%`,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
              opacity: rainIntensity
            }}
          />
        ))}
      </div>

      {/* Lightning effect for thunderstorm */}
      {selectedRainPreset?.name === "Thunderstorm" && rainIntensity > 0.7 && (
        <div className="fixed inset-0 bg-white opacity-0 animate-pulse pointer-events-none z-10" 
             style={{ animationDuration: '3s' }} />
      )}

      {/* Navigation */}
      <nav className="relative z-20 glass-morphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="font-heading font-bold text-xl text-white">RainBeats</h1>
              <button
                onClick={() => comingSoonToast("Search")}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ApperIcon name="Search" className="h-5 w-5" />
                <span className="hidden md:inline">Search</span>
              </button>
            </div>
            <button
              onClick={() => comingSoonToast("Weather sync")}
              className="text-gray-300 hover:text-accent transition-colors"
            >
              <ApperIcon name="Cloud" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen relative z-10">
        {/* Left Sidebar */}
        <div className="w-64 glass-morphism border-r border-white/10 p-6 space-y-6 hidden lg:block">
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-3 text-accent font-medium">
              <ApperIcon name="Home" className="h-5 w-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => comingSoonToast("Your library")}
              className="w-full flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
            >
              <ApperIcon name="Music" className="h-5 w-5" />
              <span>My Library</span>
            </button>
            <button
              onClick={() => comingSoonToast("Favorites")}
              className="w-full flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
            >
              <ApperIcon name="Heart" className="h-5 w-5" />
              <span>Favorites</span>
            </button>
            <button
              onClick={() => comingSoonToast("Custom playlists")}
              className="w-full flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
            >
              <ApperIcon name="ListMusic" className="h-5 w-5" />
              <span>Playlists</span>
            </button>
            <button
              onClick={() => comingSoonToast("Settings")}
              className="w-full flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
            >
              <ApperIcon name="Settings" className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Center Content */}
          <div className="flex-1 p-4 md:p-8 pb-32">
            <MainFeature
              currentSong={currentSong}
              playlists={playlists}
              onPlaylistSelect={handlePlaylistSelect}
              onToggleFavorite={() => comingSoonToast("Favorites feature")}
            />
          </div>

          {/* Right Sidebar - Rain Controls */}
          <div className="w-80 glass-morphism border-l border-white/10 p-6 space-y-6 hidden xl:block">
            <div className="text-center">
              <h3 className="font-heading font-semibold text-white mb-4">Rain Atmosphere</h3>
              
              {/* Rain Intensity Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Intensity: {Math.round(rainIntensity * 100)}%
                </label>
                <div className="relative h-32 mx-auto w-8 glass-morphism rounded-full p-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={rainIntensity}
                    onChange={(e) => handleRainIntensityChange(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
                  />
                  <div 
                    className="absolute bottom-1 left-1 right-1 bg-accent rounded-full transition-all duration-300"
                    style={{ height: `${rainIntensity * 100}%` }}
                  />
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <ApperIcon name="CloudRain" className="h-4 w-4 text-accent" />
                  </div>
                </div>
              </div>

              {/* Rain Presets */}
              <div className="space-y-3">
                {rainPresets?.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleRainPresetSelect(preset)}
                    className={`w-full p-3 rounded-lg transition-all duration-200 ${
                      selectedRainPreset?.id === preset.id
                        ? 'bg-accent/20 border border-accent text-accent'
                        : 'glass-morphism hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{preset.name}</span>
                      <ApperIcon 
                        name={preset.name === "Thunderstorm" ? "Zap" : "CloudRain"} 
                        className="h-4 w-4" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Music Player */}
      <div className="fixed bottom-0 left-0 right-0 z-30 glass-morphism border-t border-white/10 h-20">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Current Song Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            {currentSong && (
              <>
                <img
                  src={currentSong.coverArt}
                  alt={currentSong.title}
                  className="w-12 h-12 rounded-lg object-cover animate-float"
                />
                <div className="min-w-0">
                  <p className="font-medium text-white truncate">{currentSong.title}</p>
                  <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
                </div>
              </>
            )}
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevSong}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <ApperIcon name="SkipBack" className="h-5 w-5" />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-3 bg-accent hover:bg-accent/80 rounded-full text-white transition-all duration-200 transform hover:scale-105"
            >
              <ApperIcon 
                name={isPlaying ? "Pause" : "Play"} 
                className="h-6 w-6" 
              />
            </button>
            <button
              onClick={handleNextSong}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <ApperIcon name="SkipForward" className="h-5 w-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center space-x-3 min-w-0 flex-1 justify-end">
            <ApperIcon name="Volume2" className="h-4 w-4 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 accent-accent"
            />
            <button
              onClick={() => comingSoonToast("Sleep timer")}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ApperIcon name="Timer" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home