import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = ({ currentSong, playlists, onPlaylistSelect, onToggleFavorite }) => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [showLyrics, setShowLyrics] = useState(false)
  const [albumColors, setAlbumColors] = useState(['#4A5D7A', '#E91E63'])

  // Extract colors from album art (simplified simulation)
  useEffect(() => {
    if (currentSong?.coverArt) {
      // Simulate color extraction with mood-based colors
      const moodColors = {
        'Passionate': ['#E91E63', '#FF1744'],
        'Dreamy': ['#9C27B0', '#3F51B5'],
        'Nostalgic': ['#FF9800', '#FFB74D'],
        'Tender': ['#F06292', '#F8BBD9'],
        'Melancholic': ['#607D8B', '#90A4AE'],
        'Euphoric': ['#FF5722', '#FF9800']
      }
      const mood = currentSong.mood?.[0] || 'Dreamy'
      setAlbumColors(moodColors[mood] || ['#4A5D7A', '#E91E63'])
    }
  }, [currentSong])

  const moodCategories = [
    {
      name: 'Passionate',
      gradient: 'from-red-500 to-pink-500',
      icon: 'Heart',
      description: 'Intense romantic moments'
    },
    {
      name: 'Dreamy',
      gradient: 'from-purple-500 to-blue-500',
      icon: 'Cloud',
      description: 'Floating on cloud nine'
    },
    {
      name: 'Nostalgic',
      gradient: 'from-yellow-600 to-orange-500',
      icon: 'Clock',
      description: 'Sweet memories together'
    },
    {
      name: 'Tender',
      gradient: 'from-pink-400 to-pink-300',
      icon: 'Flower',
      description: 'Gentle loving moments'
    },
    {
      name: 'Melancholic',
      gradient: 'from-slate-500 to-slate-400',
      icon: 'CloudRain',
      description: 'Beautiful sadness'
    },
    {
      name: 'Euphoric',
      gradient: 'from-rainbow-start to-rainbow-end',
      icon: 'Sparkles',
      description: 'Pure joy and celebration'
    }
  ]

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    const moodPlaylist = playlists?.find(p => p.mood === mood.name)
    if (moodPlaylist) {
      onPlaylistSelect(moodPlaylist)
      toast.success(`Playing ${mood.name} vibes`)
    } else {
      toast.info(`${mood.name} playlist coming soon!`)
    }
  }

  const handleShareSong = () => {
    toast.info("Sharing features launching soon!")
  }

  const handleDownload = () => {
    toast.info("Offline mode coming soon!")
  }

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics)
    if (!showLyrics) {
      toast.info("Lyrics sync coming in next update")
    }
  }

  return (
    <div className="space-y-8">
      {/* Now Playing Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        {/* Ambient background glow */}
        <div 
          className="absolute inset-0 blur-3xl opacity-20 rounded-full"
          style={{
            background: `radial-gradient(circle, ${albumColors[0]}, ${albumColors[1]})`
          }}
        />
        
        <div className="relative z-10">
          {currentSong ? (
            <motion.div
              key={currentSong.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Album Art */}
              <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96">
                <motion.img
                  src={currentSong.coverArt}
                  alt={currentSong.title}
                  className="w-full h-full object-cover rounded-2xl shadow-glass animate-float"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Reflection effect */}
                <div 
                  className="absolute -bottom-40 left-0 right-0 h-40 bg-gradient-to-b from-white/10 to-transparent rounded-2xl blur-sm opacity-30"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
                  }}
                />

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onToggleFavorite}
                    className="p-3 glass-morphism rounded-full text-gray-300 hover:text-secondary transition-colors"
                  >
                    <ApperIcon name="Heart" className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShareSong}
                    className="p-3 glass-morphism rounded-full text-gray-300 hover:text-accent transition-colors"
                  >
                    <ApperIcon name="Share2" className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDownload}
                    className="p-3 glass-morphism rounded-full text-gray-300 hover:text-green-400 transition-colors"
                  >
                    <ApperIcon name="Download" className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Song Info */}
              <div className="space-y-3">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                  {currentSong.title}
                </h2>
                <p className="text-xl text-gray-300">{currentSong.artist}</p>
                <p className="text-gray-400">{currentSong.album}</p>
                
                {/* Lyrics toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleLyrics}
                  className="mt-4 px-6 py-2 glass-morphism rounded-full text-accent hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="FileText" className="h-4 w-4" />
                    <span>View Lyrics</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="w-96 h-96 mx-auto bg-gray-700 rounded-2xl animate-pulse" />
              <div className="space-y-3">
                <div className="h-8 bg-gray-700 rounded mx-auto w-64 animate-pulse" />
                <div className="h-6 bg-gray-700 rounded mx-auto w-48 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mood Playlist Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <h3 className="font-heading text-2xl font-semibold text-white text-center">
          Choose Your Romantic Mood
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {moodCategories.map((mood, index) => (
            <motion.div
              key={mood.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMoodSelect(mood)}
              className={`relative h-48 rounded-2xl cursor-pointer overflow-hidden group ${
                selectedMood?.name === mood.name ? 'ring-2 ring-accent' : ''
              }`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} opacity-80`} />
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading text-xl font-semibold mb-2">{mood.name}</h4>
                    <p className="text-sm opacity-90">{mood.description}</p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"
                  >
                    <ApperIcon name={mood.icon} className="h-6 w-6" />
                  </motion.div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    {playlists?.find(p => p.mood === mood.name)?.songs?.length || 0} songs
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ApperIcon name="Play" className="h-8 w-8" />
                  </motion.div>
                </div>
              </div>
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lyrics Modal */}
      <AnimatePresence>
        {showLyrics && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLyrics(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full glass-morphism rounded-2xl p-8 text-center"
            >
              <button
                onClick={() => setShowLyrics(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <ApperIcon name="X" className="h-6 w-6" />
              </button>
              
              <ApperIcon name="Music" className="h-16 w-16 text-accent mx-auto mb-6" />
              <h3 className="font-heading text-2xl font-bold text-white mb-4">
                Lyrics Sync Coming Soon
              </h3>
              <p className="text-gray-300 mb-6">
                We're working on bringing you synchronized lyrics that dance with the rain. 
                This feature will be available in our next update!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLyrics(false)}
                className="px-8 py-3 bg-accent hover:bg-accent/80 rounded-lg text-white font-medium transition-all duration-200"
              >
                Got it
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature