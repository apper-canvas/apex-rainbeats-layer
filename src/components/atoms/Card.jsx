import { motion } from 'framer-motion'

      const Card = ({ children, onClick, className = '', initial, animate, transition, whileHover, whileTap, ...props }) => {
        return (
          <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            whileHover={whileHover}
            whileTap={whileTap}
            onClick={onClick}
            className={`relative rounded-2xl cursor-pointer overflow-hidden ${className}`}
            {...props}
          >
            {children}
          </motion.div>
        )
      }

      export default Card