import React from 'react';

import NavLink from 'Components/Atoms/NavLink';

const HelpLink: React.FC = () => {
  return (
    <NavLink mt="20px" to="/help">
      Preciso de ajuda!
    </NavLink>
  );
};

export default HelpLink;
