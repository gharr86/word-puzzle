import { FlexProps, LayoutProps } from 'styled-system';

export interface DivProps extends FlexProps, LayoutProps {
  children: React.ReactNode
}
