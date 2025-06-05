import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import PageLayout from '@/components/templates/PageLayout'
import NavigationBar from '@/components/organisms/NavigationBar'
import Sidebar from '@/components/organisms/Sidebar'
import HeroSection from '@/organisms/HeroSection'
import RainControlSidebar from '@/components/organisms/RainControlSidebar'
import MusicPlayerBar from '@/components/organisms/MusicPlayerBar'

import songService from '@/services/api/songService'
      import playlistService from '@/services/api/playlistService'
      import rainPresetService from '@/services/api/rainPresetService'

      const HomePage = () => {
        const [songs, setSongs] = useState([])
        const [playlists, setPlaylists] = useState([])
        const [rainPresets, setRainPresets] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [currentSong, setCurrentSong] = useState(null)
        const [isPlaying, setIsPlaying] = useState(false)
        const [currentTime, setCurrentTime] = useState(0) // Not used in UI but kept for future
        const [volume, setVolume] = useState(0.8)
        const [rainIntensity, setRainIntensity] = useState(0.3)
        const [selectedRainPreset, setSelectedRainPreset] = useState(null)
        const [currentPlaylist, setCurrentPlaylist] = useState(null)

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
          <PageLayout rainIntensity={rainIntensity} selectedRainPreset={selectedRainPreset}>
            <NavigationBar
              onSearchClick={() => comingSoonToast("Search")}
              onWeatherSyncClick={() => comingSoonToast("Weather sync")}
            />

            <div className="flex min-h-screen relative z-10">
              {/* Left Sidebar */}
              <Sidebar
                onLibraryClick={() => comingSoonToast("Your library")}
                onFavoritesClick={() => comingSoonToast("Favorites")}
                onPlaylistsClick={() => comingSoonToast("Custom playlists")}
                onSettingsClick={() => comingSoonToast("Settings")}
              />

              {/* Main Content */}
              <div className="flex-1 flex">
                {/* Center Content */}
                <div className="flex-1 p-4 md:p-8 pb-32">
                  <HeroSection
                    currentSong={currentSong}
                    playlists={playlists}
                    onPlaylistSelect={handlePlaylistSelect}
                    onToggleFavorite={() => comingSoonToast("Favorites feature")}
                  />
                </div>

                {/* Right Sidebar - Rain Controls */}
                <RainControlSidebar
                  rainIntensity={rainIntensity}
                  onRainIntensityChange={handleRainIntensityChange}
                  rainPresets={rainPresets}
                  selectedRainPreset={selectedRainPreset}
                  onRainPresetSelect={handleRainPresetSelect}
                />
              </div>
            </div>

            {/* Bottom Music Player */}
            <MusicPlayerBar
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNextSong={handleNextSong}
              onPrevSong={handlePrevSong}
              volume={volume}
              onVolumeChange={(e) => setVolume(parseFloat(e.target.value))}
              onTimerClick={() => comingSoonToast("Sleep timer")}
            />
          </PageLayout>
        )
      }

      export default HomePage