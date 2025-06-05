import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const RainPresetButton = ({ preset, isSelected, onClick }) => {
        return (
          <Button
            onClick={() => onClick(preset)}
            className={`w-full p-3 rounded-lg ${
              isSelected
                ? 'bg-accent/20 border border-accent text-accent'
                : 'glass-morphism hover:bg-white/5 text-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Text as="span" className="font-medium">{preset.name}</Text>
              <ApperIcon 
                name={preset.name === "Thunderstorm" ? "Zap" : "CloudRain"} 
                className="h-4 w-4" 
              />
            </div>
          </Button>
        )
      }

      export default RainPresetButton