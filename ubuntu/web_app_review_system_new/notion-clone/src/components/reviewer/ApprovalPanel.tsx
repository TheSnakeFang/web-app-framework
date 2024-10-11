import React from 'react';
import { Box, Button, HStack } from '@chakra-ui/react';

interface ApprovalPanelProps {
  onApprove: () => void;
  onDisapprove: () => void;
}

const ApprovalPanel: React.FC<ApprovalPanelProps> = ({ onApprove, onDisapprove }) => {
  return (
    <Box>
      <HStack spacing={4}>
        <Button colorScheme="green" onClick={onApprove}>
          Approve
        </Button>
        <Button colorScheme="red" onClick={onDisapprove}>
          Disapprove
        </Button>
      </HStack>
    </Box>
  );
};

export default ApprovalPanel;
