import React from 'react';
import { mergeClasses } from '../../../classify';
import defaultClasses from './SubCategory.css';

const SubCategory = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    // console.log("Props", props);
    const { category } = props;
    // console.log("Children array", categories.children); 

    const categoryLinks = category.children.map(products => { 
        return (
        <div key={products.id} className={classes.links}>
            <a href={products.link}>{products.name}</a>
        </div> 
      ) 
    });

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <a href={category.link}>{category.name}</a>
            </div>
            <div className={classes.content}>
                {categoryLinks}
            </div>
        </div>
    )
}

export default SubCategory;
