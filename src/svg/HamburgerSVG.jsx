const HamburgerSVG = (props) => {
  return (
    <svg
      viewBox='0 0 64 64'
      fill='currentColor'
      height='2em'
      width='2em'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeMiterlimit={10}
        strokeWidth={4}
        d='M12 21h40M12 33h40M12 45h40'
      />
    </svg>
  );
};

export default HamburgerSVG;
