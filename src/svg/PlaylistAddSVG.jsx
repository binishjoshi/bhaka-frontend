const PlaylistAddSVG = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-playlist-add'
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
      <path d='M19 8h-14'></path>
      <path d='M5 12h9'></path>
      <path d='M11 16h-6'></path>
      <path d='M15 16h6'></path>
      <path d='M18 13v6'></path>
    </svg>
  );
};

export default PlaylistAddSVG;
