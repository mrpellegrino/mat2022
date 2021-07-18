import React, { useMemo } from 'react';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

import Alert from 'Components/Atoms/Alert';
import NavLink from 'Components/Atoms/NavLink';
import HelpLink from 'Components/Atoms/HelpLink';
import Card from 'Components/Molecules/Card';
import Button from 'Components/Molecules/Button';
import IStepProps from 'Types/IStepProps';
import IEnrollment from 'Types/IEnrollment';

interface IStudent {
  name: string;
  finished: boolean;
}
interface IProps extends IStepProps {
  enrollments: IEnrollment[];
}

const StudentsStep: React.FC<IProps> = ({ enrollments, setStep }) => {
  const students = useMemo<IStudent[]>(
    () =>
      enrollments.map(enrollment => ({
        finished: false,
        name: enrollment.student_name,
      })),
    [enrollments],
  );
  const reviewd = useMemo(
    () =>
      students.reduce((result, student) => result && student.finished, true),
    [students],
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

  return (
    <Card>
      <Alert status={alertStatus}>{alertText}</Alert>

      <List spacing={3}>
        {students.map((student, i) => (
          <ListItem key={i} display="flex" alignItems="center">
            <ListIcon
              as={student.finished ? FiCheckCircle : FiAlertCircle}
              boxSize="20px"
              color={`${student.finished ? 'green' : 'gray'}.500`}
            />
            <NavLink to="/student">{student.name}</NavLink>
          </ListItem>
        ))}
      </List>

      {reviewd && (
        <Button type="button" isPrimary onClick={() => setStep(0)}>
          Voltar ao início
        </Button>
      )}

      <HelpLink />
    </Card>
  );
};

export default StudentsStep;
