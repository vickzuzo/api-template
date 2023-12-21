import {tw} from '@emedic/lib/utils';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<IProps> = ({children, className}) => (
  <div className={tw('container mx-auto', className)}>{children}</div>
);
