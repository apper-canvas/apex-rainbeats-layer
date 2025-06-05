import RainIntensitySlider from '@/components/molecules/RainIntensitySlider'
      import RainPresetButton from '@/components/molecules/RainPresetButton'
      import Title from '@/components/atoms/Title'

      const RainControlSidebar = ({ 
        rainIntensity, 
        onRainIntensityChange, 
        rainPresets, 
        selectedRainPreset, 
        onRainPresetSelect 
      }) => {
        return (
          <div className="w-80 glass-morphism border-l border-white/10 p-6 space-y-6 hidden xl:block">
            <div className="text-center">
              <Title as="h3" className="font-semibold mb-4">Rain Atmosphere</Title>
              
              <RainIntensitySlider 
                intensity={rainIntensity} 
                onChange={onRainIntensityChange} 
              />

              {/* Rain Presets */}
              <div className="space-y-3">
                {rainPresets?.map((preset) => (
                  <RainPresetButton
                    key={preset.id}
                    preset={preset}
                    isSelected={selectedRainPreset?.id === preset.id}
                    onClick={onRainPresetSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      }

      export default RainControlSidebar