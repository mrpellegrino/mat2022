import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cepPromise from 'cep-promise';
import { FormHandles } from '@unform/core';
import { Checkbox, useToast } from '@chakra-ui/react';
import {
  FiActivity,
  FiBriefcase,
  FiCalendar,
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
import FormGroup from 'Components/Atoms/FormGroup';
import InputGroup from 'Components/Atoms/InputGroup';
import Form from 'Components/Molecules/Form';
import Card from 'Components/Molecules/Card';
import Input from 'Components/Molecules/Input';
import Button from 'Components/Molecules/Button';
import Select, { ISelectOption } from 'Components/Molecules/Select';
import Radio, { IRadioOption } from 'Components/Molecules/Radio';
import IStepProps from 'Types/IStepProps';
import IEnrollment from 'Types/IEnrollment';
import api from 'Services/api';
import { useErrors } from 'Hooks/errors';
import createEnrollmentSchema from 'Schemas/createEnrollmentSchema';
import ISetState from 'Types/ISetState';

interface IProps extends IStepProps {
  currentEnrollment: IEnrollment | null;
  enrollments: IEnrollment[];
  setEnrollments: ISetState<IEnrollment[]>;
}

const StudentStep: React.FC<IProps> = ({
  setStep,
  enrollments,
  setEnrollments,
  currentEnrollment,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { handleErrors } = useErrors();
  const toast = useToast();

  const [showHealthPlan, setShowHealthPlan] = useState(false);
  const [showFoodAlergy, setShowFoodAlergy] = useState(false);
  const [showHealthProblem, setShowHealthProblem] = useState(false);
  const [showMedicationAlergy, setShowMedicationAlergy] = useState(false);
  const [showSpecialNecessities, setShowSpecialNecessities] = useState(false);
  const [reuseAddress, setReuseAddress] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const genderOptions = useMemo<ISelectOption[]>(
    () => [
      {
        text: 'Masculino',
        value: 'male',
      },
      {
        text: 'Feminino',
        value: 'female',
      },
    ],
    [],
  );
  const raceOptions = useMemo<ISelectOption[]>(
    () => [
      {
        text: 'Branco',
        value: 'white',
      },
      {
        text: 'Pardo',
        value: 'brown',
      },
      {
        text: 'Negro',
        value: 'black',
      },
      {
        text: 'Ind??gena',
        value: 'indigenous',
      },

      {
        text: 'Amarelo',
        value: 'yellow',
      },
    ],
    [],
  );
  const gradeOptions = useMemo<ISelectOption[]>(
    () => [
      {
        value: 'maternal',
        text: 'Maternal 2022',
      },
      {
        value: 'first_period',
        text: '1?? per??odo 2022',
      },
      {
        value: 'second_period',
        text: '2?? per??odo 2022',
      },
      {
        value: 'first_year',
        text: '1?? ano 2022',
      },
      {
        value: 'second_year',
        text: '2?? ano 2022',
      },
      {
        value: 'third_year',
        text: '3?? ano 2022',
      },
      {
        value: 'fourth_year',
        text: '4?? ano 2022',
      },
      {
        value: 'fifth_year',
        text: '5?? ano 2022',
      },
      {
        value: 'sixth_year',
        text: '6?? ano 2022',
      },
      {
        value: 'seventh_year',
        text: '7?? ano 2022',
      },
      {
        value: 'eighth_year',
        text: '8?? ano 2022',
      },
      {
        value: 'nineth_year',
        text: '9?? ano 2022',
      },
    ],
    [],
  );
  const radioOptions = useMemo<IRadioOption[]>(
    () => [
      {
        text: 'Sim',
        value: 'true',
      },
      {
        text: 'N??o',
        value: 'false',
      },
    ],
    [],
  );
  const reverseRadioOptions = useMemo<IRadioOption[]>(
    () => [
      {
        text: 'Sim',
        value: 'false',
      },
      {
        text: 'N??o',
        value: 'true',
      },
    ],
    [],
  );

  const handleSearchAddressByCep = useCallback(
    async (cep: string, responsibleType: 'financial' | 'supportive') => {
      try {
        const result = await cepPromise(cep);
        const { street, neighborhood, city } = result;

        formRef.current?.setFieldValue(
          `${responsibleType}_address_street`,
          street,
        );
        formRef.current?.setFieldValue(
          `${responsibleType}_address_neighborhood`,
          neighborhood,
        );
        formRef.current?.setFieldValue(`${responsibleType}_address_city`, city);
      } catch {}
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: IEnrollment) => {
      try {
        if (!currentEnrollment) return;
        setLoading(true);
        formRef.current?.setErrors({});
        await createEnrollmentSchema.validate(data, {
          abortEarly: false,
        });
        data.financial_income_tax = data.financial_income_tax === 'true';
        data.student_ease_relating = data.student_ease_relating === 'true';
        data.student_health_plan = showHealthPlan
          ? data.student_health_plan
          : '';
        data.student_food_alergy = showFoodAlergy
          ? data.student_food_alergy
          : '';
        data.student_medication_alergy = showMedicationAlergy
          ? data.student_medication_alergy
          : '';
        data.student_health_problem = showHealthProblem
          ? data.student_health_problem
          : '';
        data.student_special_necessities = showSpecialNecessities
          ? data.student_special_necessities
          : '';
        await api.post('/reenrollments/review', data, {
          params: {
            enrollment_number: currentEnrollment.enrollment_number,
            financial_birth_date: currentEnrollment.financial_birth_date,
            financial_cpf: currentEnrollment.financial_cpf,
          },
        });
        const newEnrollments = [...enrollments];
        newEnrollments.forEach(e => {
          if (e.enrollment_number === currentEnrollment.enrollment_number) {
            e.reviewd = true;
          }
        });
        setEnrollments(newEnrollments);

        toast({
          title: 'Pedido de matr??cula enviada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        setStep(1);
      } catch (err) {
        handleErrors('Erro ao tentar enviar matr??cula', err, formRef);
      } finally {
        setLoading(false);
      }
    },
    [
      toast,
      setStep,
      handleErrors,
      showHealthPlan,
      showFoodAlergy,
      showHealthProblem,
      showMedicationAlergy,
      showSpecialNecessities,
      currentEnrollment,
      enrollments,
      setEnrollments,
    ],
  );

  useEffect(() => {
    if (!reuseAddress) {
      return;
    }
    const street = formRef.current?.getFieldValue('financial_address_street');
    const number = formRef.current?.getFieldValue('financial_address_number');
    const complement = formRef.current?.getFieldValue(
      'financial_address_complement',
    );
    const neighborhood = formRef.current?.getFieldValue(
      'financial_address_neighborhood',
    );
    const city = formRef.current?.getFieldValue('financial_address_city');
    const cep = formRef.current?.getFieldValue('financial_address_cep');

    formRef.current?.setFieldValue('supportive_address_street', street);
    formRef.current?.setFieldValue('supportive_address_number', number);
    formRef.current?.setFieldValue('supportive_address_complement', complement);
    formRef.current?.setFieldValue(
      'supportive_address_neighborhood',
      neighborhood,
    );
    formRef.current?.setFieldValue('supportive_address_city', city);
    formRef.current?.setFieldValue('supportive_address_cep', cep);
  }, [reuseAddress]);

  useEffect(() => {
    if (!currentEnrollment) {
      return;
    }

    formRef.current?.setFieldValue('grade_name', '');
    if (currentEnrollment.student_health_plan) {
      setShowHealthPlan(true);
      formRef.current?.setFieldValue('has_health_plan', 'true');
    } else {
      formRef.current?.setFieldValue('has_health_plan', 'false');
    }
    if (currentEnrollment.student_medication_alergy) {
      setShowMedicationAlergy(true);
      formRef.current?.setFieldValue('has_medication_alergy', 'true');
    } else {
      formRef.current?.setFieldValue('has_medication_alergy', 'false');
    }
    if (currentEnrollment.student_food_alergy) {
      setShowFoodAlergy(true);
      formRef.current?.setFieldValue('has_food_alergy', 'true');
    } else {
      formRef.current?.setFieldValue('has_food_alergy', 'false');
    }
    if (currentEnrollment.student_health_problem) {
      setShowHealthProblem(true);
      formRef.current?.setFieldValue('has_health_problem', 'true');
    } else {
      formRef.current?.setFieldValue('has_health_problem', 'false');
    }
    if (currentEnrollment.student_special_necessities) {
      setShowSpecialNecessities(true);
      formRef.current?.setFieldValue('has_special_necessities', 'true');
    } else {
      formRef.current?.setFieldValue('has_special_necessities', 'false');
    }
  }, [currentEnrollment]);

  return (
    <Card>
      <Alert status="info">
        Revise os dados para elabora????o dos documentos escolares do aluno
        referente a 2022.
      </Alert>

      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        spacing="40px"
        initialData={currentEnrollment || {}}
      >
        <FormGroup>
          <Subtitle>Dados do respons??vel financeiro</Subtitle>
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
              label="Grau de instru????o"
              placeholder="Selecionar"
              options={educationLevelOptions}
            />
            <Input
              icon={FiBriefcase}
              type="text"
              name="financial_profission"
              label="Profiss??o"
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
              onBlur={e =>
                handleSearchAddressByCep(e.target.value, 'financial')
              }
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
              label="N??mero"
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
              icon={FiCalendar}
              type="date"
              name="financial_birth_date"
              label="Data de nascimento"
            />
          </InputGroup>
          <InputGroup>
            <Radio
              name="financial_income_tax"
              label="Declara imposto de renda?"
              options={radioOptions}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Subtitle>Dados do respons??vel solid??rio</Subtitle>
          <InputGroup>
            <Input
              icon={FiUser}
              type="text"
              name="supportive_name"
              label="Nome"
            />
            <Input
              icon={FiUsers}
              type="text"
              name="supportive_kinship"
              label="Parentesco com o aluno"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiClipboard}
              type="text"
              name="supportive_rg"
              label="RG"
            />
            <Input
              icon={FiClipboard}
              type="text"
              name="supportive_cpf"
              label="CPF"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiFlag}
              type="text"
              name="supportive_nacionality"
              label="Nacionalidade"
            />
            <Input
              icon={FiHeart}
              type="text"
              name="supportive_civil_state"
              label="Estado civil"
            />
          </InputGroup>
          <InputGroup>
            <Select
              icon={FiInfo}
              name="supportive_education_level"
              label="Grau de instru????o"
              placeholder="Selecionar"
              options={educationLevelOptions}
            />
            <Input
              icon={FiBriefcase}
              type="text"
              name="supportive_profission"
              label="Profiss??o"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiBriefcase}
              type="text"
              name="supportive_workplace"
              label="Local de trabalho"
            />
            <Input
              icon={FiPhone}
              type="text"
              name="supportive_commercial_phone"
              label="Telefone comercial"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiPhone}
              type="text"
              name="supportive_residencial_phone"
              label="Telefone residencial"
            />
            <Input
              icon={FiSmartphone}
              type="text"
              name="supportive_personal_phone"
              label="Telefone pessoal"
            />
          </InputGroup>
          <InputGroup>
            <Checkbox onChange={e => setReuseAddress(e.target.checked)}>
              Utilizar o mesmo endere??o do respons??vel financeiro?
            </Checkbox>
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_cep"
              label="CEP"
              onBlur={e =>
                handleSearchAddressByCep(e.target.value, 'supportive')
              }
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_street"
              label="Rua"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="number"
              name="supportive_address_number"
              label="N??mero"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_complement"
              label="Complemento"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_neighborhood"
              label="Bairro"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_city"
              label="Cidade"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMail}
              type="email"
              name="supportive_email"
              label="E-mail"
            />
            <Input
              icon={FiDollarSign}
              type="number"
              name="supportive_monthly_income"
              label="Renda mensal"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiCalendar}
              type="date"
              name="supportive_birth_date"
              label="Data de nascimento"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Subtitle>Dados do estudante</Subtitle>
          <InputGroup>
            <Input icon={FiUser} type="text" name="student_name" label="Nome" />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiClipboard}
              type="text"
              name="student_cpf"
              label="CPF (se tiver)"
            />
            <Input
              icon={FiFlag}
              type="text"
              name="student_nacionality"
              label="Nacionalidade"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="student_birth_city"
              label="Cidade natal"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="student_birth_state"
              label="Estado natal"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiUsers}
              type="text"
              name="student_father_name"
              label="Nome do pai"
            />
            <Input
              icon={FiUsers}
              type="text"
              name="student_mother_name"
              label="Nome da m??e"
            />
          </InputGroup>
          <InputGroup>
            <Select
              icon={FiInfo}
              name="student_gender"
              label="G??nero"
              placeholder="Selecionar"
              options={genderOptions}
            />
            <Select
              icon={FiInfo}
              name="student_race"
              label="Ra??a"
              placeholder="Selecionar"
              options={raceOptions}
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiCalendar}
              type="date"
              name="student_birth_date"
              label="Data de nascimento"
            />
            <Select
              icon={FiSmile}
              name="grade_name"
              label="Turma desejada para 2022"
              placeholder="Selecionar"
              options={gradeOptions}
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiUsers}
              type="text"
              name="how_meet_school"
              label="Como conheceu a escola?"
            />
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_health_plan"
              label="Possui algum plano de sa??de?"
              options={radioOptions}
              onChange={value => setShowHealthPlan(value === 'true')}
            />
            {showHealthPlan && (
              <Input
                type="text"
                name="student_health_plan"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_medication_alergy"
              label="Possui alergia a algum medicamento?"
              options={radioOptions}
              onChange={value => setShowMedicationAlergy(value === 'true')}
            />
            {showMedicationAlergy && (
              <Input
                type="text"
                name="student_medication_alergy"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_food_alergy"
              label="Possui alergia a algum alimento?"
              options={radioOptions}
              onChange={value => setShowFoodAlergy(value === 'true')}
            />
            {showFoodAlergy && (
              <Input
                type="text"
                name="student_food_alergy"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_health_problem"
              label="Possui algum problema de sa??de?"
              options={radioOptions}
              onChange={value => setShowHealthProblem(value === 'true')}
            />
            {showHealthProblem && (
              <Input
                type="text"
                name="student_health_problem"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_special_necessities"
              label="Possui alguma necessidade especial?"
              options={radioOptions}
              onChange={value => setShowSpecialNecessities(value === 'true')}
            />
            {showSpecialNecessities && (
              <Input
                type="text"
                name="student_special_necessities"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="student_ease_relating"
              label="Tem dificuldade de se relacionar?"
              options={reverseRadioOptions}
            />
          </InputGroup>
        </FormGroup>

        <Button isLoading={loading} w="100%" type="submit" isPrimary>
          Enviar
        </Button>
      </Form>
    </Card>
  );
};

export default StudentStep;
