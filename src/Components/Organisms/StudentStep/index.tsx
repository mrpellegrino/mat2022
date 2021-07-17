import React from 'react';

import Alert from 'Components/Atoms/Alert';
import HelpLink from 'Components/Atoms/HelpLink';
import Card from 'Components/Molecules/Card';

const StudentStep: React.FC = () => {
  return (
    <Card>
      <Alert mb="20px" status="info">
        Revise os dados para a elabaoração do contrato de 2022
      </Alert>

      <HelpLink />
    </Card>
  );
};

export default StudentStep;
