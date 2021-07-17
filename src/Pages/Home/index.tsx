import React from 'react';
import { Container } from '@chakra-ui/react';

// import ResponsiblesStep from 'Components/Organisms/ResponsiblesStep';
// import FinancialResponsibleStep from 'Components/Organisms/FinancialResponsibleStep';
import StudentsStep from 'Components/Organisms/StudentsStep';

const Home: React.FC = () => {
  return (
    <Container maxW="lg">
      {/* <ResponsiblesStep /> */}
      {/* <FinancialResponsibleStep /> */}
      <StudentsStep />
    </Container>
  );
};

export default Home;
