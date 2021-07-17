import React from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  BoxProps,
} from '@chakra-ui/react';

interface IProps extends BoxProps {
  title?: string;
  description?: string;
}

const Card: React.FC<IProps> = ({ title, description, children, ...rest }) => {
  const cardColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      p="20px"
      backgroundColor={cardColor}
      boxShadow="0 4px 24px 0 rgb(34 41 47 / 10%)"
      borderRadius="7px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Box mb={children && (title || description) ? '20px' : '0px'}>
        {title && (
          <Heading as="h1" size="md">
            {title}
          </Heading>
        )}
        {description && <Text>{description}</Text>}
      </Box>
      {children}
    </Box>
  );
};

export default Card;
