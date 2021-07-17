import React from 'react';
import {
  Box,
  Button as BaseButton,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

interface IProps extends ButtonProps {
  isPrimary?: boolean;
  confirmation?: {
    body: string;
    buttonText: string;
    colorScheme: string;
  };
}

const Button: React.FC<IProps> = ({
  isPrimary,
  confirmation,
  onClick,
  ...rest
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <BaseButton
          variant={isPrimary ? 'solid' : 'outline'}
          colorScheme="blue"
          loadingText="Loading"
          onClick={confirmation ? () => {} : onClick}
          w="100%"
          {...rest}
        />
      </PopoverTrigger>
      {confirmation && (
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Box mb="5px">{confirmation.body}</Box>
              <BaseButton
                onClick={onClick}
                colorScheme={confirmation.colorScheme}
              >
                {confirmation.buttonText}
              </BaseButton>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      )}
    </Popover>
  );
};

export default Button;
