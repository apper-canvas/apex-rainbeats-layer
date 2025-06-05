import { motion } from 'framer-motion'
      import ApperIcon from '@/components/ApperIcon'
      import Card from '@/components/atoms/Card'
      import Text from '@/components/atoms/Text'
      import Title from '@/components/atoms/Title'

      const MoodCard = ({ mood, songsCount, onClick, isSelected, index }) => {
        return (
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(mood)}
            className={`h-48 group ${isSelected ? 'ring-2 ring-accent' : ''}`}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} opacity-80`} />
            
            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
              <div className="flex items-start justify-between">
                <div>
                  <Title as="h4" className="text-xl font-semibold mb-2">{mood.name}</Title>
                  <Text className="text-sm opacity-90">{mood.description}</Text>
                </div>
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"
                >
                  <ApperIcon name={mood.icon} className="h-6 w-6" />
                </motion.div>
              </div>
              
              <div className="flex items-center justify-between">
                <Text className="text-sm">
                  {songsCount} songs
                </Text>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <ApperIcon name="Play" className="h-8 w-8" />
                </motion.div>
              </div>
            </div>
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </Card>
        )
      }

      export default MoodCard