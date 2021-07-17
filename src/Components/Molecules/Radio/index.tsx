import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import {
  FormControl,
  FormLabel,
  InputGroup,
  Radio as BaseRadio,
  InputRightElement,
  RadioGroup,
  RadioGroupProps,
  Stack,
} from '@chakra-ui/react';

import InputError from 'Components/Atoms/InputError';

export interface IRadioOption {
  text: string;
  value: string;
}

interface IProps extends Omit<RadioGroupProps, 'children'> {
  name: string;
  label?: string;
  options: IRadioOption[];
}

const Radio: React.FC<IProps> = ({
  name,
  label,
  options,
  onChange,
  ...rest
}) => {
  const { defaultValue, error, fieldName, registerField } = useField(name);

  const radioRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (nextValue: string) => {
      if (onChange) onChange(nextValue);
      setValue(nextValue);
    },
    [onChange],
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: radioRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <FormControl>
      <input
        type="hidden"
        ref={radioRef}
        defaultValue={defaultValue}
        value={value}
      />

      {label && <FormLabel mb="5px">{label}</FormLabel>}

      <InputGroup>
        <RadioGroup
          name={name}
          colorScheme="blue"
          defaultValue={defaultValue}
          onChange={nextValue => handleChange(nextValue)}
          value={value}
          {...rest}
        >
          <Stack direction="row">
            {options.map((option, i) => (
              <BaseRadio isInvalid={!!error} key={i} value={option.value}>
                {option.text}
              </BaseRadio>
            ))}
          </Stack>
        </RadioGroup>

        {error && (
          <InputRightElement mr="25px">
            <InputError error={error} />
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
};

export default Radio;
