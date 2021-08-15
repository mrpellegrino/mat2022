import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';

import Alert from 'Components/Atoms/Alert';
import ButtonGroup from 'Components/Atoms/ButtonGroup';
import Card from 'Components/Molecules/Card';
import Form from 'Components/Molecules/Form';
import Input from 'Components/Molecules/Input';
import Button from 'Components/Molecules/Button';
import IStepProps from 'Types/IStepProps';
import IFindContracts from 'Types/IFindContracts';
import findEnrollmentsSchema from 'Schemas/findEnrollmentsSchema';
import api from 'Services/api';
import { useErrors } from 'Hooks/errors';
import ISetState from 'Types/ISetState';
import IEnrollment from 'Types/IEnrollment';

interface IProps extends IStepProps {
  setEnrollments: ISetState<IEnrollment[]>;
}

const FinancialResponsibleStep: React.FC<IProps> = ({
  setStep,
  setEnrollments,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const { handleErrors } = useErrors();

  const handleSubmit = useCallback(
    async (data: IFindContracts) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        await findEnrollmentsSchema.validate(data, {
          abortEarly: false,
        });
        const response = await api.get('/reenrollments/responsible', {
          params: data,
        });
        setEnrollments(response.data);
        setStep(1);
      } catch (err) {
        handleErrors('Erro ao tentar encontrar matrículas', err, formRef);
      } finally {
        setLoading(false);
      }
    },
    [setStep, handleErrors, setEnrollments],
  );

  return (
    <Card>
      <Alert status="info">
        Para a elaboração do contrato de 2022, digite os dados do responsável
        financeiro.
      </Alert>

      <Form ref={formRef} onSubmit={handleSubmit} spacing="10px">
        <Input type="text" name="financial_cpf" label="CPF" />
        <Input
          type="date"
          name="financial_birth_date"
          label="Data de nascimento"
        />
        <ButtonGroup>
          <Button type="submit" isPrimary isLoading={loading}>
            Confirmar
          </Button>
        </ButtonGroup>
      </Form>
    </Card>
  );
};

export default FinancialResponsibleStep;
