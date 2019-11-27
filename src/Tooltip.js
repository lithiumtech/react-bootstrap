import React from 'react';
import PropTypes from 'prop-types';
import isRequiredForA11y from 'prop-types-extra/lib/isRequiredForA11y';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'tooltip'
   */
  bsPrefix: PropTypes.string,

  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,

  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: isRequiredForA11y(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),

  /**
   * Sets the direction the Tooltip is positioned towards.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   */
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),

  /**
   * An Overlay injected set of props for positioning the tooltip arrow.
   *
   * > This is generally provided by the `Overlay` component positioning the tooltip
   *
   * @type {{ ref: ReactRef, style: Object }}
   */
  arrowProps: PropTypes.shape({
    ref: PropTypes.any,
    style: PropTypes.object,
  }),

  /** @private */
  scheduleUpdate: PropTypes.func,

  /** @private */
  outOfBoundaries: PropTypes.any,
};

const defaultProps = {
  placement: 'right',
};

const Tooltip = React.forwardRef(
  (
    {
      bsPrefix,
      classNameMap,
      placement,
      className,
      style,
      children,
      arrowProps,
      scheduleUpdate: _,
      outOfBoundaries: _1,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'tooltip');
    const classNames = useClassNameMapper(classNameMap);

    return (
      <div
        ref={ref}
        style={style}
        role="tooltip"
        x-placement={placement}
        className={classNames(className, bsPrefix, `bs-tooltip-${placement}`)}
        {...props}
      >
        <div className={classNames('arrow')} {...arrowProps} />
        <div className={classNames(`${bsPrefix}-inner`)}>{children}</div>
      </div>
    );
  },
);

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
Tooltip.displayName = 'Tooltip';

export default Tooltip;
