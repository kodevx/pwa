import React, { Fragment, Suspense, useEffect } from 'react';
import { func, shape, string } from 'prop-types';

import { useCategoryContent } from '@magento/peregrine/lib/talons/RootComponents/Category';

import NoProductsFound from './NoProductsFound';
import { mergeClasses } from '../../classify';
import { Title } from '@magento/venia-ui/lib/components/Head';
import Breadcrumbs from '../../components/Breadcrumbs';
import Gallery from '../../components/Gallery';
import CategorySort from '../../components/CategorySort';
import Pagination from '../../components/Pagination';
import defaultClasses from './category.css';

const FilterModal = React.lazy(() => import('../../components/FilterModal'));
import GET_PRODUCT_FILTERS_BY_CATEGORY from '../../queries/getProductFiltersByCategory.graphql';

const CategoryContent = props => {
    const { categoryId, data, pageControl, sortControl } = props;

    const talonProps = useCategoryContent({
        categoryId,
        data,
        queries: {
            getProductFiltersByCategory: GET_PRODUCT_FILTERS_BY_CATEGORY
        }
    });

    const {
        categoryName,
        loadFilters,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle,
        totalPagesFromData
    } = talonProps;

    useEffect(() => {
        // console.log('useffect called');
        handleLoadFilters();
    });

    const classes = mergeClasses(defaultClasses, props.classes);

    const header = filters ? (
        <div className={classes.headerButtons}>
            <button
                className={classes.filterButton}
                onClick={handleOpenFilters}
                onFocus={handleLoadFilters}
                onMouseOver={handleLoadFilters}
                type="button"
            >
                {'Filter'}
            </button>
            <CategorySort sortControl={sortControl} />
        </div>
    ) : null;

    // If you want to defer the loading of the FilterModal until user interaction
    // (hover, focus, click), simply add the talon's `loadFilters` prop as
    // part of the conditional here.
    const modal = filters ? <FilterModal filters={filters} /> : null;
    // console.log('filters',filters);
    const content =
        totalPagesFromData === 0 ? (
            <NoProductsFound categoryId={categoryId} />
        ) : (
                <Fragment>
                    <h1 className={classes.title}>
                        <div className={classes.categoryTitle}>{categoryName}</div>
                    </h1>
                    <section className={classes.gallery}>
                        <Gallery items={items} />
                    </section>
                    <div className={classes.pagination}>
                        <Pagination pageControl={pageControl} />
                    </div>
                </Fragment>
            );
    return (
        <Fragment>
            <div className={classes.container}>
                <Breadcrumbs categoryId={categoryId} />
                <Title>{pageTitle}</Title>
                <article className={classes.root}>
                    <div className={classes.headerButtons}>
                        <Suspense fallback={<div>Loading...</div>}>
                            {modal}
                        </Suspense>
                    </div>
                    {/* <h1 className={classes.title}>
                    <div className={classes.categoryTitle}>{categoryName}</div>
                </h1> */}
                    {content}
                </article>
            </div>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    sortControl: shape({
        currentSort: shape({
            setSortDirection: string,
            sortAttribute: string
        }),
        setSort: func.isRequired
    }),
    classes: shape({
        filterContainer: string,
        gallery: string,
        headerButtons: string,
        pagination: string,
        root: string,
        title: string
    })
};
