import React from 'react';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

import Alert from 'Components/Atoms/Alert';
import NavLink from 'Components/Atoms/NavLink';
import HelpLink from 'Components/Atoms/HelpLink';
import Card from 'Components/Molecules/Card';

const StudentsStep: React.FC = () => {
  return (
    <Card>
      <Alert mb="20px" status="info">
        Os alunos vinculados ao responsável foram identificados. Clique em cada
        um deles para revisar os dados.
      </Alert>

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

      <HelpLink />
    </Card>
  );
};

export default StudentsStep;
