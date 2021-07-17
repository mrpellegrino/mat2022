import React from 'react';

import Alert from 'Components/Atoms/Alert';
import HelpLink from 'Components/Atoms/HelpLink';
import Card from 'Components/Molecules/Card';
import StudentsList from '../StudentsList';

const StudentsStep: React.FC = () => {
  return (
    <Card>
      <Alert mb="20px" status="info">
        Os alunos vinculados ao responsável foram identificados. Clique em cada
        um deles para revisar os dados.
      </Alert>

      <StudentsList />

      <HelpLink />
    </Card>
  );
};

export default StudentsStep;
