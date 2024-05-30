import { useBreakpoint as useReactBreakpoint } from 'use-breakpoint';

const breakpoints = {
  mobile: -1,
  tablet: 768,
  desktop: 1280,
};

const useBreakpoint = () => {
  return useReactBreakpoint(breakpoints, 'mobile');
};

export default useBreakpoint;
