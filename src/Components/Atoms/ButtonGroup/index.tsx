import React from 'react';
import { Stack } from '@chakra-ui/react';

const ButtonGroup: React.FC = ({ children }) => {
  return (
    <Stack
      mt="10px"
      spacing="10px"
      alignItems="flex-end"
      direction={['column', 'row']}
    >
      {children}
    </Stack>
  );
};

export default ButtonGroup;
