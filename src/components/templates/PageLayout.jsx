const PageLayout = ({ children, rainIntensity, selectedRainPreset }) => {
        const createRainDrop = () => ({
          id: Math.random(),
          left: Math.random() * 100,
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 2
        })

        const [rainDrops, setRainDrops] = React.useState([])

        React.useEffect(() => {
          if (rainIntensity === 0) {
            setRainDrops([])
            return
          }

          const interval = setInterval(() => {
            const dropCount = Math.floor(rainIntensity * 20)
            const newDrops = Array.from({ length: dropCount }, createRainDrop)
            
            setRainDrops(prev => {
              const current = prev.filter(drop => Date.now() - drop.created < 4000)
              return [...current, ...newDrops.map(drop => ({ ...drop, created: Date.now() }))]
            })
          }, 200)

          return () => clearInterval(interval)
        }, [rainIntensity])

        return (
          <div className="min-h-screen relative overflow-hidden">
            {/* Rain Animation */}
            <div className="rain-container">
              {rainDrops.map(drop => (
                <div
                  key={drop.id}
                  className="rain-drop"
                  style={{
                    left: `${drop.left}%`,
                    animationDuration: `${drop.duration}s`,
                    animationDelay: `${drop.delay}s`,
                    opacity: rainIntensity
                  }}
                />
              ))}
            </div>

            {/* Lightning effect for thunderstorm */}
            {selectedRainPreset?.name === "Thunderstorm" && rainIntensity > 0.7 && (
              <div className="fixed inset-0 bg-white opacity-0 animate-pulse pointer-events-none z-10" 
                  style={{ animationDuration: '3s' }} />
            )}

            {children}
          </div>
        )
      }

      export default PageLayout