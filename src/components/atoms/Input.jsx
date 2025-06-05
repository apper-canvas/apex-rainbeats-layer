const Input = ({ type, min, max, step, value, onChange, className = '', ...props }) => {
        return (
          <input
            type={type}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className={`transition-all duration-200 ${className}`}
            {...props}
          />
        )
      }

      export default Input