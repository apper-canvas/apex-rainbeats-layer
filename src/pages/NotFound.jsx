import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-surface-800 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="mb-8"
        >
          <ApperIcon name="CloudRain" className="h-24 w-24 text-accent mx-auto mb-4" />
        </motion.div>
        
        <h1 className="font-heading text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-2">Page not found in the rain</p>
        <p className="text-gray-400 mb-8">This page seems to have washed away...</p>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 glass-morphism px-8 py-3 rounded-lg text-accent hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          <ApperIcon name="Home" className="h-5 w-5" />
          <span>Return to RainBeats</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound