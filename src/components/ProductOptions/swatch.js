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
import { Check as CheckIcon } from 'react-feather';

import defaultClasses from './swatch.css';

import { memoizedGetRandomColor } from '@magento/venia-ui/lib/util/getRandomColor';
import { useSwatch } from '@magento/peregrine/lib/talons/ProductOptions/useSwatch';

const getClassName = (name, isSelected, hasFocus) =>
    `${name}${isSelected ? '_selected' : ''}${hasFocus ? '_focused' : ''}`;

const Swatch = props => {
    const {
        hasFocus,
        isSelected,
        item: { label, value_index },
        onClick,
        style,
        title
    } = props;

    const talonProps = useSwatch({
        onClick,
        value_index
    });

    const { handleClick } = talonProps;

    const icon = useMemo(() => {
        return isSelected ? <Icon size={'1rem'} src={CheckIcon} /> : null;
    }, [isSelected]);

    const classes = mergeClasses(defaultClasses, props.classes);

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

    const className = classes[getClassName('root', isSelected, hasFocus)];

    return (
        <div className={classes.colorGroup}>
            <button
                className={className}
                onClick={handleClick}
                style={finalStyle}
                title={label}
                type="button"
            >
                {icon}
            </button>
            <div className={classes.title}>
                {title}
            </div>
        </div>

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
