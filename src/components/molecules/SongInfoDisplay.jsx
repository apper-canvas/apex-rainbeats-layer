import Text from '@/components/atoms/Text'

      const SongInfoDisplay = ({ currentSong }) => {
        if (!currentSong) return null;

        return (
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <img
              src={currentSong.coverArt}
              alt={currentSong.title}
              className="w-12 h-12 rounded-lg object-cover animate-float"
            />
            <div className="min-w-0">
              <Text as="p" className="font-medium text-white truncate">{currentSong.title}</Text>
              <Text as="p" className="text-sm text-gray-400 truncate">{currentSong.artist}</Text>
            </div>
          </div>
        )
      }

      export default SongInfoDisplay