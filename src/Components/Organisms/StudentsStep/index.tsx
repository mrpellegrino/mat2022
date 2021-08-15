import React, { useCallback, useMemo } from 'react';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

import Alert from 'Components/Atoms/Alert';
import Card from 'Components/Molecules/Card';
import Button from 'Components/Molecules/Button';
import IStepProps from 'Types/IStepProps';
import IEnrollment from 'Types/IEnrollment';
import ISetState from 'Types/ISetState';

interface IProps extends IStepProps {
  enrollments: IEnrollment[];
  setCurrentEnrollment: ISetState<IEnrollment | null>;
}

const StudentsStep: React.FC<IProps> = ({
  setStep,
  enrollments,
  setCurrentEnrollment,
}) => {
  const reviewd = useMemo(
    () =>
      enrollments.reduce(
        (result, enrollment) => result && enrollment.reviewd,
        true,
      ),
    [enrollments],
  );
  const alertText = useMemo(() => {
    if (enrollments.length === 0) {
      return 'Não há alunos vinculados a este responsável.';
    }
    if (reviewd) {
      return 'Todos os alunos vinculados ao responsável foram matriculados com sucesso para o ano de 2022!';
    }
    return 'Os alunos vinculados ao responsável foram identificados. Clique em cada um deles para revisar os dados.';
  }, [enrollments, reviewd]);
  const alertStatus = useMemo(() => {
    if (enrollments.length === 0) return 'info';
    if (reviewd) return 'success';
    return 'info';
  }, [enrollments, reviewd]);

  const handleSelectEnrollment = useCallback(
    (enrollment: IEnrollment) => {
      if (enrollment.reviewd) return;
      setCurrentEnrollment(enrollment);
      setStep(2);
    },
    [setCurrentEnrollment, setStep],
  );

  return (
    <Card>
      <Alert status={alertStatus}>{alertText}</Alert>

      <List spacing={3}>
        {enrollments.map((enrollment, i) => (
          <ListItem key={i} display="flex" alignItems="center">
            <ListIcon
              as={enrollment.reviewd ? FiCheckCircle : FiAlertCircle}
              boxSize="20px"
              color={`${enrollment.reviewd ? 'green' : 'gray'}.500`}
            />
            <Button
              type="button"
              onClick={() => handleSelectEnrollment(enrollment)}
              isGhost
              textColor="black"
              fontWeight="normal"
            >
              {enrollment.student_name}
            </Button>
          </ListItem>
        ))}
      </List>

      {reviewd && (
        <Button type="button" isPrimary onClick={() => setStep(0)}>
          Voltar ao início
        </Button>
      )}
    </Card>
  );
};

export default StudentsStep;
