import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { v4 } from 'uuid';
import {
  Input as BaseInput,
  FormControl,
  FormHelperText,
  InputProps,
  FormLabel,
  InputGroup,
  InputRightElement,
  Icon,
  InputLeftAddon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

import InputError from 'Components/Atoms/InputError';

interface IProps extends InputProps {
  name: string;
  type: string;
  icon?: IconType;
  label?: string;
  helper?: string;
}

const Input: React.FC<IProps> = ({
  name,
  label,
  icon,
  helper,
  type,
  ...rest
}) => {
  const { fieldName, error, registerField, defaultValue } = useField(name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName, inputRef]);

  return (
    <FormControl id={v4()}>
      {label && <FormLabel mb="5px">{label}</FormLabel>}
      <InputGroup>
        {icon && (
          <InputLeftAddon>
            <Icon as={icon} boxSize="20px" />
          </InputLeftAddon>
        )}
        <BaseInput
          variant="outline"
          name={name}
          ref={inputRef}
          type={type}
          defaultValue={defaultValue}
          step={type === 'number' ? '0.01' : ''}
          {...rest}
        />
        {error && (
          <InputRightElement>
            <InputError error={error} />
          </InputRightElement>
        )}
      </InputGroup>

      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default Input;
