const Label = ({ children, className = '', htmlFor, ...props }) => {
        return (
          <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`} {...props}>
            {children}
          </label>
        )
      }

      export default Label