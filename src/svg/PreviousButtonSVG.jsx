const PreviousButtonSVG = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-player-track-prev'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <path d='M21 5v14l-8 -7z'></path>
      <path d='M10 5v14l-8 -7z'></path>
    </svg>
  );
};

export default PreviousButtonSVG;
