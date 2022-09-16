const ListSVG = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-list'
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
      <line x1='9' y1='6' x2='20' y2='6'></line>
      <line x1='9' y1='12' x2='20' y2='12'></line>
      <line x1='9' y1='18' x2='20' y2='18'></line>
      <line x1='5' y1='6' x2='5' y2='6.01'></line>
      <line x1='5' y1='12' x2='5' y2='12.01'></line>
      <line x1='5' y1='18' x2='5' y2='18.01'></line>
    </svg>
  );
};

export default ListSVG;
