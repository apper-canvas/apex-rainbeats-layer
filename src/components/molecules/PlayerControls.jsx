import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Input from '@/components/atoms/Input'

      const PlayerControls = ({ 
        isPlaying, 
        onPlayPause, 
        onNextSong, 
        onPrevSong, 
        volume, 
        onVolumeChange, 
        onTimerClick 
      }) => {
        return (
          <div className="flex items-center space-x-4">
            <Button
              onClick={onPrevSong}
              className="p-2 text-gray-300 hover:text-white"
            >
              <ApperIcon name="SkipBack" className="h-5 w-5" />
            </Button>
            <Button
              onClick={onPlayPause}
              className="p-3 bg-accent hover:bg-accent/80 rounded-full text-white transform hover:scale-105"
            >
              <ApperIcon 
                name={isPlaying ? "Pause" : "Play"} 
                className="h-6 w-6" 
              />
            </Button>
            <Button
              onClick={onNextSong}
              className="p-2 text-gray-300 hover:text-white"
            >
              <ApperIcon name="SkipForward" className="h-5 w-5" />
            </Button>

            {/* Volume Control */}
            <div className="hidden md:flex items-center space-x-3 min-w-0 flex-1 justify-end">
              <ApperIcon name="Volume2" className="h-4 w-4 text-gray-400" />
              <Input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={onVolumeChange}
                className="w-20 accent-accent"
              />
              <Button
                onClick={onTimerClick}
                className="p-2 text-gray-400 hover:text-white"
              >
                <ApperIcon name="Timer" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      }

      export default PlayerControls