import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'

      const AlbumArt = ({ currentSong, onToggleFavorite, onShareSong, onDownload }) => {
        if (!currentSong) return null;

        return (
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
              <Button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleFavorite}
                className="p-3 glass-morphism rounded-full text-gray-300 hover:text-secondary"
              >
                <ApperIcon name="Heart" className="h-5 w-5" />
              </Button>
              
              <Button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onShareSong}
                className="p-3 glass-morphism rounded-full text-gray-300 hover:text-accent"
              >
                <ApperIcon name="Share2" className="h-5 w-5" />
              </Button>
              
              <Button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onDownload}
                className="p-3 glass-morphism rounded-full text-gray-300 hover:text-green-400"
              >
                <ApperIcon name="Download" className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )
      }

      export default AlbumArt