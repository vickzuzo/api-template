import React from 'react';
import {Helmet} from 'react-helmet-async';

interface IProps {
  /**
   * The meta tag headers to display on a page.
   *
   */
  children?: React.ReactNode;
  /**
   * The title of the page.
   *
   */
  title: string;
}

const Head: React.FC<IProps> = ({children, title}) => (
  <Helmet title={`${title} | EMEDIC`}>{children}</Helmet>
);

export default Head;
