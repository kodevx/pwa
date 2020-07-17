import React from 'react';
import { mergeClasses } from '../../../classify';
import defaultClasses from './SubCategory.css';
import { Link, resourceUrl } from '@magento/venia-drivers';

const SubCategory = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    // console.log("Props", props);
    const { category } = props;
    // console.log("Children array", categories.children); 

    const categoryLinks = category.children.map(products => { 
        return (
        <div key={products.id} className={classes.links}>
            <Link to={resourceUrl(`/${products.link}`)}>{products.name}</Link>
        </div> 
      ) 
    });

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Link to={resourceUrl(`/${category.link}`)}>{category.name}</Link>
            </div>
            <div className={classes.content}>
                {categoryLinks}
            </div>
        </div>
    )
}

export default SubCategory;
