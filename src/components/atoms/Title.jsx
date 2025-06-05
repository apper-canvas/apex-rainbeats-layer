const Title = ({ children, as = 'h2', className = '', ...props }) => {
        const Component = as;
        return (
          <Component className={`font-heading font-bold text-white ${className}`} {...props}>
            {children}
          </Component>
        )
      }

      export default Title