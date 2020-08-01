import React, { Fragment,useMemo } from 'react';
import { array, arrayOf, shape, string } from 'prop-types';
import { X as CloseIcon } from 'react-feather';
import { useFilterModal } from '@magento/peregrine/lib/talons/FilterModal';

import { mergeClasses } from '../../classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { Modal } from '@magento/venia-ui/lib/components/Modal';
import CurrentFilters from './CurrentFilters';
import FilterBlock from './filterBlock';
import FilterFooter from './filterFooter';
import defaultClasses from './filterModal.css';

import Gallery from '../Gallery';
import CategorySort from '../CategorySort';
import Pagination from '../Pagination';
import NoProductsFound from '../../RootComponents/Category/NoProductsFound';

import FILTER_INTROSPECTION from '../../queries/introspection/filterIntrospectionQuery.graphql';

/**
 * A view that displays applicable and applied filters.
 *
 * @param {Object} props.filters - filters to display
 */
const FilterModal = props => {
    const { filters,items,categoryName,categoryId,pageControl,totalPagesFromData } = props;
    // console.log("FilterModal",filters);
    // console.log('Items',items);
    const talonProps = useFilterModal({
        filters,
        queries: { filterIntrospection: FILTER_INTROSPECTION }
    });
    const {
        filterApi,
        filterItems,
        filterNames,
        filterState,
        handleApply,
        handleClose,
        handleReset,
        isOpen
    } = talonProps;
    
    // console.log("open",isOpen);
    const classes = mergeClasses(defaultClasses, props.classes);
    const modalClass = isOpen ? classes.root_open : classes.root;

    const filtersList = useMemo(
        () =>
            Array.from(filterItems, ([group, items]) => {
                const blockState = filterState.get(group);
                const groupName = filterNames.get(group);

                return (
                    <FilterBlock
                        key={group}
                        filterApi={filterApi}
                        filterState={blockState}
                        group={group}
                        items={items}
                        name={groupName}
                        applyFilters={handleApply}
                    />
                );
            }),
        [filterApi, filterItems, filterNames, filterState]
    );

    const content =
        totalPagesFromData === 0 ? (
            <NoProductsFound categoryId={categoryId} />
        ) : (
                <Fragment>
                    <h1 className={classes.title}>
                        <div className={classes.categoryTitle}>{categoryName}</div>
                    </h1>
                        <CurrentFilters
                            filterApi={filterApi}
                            filterNames={filterNames}
                            filterState={filterState}
                        />
                    <section className={classes.gallery}>
                        <Gallery items={items} />
                    </section>
                    <div className={classes.pagination}>
                        <Pagination pageControl={pageControl} />
                    </div>
                </Fragment>
            );

    return (
        // <Modal>
            // <aside className={classes.root_open}>
            <div className={classes.root}>
                <div className={classes.body}>
                    <div className={classes.header}>
                        <h2 className={classes.headerTitle}>{'FILTERS'}</h2>
                        <button className={classes.text} disabled={!filterState.size} onClick={handleReset} >
                            CLEAR ALL
                        </button>
                    </div>
                    <ul className={classes.blocks}>{filtersList}</ul>
                    <FilterFooter
                       applyFilters={handleApply}
                       hasFilters={!!filterState.size}
                       isOpen={true}
                       resetFilters={handleReset}
                    />
                </div>
                <div>
                  {content}
                </div>
            </div>
            // </aside>
        // </Modal>
    );
};

FilterModal.propTypes = {
    classes: shape({
        blocks: string,
        body: string,
        header: string,
        headerTitle: string,
        root: string,
        root_open: string
    }),
    filters: arrayOf(
        shape({
            attribute_code: string,
            items: array
        })
    )
};

export default FilterModal;

//  <div>
// <div className={classes.body}>
//     <div className={classes.header}>
//         <h2 className={classes.headerTitle}>{'FILTERS'}</h2>
//          <button onClick={handleClose}>
//             <Icon src={CloseIcon} />
//         </button> 
//     </div>
//     <CurrentFilters
//         filterApi={filterApi}
//         filterNames={filterNames}
//         filterState={filterState}
//     />
//     <ul className={classes.blocks}>{filtersList}</ul>
// </div>
// <FilterFooter
//     applyFilters={handleApply}
//     hasFilters={!!filterState.size}
//     isOpen={true}
//     resetFilters={handleReset}
// />
// </div>  
