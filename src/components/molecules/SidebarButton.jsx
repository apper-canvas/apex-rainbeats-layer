import ApperIcon from '@/components/ApperIcon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const SidebarButton = ({ iconName, label, onClick, isActive }) => {
        return (
          <Button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 ${isActive ? 'text-accent font-medium' : 'text-gray-300 hover:text-white'}`}
          >
            <ApperIcon name={iconName} className="h-5 w-5" />
            <Text as="span">{label}</Text>
          </Button>
        )
      }

      export default SidebarButton