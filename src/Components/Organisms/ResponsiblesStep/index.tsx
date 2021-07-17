import React from 'react';

import Alert from 'Components/Atoms/Alert';
import HelpLink from 'Components/Atoms/HelpLink';
import ButtonGroup from 'Components/Atoms/ButtonGroup';
import Card from 'Components/Molecules/Card';
import Button from 'Components/Molecules/Button';

const ResponsiblesStep: React.FC = () => {
  return (
    <Card>
      <Alert status="warning">
        Atenção: os responsáveis financeiro e solidário do contrato de 2021
        serão os mesmos para 2022?
      </Alert>

      <ButtonGroup>
        <Button type="button">Não</Button>
        <Button type="button" isPrimary>
          Sim
        </Button>
      </ButtonGroup>

      <HelpLink />
    </Card>
  );
};

export default ResponsiblesStep;
