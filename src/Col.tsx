import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

type NumberAttr =
  | number
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

type ColOrder = 'first' | 'last' | NumberAttr;
type ColSize = boolean | 'auto' | NumberAttr;
type ColSpec =
  | ColSize
  | { span?: ColSize; offset?: NumberAttr; order?: ColOrder };

export interface ColProps extends BsPrefixPropsWithChildren {
  xs?: ColSpec;
  sm?: ColSpec;
  md?: ColSpec;
  lg?: ColSpec;
  xl?: ColSpec;
}

const DEVICE_SIZES = [
  'xl' as const,
  'lg' as const,
  'md' as const,
  'sm' as const,
  'xs' as const,
];
const colSize = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.oneOf(['auto']),
]);

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

const column = PropTypes.oneOfType([
  colSize,
  PropTypes.shape({
    size: colSize,
    order: stringOrNumber,
    offset: stringOrNumber,
  }),
]);

const propTypes = {
  /**
   * @default 'col'
   */
  bsPrefix: PropTypes.string,

  as: PropTypes.elementType,

  /**
   * The number of columns to span on extra small devices (<576px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xs: column,

  /**
   * The number of columns to span on small devices (≥576px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  sm: column,

  /**
   * The number of columns to span on medium devices (≥768px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  md: column,

  /**
   * The number of columns to span on large devices (≥992px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  lg: column,

  /**
   * The number of columns to span on extra large devices (≥1200px)
   *
   * @type {(boolean|"auto"|number|{ span: boolean|"auto"|number, offset: number, order: "first"|"last"|number })}
   */
  xl: column,
};

const Col: BsPrefixRefForwardingComponent<'div', ColProps> = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({ bsPrefix, className, as: Component = 'div', ...props }: ColProps, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'col');
    const classNames = useClassNameMapper();
    const spans: string[] = [];
    const classes: string[] = [];

    DEVICE_SIZES.forEach((brkPoint) => {
      const propValue = props[brkPoint];
      delete props[brkPoint];

      let span: ColSize | undefined;
      let offset: NumberAttr | undefined;
      let order: ColOrder | undefined;

      if (typeof propValue === 'object' && propValue != null) {
        ({ span = true, offset, order } = propValue);
      } else {
        span = propValue;
      }

      const infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

      if (span)
        spans.push(
          span === true ? `${prefix}${infix}` : `${prefix}${infix}-${span}`,
        );

      if (order != null) classes.push(`order${infix}-${order}`);
      if (offset != null) classes.push(`offset${infix}-${offset}`);
    });

    if (!spans.length) {
      spans.push(prefix); // plain 'col'
    }

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(className, ...spans, ...classes)}
      />
    );
  },
);

Col.displayName = 'Col';
Col.propTypes = propTypes;

export default Col;
