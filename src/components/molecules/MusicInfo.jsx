import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import Title from '@/components/atoms/Title'

      const MusicInfo = ({ currentSong, onToggleLyrics }) => {
        if (!currentSong) return null;

        return (
          <div className="space-y-3">
            <Title as="h2" className="text-3xl md:text-4xl">
              {currentSong.title}
            </Title>
            <Text as="p" className="text-xl text-gray-300">{currentSong.artist}</Text>
            <Text as="p" className="text-gray-400">{currentSong.album}</Text>
            
            {/* Lyrics toggle */}
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleLyrics}
              className="mt-4 px-6 py-2 glass-morphism rounded-full text-accent hover:bg-accent hover:text-white"
            >
              <div className="flex items-center space-x-2">
                <ApperIcon name="FileText" className="h-4 w-4" />
                <span>View Lyrics</span>
              </div>
            </Button>
          </div>
        )
      }

      export default MusicInfo