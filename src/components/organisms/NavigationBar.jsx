import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      import Title from '@/components/atoms/Title'

      const NavigationBar = ({ onSearchClick, onWeatherSyncClick }) => {
        return (
          <nav className="relative z-20 glass-morphism border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-8">
                  <Title as="h1" className="text-xl">RainBeats</Title>
                  <Button
                    onClick={onSearchClick}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  >
                    <ApperIcon name="Search" className="h-5 w-5" />
                    <Text as="span" className="hidden md:inline">Search</Text>
                  </Button>
                </div>
                <Button
                  onClick={onWeatherSyncClick}
                  className="text-gray-300 hover:text-accent"
                >
                  <ApperIcon name="Cloud" className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </nav>
        )
      }

      export default NavigationBar