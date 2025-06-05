import ApperIcon from '@/components/ApperIcon'
      import Input from '@/components/atoms/Input'
      import Label from '@/components/atoms/Label'

      const RainIntensitySlider = ({ intensity, onChange }) => {
        return (
          <div className="mb-6">
            <Label className="block text-gray-300 mb-3">
              Intensity: {Math.round(intensity * 100)}%
            </Label>
            <div className="relative h-32 mx-auto w-8 glass-morphism rounded-full p-1">
              <Input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={intensity}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
              />
              <div 
                className="absolute bottom-1 left-1 right-1 bg-accent rounded-full transition-all duration-300"
                style={{ height: `${intensity * 100}%` }}
              />
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <ApperIcon name="CloudRain" className="h-4 w-4 text-accent" />
              </div>
            </div>
          </div>
        )
      }

      export default RainIntensitySlider