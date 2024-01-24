import { css } from 'styled-components';

export const displayFlex = (justify: string, align = 'center', flow = 'row nowrap') => (
  css`
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
    flex-flow: ${flow};
  `
);
