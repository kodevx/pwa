import React, { useMemo } from 'react';
import {
    bool,
    func,
    number,
    object,
    oneOfType,
    shape,
    string
} from 'prop-types';

import { mergeClasses } from '../../classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { Check as Checkmark } from 'react-feather';

import defaultClasses from './swatchFilter.css';

import { memoizedGetRandomColor } from '@magento/venia-ui/lib/util/getRandomColor';
import { useSwatch } from '@magento/peregrine/lib/talons/ProductOptions/useSwatch';

const getClassName = (name, isSelected, hasFocus) =>
    `${name}${isSelected ? '_selected' : ''}${hasFocus ? '_focused' : ''}`;

const Swatch = props => {
    const { classes: propsClasses, isSelected, hasFocus,item: { label, value_index },style,title, ...restProps } = props;
    // console.log('SwatchFilter Props',props);

    const classes = mergeClasses(defaultClasses, propsClasses);
    const iconClassName = isSelected ? classes.iconActive : classes.icon;

    // TODO: use the colors from graphQL when they become available.
    //   https://github.com/magento/graphql-ce/issues/196
    //   https://github.com/magento/pwa-studio/issues/1633
    const randomColor = memoizedGetRandomColor(value_index);

    // We really want to avoid specifying presentation within JS.
    // Swatches are unusual in that their color is data, not presentation,
    // but applying color *is* presentational.
    // So we merely provide the color data here, and let the CSS decide
    // how to use that color (e.g., background, border).
    const finalStyle = Object.assign({}, style, {
        '--venia-swatch-bg': randomColor
    });

    const className = classes[getClassName('icn', isSelected, hasFocus)];

    return (
        <button className={classes.root} {...restProps}>
            <span className={iconClassName}>
                {isSelected && <Icon src={Checkmark} size={14} />}
            </span>
            <div className={className} style={finalStyle}>
            </div>
            <span className={classes.title}>{title}</span>
        </button>
    );
};

Swatch.propTypes = {
    hasFocus: bool,
    isSelected: bool,
    item: shape({
        label: string.isRequired,
        value_index: oneOfType([number, string]).isRequired
    }).isRequired,
    onClick: func.isRequired,
    style: object
};

Swatch.defaultProps = {
    hasFocus: false,
    isSelected: false
};

export default Swatch;