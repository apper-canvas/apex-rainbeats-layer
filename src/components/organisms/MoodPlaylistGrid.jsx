import { motion } from 'framer-motion'
      import MoodCard from '@/components/molecules/MoodCard'
      import Title from '@/components/atoms/Title'

      const MoodPlaylistGrid = ({ playlists, onMoodSelect, selectedMood }) => {
        const moodCategories = [
          {
            name: 'Passionate',
            gradient: 'from-red-500 to-pink-500',
            icon: 'Heart',
            description: 'Intense romantic moments'
          },
          {
            name: 'Dreamy',
            gradient: 'from-purple-500 to-blue-500',
            icon: 'Cloud',
            description: 'Floating on cloud nine'
          },
          {
            name: 'Nostalgic',
            gradient: 'from-yellow-600 to-orange-500',
            icon: 'Clock',
            description: 'Sweet memories together'
          },
          {
            name: 'Tender',
            gradient: 'from-pink-400 to-pink-300',
            icon: 'Flower',
            description: 'Gentle loving moments'
          },
          {
            name: 'Melancholic',
            gradient: 'from-slate-500 to-slate-400',
            icon: 'CloudRain',
            description: 'Beautiful sadness'
          },
          {
            name: 'Euphoric',
            gradient: 'from-rainbow-start to-rainbow-end',
            icon: 'Sparkles',
            description: 'Pure joy and celebration'
          }
        ]

        return (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Title as="h3" className="text-2xl font-semibold text-center">
              Choose Your Romantic Mood
            </Title>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {moodCategories.map((mood, index) => (
                <MoodCard
                  key={mood.name}
                  mood={mood}
                  songsCount={playlists?.find(p => p.mood === mood.name)?.songs?.length || 0}
                  onClick={onMoodSelect}
                  isSelected={selectedMood?.name === mood.name}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )
      }

      export default MoodPlaylistGrid