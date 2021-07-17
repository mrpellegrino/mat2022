import React from 'react';
import { Container } from '@chakra-ui/react';

// import ResponsiblesStep from 'Components/Organisms/ResponsiblesStep';
// import FinancialResponsibleStep from 'Components/Organisms/FinancialResponsibleStep';
// import StudentsStep from 'Components/Organisms/StudentsStep';
import StudentStep from 'Components/Organisms/StudentStep';

const Home: React.FC = () => {
  return (
    <Container w="100%" maxW="3xl">
      {/* <ResponsiblesStep />
      <FinancialResponsibleStep />
      <StudentsStep /> */}
      <StudentStep />
    </Container>
  );
};

export default Home;
