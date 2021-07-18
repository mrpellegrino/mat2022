import React, { useMemo, useState } from 'react';
import { Container } from '@chakra-ui/react';

import ResponsiblesStep from 'Components/Organisms/ResponsiblesStep';
import FinancialResponsibleStep from 'Components/Organisms/FinancialResponsibleStep';
import StudentsStep from 'Components/Organisms/StudentsStep';
import StudentStep from 'Components/Organisms/StudentStep';
import IEnrollment from 'Types/IEnrollment';

const Home: React.FC = () => {
  const [step, setStep] = useState(0);
  const [enrollments, setEnrollments] = useState<IEnrollment[]>([]);

  const steps = useMemo(
    () => [
      <ResponsiblesStep setStep={setStep} />,
      <FinancialResponsibleStep
        setEnrollments={setEnrollments}
        setStep={setStep}
      />,
      <StudentsStep enrollments={enrollments} setStep={setStep} />,
      <StudentStep setStep={setStep} />,
    ],
    [enrollments],
  );

  return (
    <Container w="100%" maxW="3xl" py="20px">
      {steps[step]}
    </Container>
  );
};

export default Home;
