import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const ResponsiveBox = ({ 
  children, 
  mobileProps = {}, 
  tabletProps = {}, 
  desktopProps = {}, 
  ...commonProps 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  let responsiveProps = { ...commonProps };

  if (isMobile) {
    responsiveProps = { ...responsiveProps, ...mobileProps };
  } else if (isTablet) {
    responsiveProps = { ...responsiveProps, ...tabletProps };
  } else if (isDesktop) {
    responsiveProps = { ...responsiveProps, ...desktopProps };
  }

  return (
    <Box {...responsiveProps}>
      {children}
    </Box>
  );
};

export default ResponsiveBox;