'use client';

interface ContainerProps{
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
  return (
      <div className="max-w-[2520px] 2xl:px-36 xl:px-36 md:px-16 sm:px-2 px-4 max-auto">
          {children}
      </div>
  )
}

export default Container