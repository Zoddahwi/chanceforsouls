import React from 'react';
import { classNames } from '../../utils';

/**
 * Container component for consistent layout
 */
export const Container = ({ children, size = 'default', className = '', ...props }) => {
  const sizeClasses = {
    small: 'max-w-4xl',
    default: 'max-w-6xl',
    large: 'max-w-7xl',
    full: 'max-w-full',
  };

  const containerClasses = classNames(
    'w-full mx-auto px-4 sm:px-6 lg:px-8',
    sizeClasses[size],
    className
  );

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

/**
 * Section wrapper component
 */
export const Section = ({
  children,
  id,
  className = '',
  backgroundColor = 'transparent',
  padding = 'default',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    small: 'py-8',
    default: 'py-16',
    large: 'py-24',
  };

  const bgClasses = {
    transparent: '',
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900',
  };

  const sectionClasses = classNames(
    'w-full',
    paddingClasses[padding],
    bgClasses[backgroundColor],
    className
  );

  return (
    <section id={id} className={sectionClasses} {...props}>
      {children}
    </section>
  );
};

/**
 * Grid component for consistent layouts
 */
export const Grid = ({ children, columns = 'auto', gap = 'default', className = '', ...props }) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    'auto-fit': 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
  };

  const gapClasses = {
    none: '',
    small: 'gap-4',
    default: 'gap-6',
    large: 'gap-8',
  };

  const gridClasses = classNames('grid', columnClasses[columns], gapClasses[gap], className);

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};

/**
 * Flex component for flexbox layouts
 */
export const Flex = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap = 'none',
  className = '',
  ...props
}) => {
  const directionClasses = {
    row: 'flex-row',
    column: 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse',
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const wrapClasses = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  };

  const gapClasses = {
    none: '',
    small: 'gap-2',
    default: 'gap-4',
    large: 'gap-6',
    xlarge: 'gap-8',
  };

  const flexClasses = classNames(
    'flex',
    directionClasses[direction],
    alignClasses[align],
    justifyClasses[justify],
    wrapClasses[wrap],
    gapClasses[gap],
    className
  );

  return (
    <div className={flexClasses} {...props}>
      {children}
    </div>
  );
};
