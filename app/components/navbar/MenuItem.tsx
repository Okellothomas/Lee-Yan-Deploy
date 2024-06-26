'use client'

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
  return (
    <div onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-00 transition font-normal hover:underline"    
      >
      {label}    
    </div>
  )
}

export default MenuItem