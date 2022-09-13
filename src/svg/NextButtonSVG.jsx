const NextButtonSVG = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-player-track-next'
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
      <path d='M3 5v14l8 -7z'></path>
      <path d='M14 5v14l8 -7z'></path>
    </svg>
  );
};

export default NextButtonSVG;
