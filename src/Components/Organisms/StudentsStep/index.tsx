import React, { useMemo } from 'react';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

import Alert from 'Components/Atoms/Alert';
import NavLink from 'Components/Atoms/NavLink';
import HelpLink from 'Components/Atoms/HelpLink';
import Card from 'Components/Molecules/Card';
import Button from 'Components/Molecules/Button';

const StudentsStep: React.FC = () => {
  const students = useMemo(
    () => [
      {
        name: 'Maria Gonçalves da Cruz',
        finished: true,
      },
      {
        name: 'João Gonçalves da Cruz',
        finished: false,
      },
    ],
    [],
  );
  const reviewd = useMemo(
    () =>
      students.reduce((result, student) => result && student.finished, true),
    [students],
  );
  const alertText = useMemo(
    () =>
      reviewd
        ? 'Todos os alunos vinculados ao responsável foram matriculados com sucesso para o ano de 2022!'
        : 'Os alunos vinculados ao responsável foram identificados. Clique em cada um deles para revisar os dados.',
    [reviewd],
  );
  const alertStatus = useMemo(() => (reviewd ? 'success' : 'info'), [reviewd]);

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
        <Button type="button" isPrimary>
          Voltar ao início
        </Button>
      )}

      <HelpLink />
    </Card>
  );
};

export default StudentsStep;
