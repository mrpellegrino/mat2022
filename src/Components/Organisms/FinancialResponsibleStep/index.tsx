import React from 'react';

import Alert from 'Components/Atoms/Alert';
import HelpLink from 'Components/Atoms/HelpLink';
import ButtonGroup from 'Components/Atoms/ButtonGroup';
import Card from 'Components/Molecules/Card';
import Form from 'Components/Molecules/Form';
import Input from 'Components/Molecules/Input';
import Button from 'Components/Molecules/Button';

const FinancialResponsibleStep: React.FC = () => {
  return (
    <Card>
      <Alert status="info">
        Para a elaboração do contrato de 2022, digite os dados do responsável
        financeiro.
      </Alert>

      <Form onSubmit={() => {}} spacing="10px">
        <Input type="text" name="cpf" label="CPF" />
        <Input type="date" name="birthdate" label="Data de nascimento" />
        <ButtonGroup>
          <Button type="button">Voltar</Button>
          <Button type="button" isPrimary>
            Confirmar
          </Button>
        </ButtonGroup>
      </Form>

      <HelpLink />
    </Card>
  );
};

export default FinancialResponsibleStep;
