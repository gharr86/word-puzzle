import { LayoutProps, FlexProps, FlexboxProps } from 'styled-system';

export interface DivProps extends FlexProps, FlexboxProps, LayoutProps {
  children: React.ReactNode
}
