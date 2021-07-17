import React, { useMemo } from 'react';
import {
  FiActivity,
  FiBriefcase,
  FiClipboard,
  FiDollarSign,
  FiFlag,
  FiHeart,
  FiInfo,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSmartphone,
  FiSmile,
  FiUser,
  FiUsers,
} from 'react-icons/fi';

import Alert from 'Components/Atoms/Alert';
import Subtitle from 'Components/Atoms/Subtitle';
import HelpLink from 'Components/Atoms/HelpLink';
import FormGroup from 'Components/Atoms/FormGroup';
import InputGroup from 'Components/Atoms/InputGroup';
import Form from 'Components/Molecules/Form';
import Card from 'Components/Molecules/Card';
import Input from 'Components/Molecules/Input';
import Select, { ISelectOption } from 'Components/Molecules/Select';
import Radio, { IRadioOption } from 'Components/Molecules/Radio';
import Button from 'Components/Molecules/Button';

const StudentStep: React.FC = () => {
  const educationLevelOptions = useMemo<ISelectOption[]>(
    () => [
      {
        text: 'Fundamental incompleto',
        value: 'elementary_incompleted',
      },
      {
        text: 'Fundamental completo',
        value: 'elementary_completed',
      },
      {
        text: 'Segundo grau incompleto',
        value: 'highschool_incompleted',
      },
      {
        text: 'Segundo grau completo',
        value: 'highschool_completed',
      },
      {
        text: 'Superior incompleto',
        value: 'university_incompleted',
      },
      {
        text: 'Superior completo',
        value: 'university_completed',
      },
    ],
    [],
  );
  const incomeTaxOptions = useMemo<IRadioOption[]>(
    () => [
      {
        text: 'Sim',
        value: 'true',
      },
      {
        text: 'Não',
        value: 'false',
      },
    ],
    [],
  );

  return (
    <Card>
      <Alert mb="20px" status="info">
        Revise os dados para a elabaoração do contrato de 2022
      </Alert>

      <Form
        onSubmit={data => {
          console.log(data);
        }}
        spacing="20px"
      >
        <FormGroup>
          <Subtitle>Dados do responsável financeiro</Subtitle>
          <InputGroup>
            <Input
              icon={FiUser}
              type="text"
              name="financial_name"
              label="Nome"
            />
            <Input
              icon={FiUsers}
              type="text"
              name="financial_kinship"
              label="Parentesco com o aluno"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiClipboard}
              type="text"
              name="financial_rg"
              label="RG"
            />
            <Input
              icon={FiClipboard}
              type="text"
              name="financial_cpf"
              label="CPF"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiFlag}
              type="text"
              name="financial_nacionality"
              label="Nacionalidade"
            />
            <Input
              icon={FiHeart}
              type="text"
              name="financial_civil_state"
              label="Estado civil"
            />
          </InputGroup>
          <InputGroup>
            <Select
              icon={FiInfo}
              name="financial_education_level"
              label="Grau de instrução"
              placeholder="Selecionar"
              options={educationLevelOptions}
            />
            <Input
              icon={FiBriefcase}
              type="text"
              name="financial_profission"
              label="Profissão"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiBriefcase}
              type="text"
              name="financial_workplace"
              label="Local de trabalho"
            />
            <Input
              icon={FiPhone}
              type="text"
              name="financial_commercial_phone"
              label="Telefone comercial"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiPhone}
              type="text"
              name="financial_residencial_phone"
              label="Telefone residencial"
            />
            <Input
              icon={FiSmartphone}
              type="text"
              name="financial_personal_phone"
              label="Telefone pessoal"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_cep"
              label="CEP"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_street"
              label="Rua"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="number"
              name="financial_address_number"
              label="Número"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_complement"
              label="Complemento"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_neighborhood"
              label="Bairro"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_city"
              label="Cidade"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMail}
              type="email"
              name="financial_email"
              label="E-mail"
            />
            <Input
              icon={FiDollarSign}
              type="number"
              name="financial_monthly_income"
              label="Renda mensal"
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="date"
              name="financial_birth_date"
              label="Data de nascimento"
            />
          </InputGroup>
          <InputGroup>
            <Radio
              name="financial_income_tax"
              label="Declara imposto de renda?"
              options={incomeTaxOptions}
            />
          </InputGroup>
          <Button w="100%" type="submit" isPrimary>
            Enviar
          </Button>
        </FormGroup>

        <FormGroup>
          <Subtitle>Dados do responsável solidário</Subtitle>
        </FormGroup>

        <FormGroup>
          <Subtitle>Dados do estudante</Subtitle>
        </FormGroup>
      </Form>

      <HelpLink />
    </Card>
  );
};

export default StudentStep;
