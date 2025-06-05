import { motion } from 'framer-motion'

      const Button = ({ children, onClick, className = '', whileHover, whileTap, ...props }) => {
        return (
          <motion.button
            onClick={onClick}
            className={`transition-colors duration-200 ${className}`}
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
          >
            {children}
          </motion.button>
        )
      }

      export default Button