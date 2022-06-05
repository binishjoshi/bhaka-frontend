import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
  position: sticky;
  top: 0;
  background-color: #555;
`;

const Logo = styled.div``;

const Options = styled.div`
  display: flex;
  width: 20%;
`;

const Option = styled(Link)`
  margin-right: 10%;
  text-decoration: none;
  color: inherit;
`;

const Header = () => {
  return (
    <Bar>
      <Logo>Bhaka</Logo>
      <Options>
        <Option to='/'>Home</Option>
        <Option to='/sign-in'>Sign Up</Option>
        <Option to='/sign-up'>Sign In</Option>
      </Options>
    </Bar>
  );
};

export default Header;
