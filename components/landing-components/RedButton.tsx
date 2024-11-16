const RedButton = ({
    icon,
    children,
    onClick,
  }: {
    icon?: any;
    children?: any;
    onClick?: any;
  }) => {
    return (
      <div className="!bg-transparent css-g53se3">
        <button
          className="from-[rgba(199,242,132,1))] to-[rgba(0,190,240,1)] group bg-[#1e2830] p-2 text-white hover:bg-gradient-to-r border border-transparent hover:border disabled:cursor-not-allowed !h-full md:block w-auto rounded-xl bg-v2-lily/5 hover:border-v2-primary/50 hover:bg-[#2c3b40] hover:text-v2-primary"
          onClick={onClick}
        >
          <div className="rounded-xl bg-v3-text-gradient bg-clip-text text-transparent group-disabled:bg-none group-disabled:text-[#CFF3FF] group-disabled:text-opacity-25 py-1 px-3 text-sm font-semibold leading-none flex justify-center items-center gap-3">
            <span>{children}</span>
            {icon && (
              <img
                src={icon}
                alt="circle"
                className="size-10 object-contain z-10"
              />
            )}
          </div>
        </button>
      </div>
    );
  };
  
  export default RedButton;
  