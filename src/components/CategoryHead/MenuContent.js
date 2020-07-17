import React from 'react';
import { mergeClasses } from '../../classify';
import { Link, resourceUrl } from '@magento/venia-drivers';
import defaultclasses from './MenuContent.css'
import SubCategory from './SubCategory';
import CategoryOffer from './CategoryOffer';

const MenuContent = props => {

  const classes = mergeClasses(props.classes, defaultclasses);
  const { subCategory, categoryOffers } = props;
  // console.log('MenuContent Props', props);

  const title = categoryOffers ? categoryOffers[0].title : null;
  const link_text = categoryOffers ? categoryOffers[0].link_text : null;
  const link = categoryOffers ? categoryOffers[0].link : null;


  const categoryProducts = subCategory ? subCategory.map(category => <SubCategory key={category.id} category={category} />) : null;
  const offerContent = categoryOffers ? categoryOffers[0].categories.map(category => <CategoryOffer key={category.category_id} category={category} />) : null;

  return (
    <div className={classes.root}>
      <div className={classes.category}>
        {categoryProducts}
      </div>
      <div className={classes.actions}>
        <div className={classes.title}>
          <div className={classes.text}>{title}</div>
          <Link className={classes.links} to={resourceUrl(`/${link}`)}>{link_text}</Link>
        </div>
        <div className={classes.offerBlock}>
          {offerContent}
        </div>
      </div>
    </div>
  )
}

export default MenuContent;