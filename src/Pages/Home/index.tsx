import React from 'react';
import { Container } from '@chakra-ui/react';

import ResponsiblesStep from 'Components/Organisms/ResponsiblesStep';

const Home: React.FC = () => {
  return (
    <Container maxW="lg">
      <ResponsiblesStep />
    </Container>
  );
};

export default Home;
