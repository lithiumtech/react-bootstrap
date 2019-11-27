import PropTypes from 'prop-types';
import React from 'react';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import PageItem, { First, Prev, Ellipsis, Next, Last } from './PageItem';

const propTypes = {
  /**
   * @default 'pagination'
   * */
  bsPrefix: PropTypes.string,

  /**
   * ClassName mapping
   */
  classNameMap: PropTypes.object,

  /**
   * Set's the size of all PageItems.
   *
   * @type {('sm'|'lg')}
   */
  size: PropTypes.string,
};

/**
 * @property {PageItem} Item
 * @property {PageItem} First
 * @property {PageItem} Prev
 * @property {PageItem} Ellipsis
 * @property {PageItem} Next
 * @property {PageItem} Last
 */
const Pagination = React.forwardRef(
  ({ bsPrefix, classNameMap, className, children, size, ...props }, ref) => {
    const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'pagination');
    const classNames = useClassNameMapper(classNameMap);

    return (
      <ul
        ref={ref}
        {...props}
        className={classNames(
          className,
          decoratedBsPrefix,
          size && `${decoratedBsPrefix}-${size}`,
        )}
      >
        {children}
      </ul>
    );
  },
);

Pagination.propTypes = propTypes;

Pagination.First = First;
Pagination.Prev = Prev;
Pagination.Ellipsis = Ellipsis;
Pagination.Item = PageItem;
Pagination.Next = Next;
Pagination.Last = Last;

export default Pagination;
