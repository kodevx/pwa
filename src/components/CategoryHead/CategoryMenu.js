import React from 'react';
import { mergeClasses } from '../../classify';
import defaultClasses from './CategoryMenu.css'
import Button from '@magento/venia-ui/lib/components/Button';
import MenuContent from './MenuContent';

const CategoryMenu = props => {

    const classes = mergeClasses(props.classes, defaultClasses);

    // console.log('Props',props);
    const { data:category } =  props;

    return (
        <div>
            <li>
                <div className={classes.root}>
                    <Button className={classes.dropBtn}>
                        <a className={classes.links} href={category.link}>{category.name}</a> 
                    </Button>
                    <div className={classes.menu}>
                        <MenuContent subCategory={category.children} categoryOffers={category.right_sidebar_content} />
                    </div>
                </div>
            </li>    
        </div>
    )

}

export default CategoryMenu;