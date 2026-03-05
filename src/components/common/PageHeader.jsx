import React from 'react';
import {
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

/**
 * Reusable page header component
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.subtitle - Optional subtitle
 * @param {string} props.variant - Typography variant for title
 * @param {Object} props.sx - Additional styles
 * @returns {JSX.Element} - The page header component
 */
const PageHeader = ({ 
  title, 
  subtitle = '', 
  variant = 'h4', 
  sx = {} 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Typography 
        variant={isMobile ? "h5" : variant} 
        component="h1" 
        gutterBottom
        sx={{ 
          textAlign: isMobile ? 'center' : 'left', 
          mb: isMobile ? 2 : 3,
          ...sx 
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            textAlign: isMobile ? 'center' : 'left', 
            mb: isMobile ? 2 : 3,
            color: 'text.secondary'
          }}
        >
          {subtitle}
        </Typography>
      )}
    </>
  );
};

export default PageHeader;