const PhotoSVG = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-photo'
      width={ props.height ? props.height : '24'}
      height={ props.width ? props.width : '24'}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
      <line x1='15' y1='8' x2='15.01' y2='8'></line>
      <rect x='4' y='4' width='16' height='16' rx='3'></rect>
      <path d='M4 15l4 -4a3 5 0 0 1 3 0l5 5'></path>
      <path d='M14 14l1 -1a3 5 0 0 1 3 0l2 2'></path>
    </svg>
  );
};

export default PhotoSVG;
