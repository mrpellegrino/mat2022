import React, { useMemo, useState } from 'react';
import { Container } from '@chakra-ui/react';

import FinancialResponsibleStep from 'Components/Organisms/FinancialResponsibleStep';
import StudentsStep from 'Components/Organisms/StudentsStep';
import StudentStep from 'Components/Organisms/StudentStep';
import IEnrollment from 'Types/IEnrollment';

const Home: React.FC = () => {
  const [step, setStep] = useState(0);
  const [enrollments, setEnrollments] = useState<IEnrollment[]>([]);
  const [currentEnrollment, setCurrentEnrollment] =
    useState<IEnrollment | null>(null);

  const steps = useMemo(
    () => [
      <FinancialResponsibleStep
        setStep={setStep}
        setEnrollments={setEnrollments}
      />,
      <StudentsStep
        setStep={setStep}
        enrollments={enrollments}
        setCurrentEnrollment={setCurrentEnrollment}
      />,
      <StudentStep
        setStep={setStep}
        enrollments={enrollments}
        setEnrollments={setEnrollments}
        currentEnrollment={currentEnrollment}
      />,
    ],
    [enrollments, currentEnrollment],
  );

  return (
    <Container w="100%" maxW="3xl" py="20px">
      {steps[step]}
    </Container>
  );
};

export default Home;
