import PlayerControls from '@/components/molecules/PlayerControls'
      import SongInfoDisplay from '@/components/molecules/SongInfoDisplay'

      const MusicPlayerBar = ({ 
        currentSong, 
        isPlaying, 
        onPlayPause, 
        onNextSong, 
        onPrevSong, 
        volume, 
        onVolumeChange, 
        onTimerClick 
      }) => {
        return (
          <div className="fixed bottom-0 left-0 right-0 z-30 glass-morphism border-t border-white/10 h-20">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
              {/* Current Song Info */}
              <SongInfoDisplay currentSong={currentSong} />

              {/* Player Controls */}
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={onPlayPause}
                onNextSong={onNextSong}
                onPrevSong={onPrevSong}
                volume={volume}
                onVolumeChange={onVolumeChange}
                onTimerClick={onTimerClick}
              />
            </div>
          </div>
        )
      }

      export default MusicPlayerBar