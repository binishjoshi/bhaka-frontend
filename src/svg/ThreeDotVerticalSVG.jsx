const ThreeDotVerticalSVG = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
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
      <circle cx='5' cy='12' r='1'></circle>
      <circle cx='12' cy='12' r='1'></circle>
      <circle cx='19' cy='12' r='1'></circle>
    </svg>
  );
};

export default ThreeDotVerticalSVG;
