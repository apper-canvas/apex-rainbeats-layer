import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import AlbumArt from '@/components/molecules/AlbumArt'
import MusicInfo from '@/components/molecules/MusicInfo'
import MoodPlaylistGrid from '@/components/organisms/MoodPlaylistGrid'
import Title from '@/components/atoms/Title'
import Button from '@/components/atoms/Button'

const HeroSection = ({ currentSong, playlists, onPlaylistSelect, onToggleFavorite }) => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [showLyrics, setShowLyrics] = useState(false)
  const [albumColors, setAlbumColors] = useState(['#4A5D7A', '#E91E63'])

  // Extract colors from album art (simplified simulation)
  useEffect(() => {
    if (currentSong?.coverArt) {
      // Simulate color extraction with mood-based colors
      const moodColors = {
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
              <AlbumArt 
                currentSong={currentSong}
                onToggleFavorite={onToggleFavorite}
                onShareSong={handleShareSong}
                onDownload={handleDownload}
              />

              <MusicInfo 
                currentSong={currentSong}
                onToggleLyrics={toggleLyrics}
              />
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
      <MoodPlaylistGrid 
        playlists={playlists}
        onMoodSelect={handleMoodSelect}
        selectedMood={selectedMood}
      />

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
              <Button
                onClick={() => setShowLyrics(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
              >
                <ApperIcon name="X" className="h-6 w-6" />
              </Button>
              
              <ApperIcon name="Music" className="h-16 w-16 text-accent mx-auto mb-6" />
              <Title as="h3" className="text-2xl font-bold mb-4">
                Lyrics Sync Coming Soon
              </Title>
              <p className="text-gray-300 mb-6">
                We're working on bringing you synchronized lyrics that dance with the rain. 
                This feature will be available in our next update!
              </p>
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLyrics(false)}
                className="px-8 py-3 bg-accent hover:bg-accent/80 rounded-lg text-white font-medium"
              >
                Got it
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroSection