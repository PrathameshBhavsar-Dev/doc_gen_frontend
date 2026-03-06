import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

/**
 * A responsive container component that adjusts its width based on screen size
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} props.sx - Additional styles to apply to the container
 * @returns {JSX.Element} - The responsive container component
 */
const ResponsiveContainer = ({ children, sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: isMobile ? '100%' : isTablet ? '90%' : '1200px',
        mx: 'auto',
        px: isMobile ? 2 : 3,
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer;