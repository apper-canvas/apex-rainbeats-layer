import SidebarButton from '@/components/molecules/SidebarButton'

      const Sidebar = ({ onLibraryClick, onFavoritesClick, onPlaylistsClick, onSettingsClick }) => {
        return (
          <div className="w-64 glass-morphism border-r border-white/10 p-6 space-y-6 hidden lg:block">
            <div className="space-y-4">
              <SidebarButton iconName="Home" label="Home" isActive={true} />
              <SidebarButton iconName="Music" label="My Library" onClick={onLibraryClick} />
              <SidebarButton iconName="Heart" label="Favorites" onClick={onFavoritesClick} />
              <SidebarButton iconName="ListMusic" label="Playlists" onClick={onPlaylistsClick} />
              <SidebarButton iconName="Settings" label="Settings" onClick={onSettingsClick} />
            </div>
          </div>
        )
      }

      export default Sidebar