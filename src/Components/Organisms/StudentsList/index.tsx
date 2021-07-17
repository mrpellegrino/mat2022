import React from 'react';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

import NavLink from 'Components/Atoms/NavLink';

const StudentsList: React.FC = () => {
  return (
    <List spacing={3}>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={FiCheckCircle} boxSize="20px" color="green.500" />
        <NavLink to="/student">Maria Gonçalves da Cruz</NavLink>
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={FiAlertCircle} boxSize="20px" color="gray.500" />
        <NavLink to="/student">João Gonçalves da Cruz</NavLink>
      </ListItem>
    </List>
  );
};

export default StudentsList;
