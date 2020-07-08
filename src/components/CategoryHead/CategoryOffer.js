import React from 'react';
import { mergeClasses } from '../../classify';
import defaultClasses from './CategoryOffer.css'
import image1 from '../../../saree.jpg';
const CategoryOffer = props => {

    const classes = mergeClasses(defaultClasses, props.classes);
    // console.log(" Offer Props: ", props);
    const { category } = props;
    const { category_name: name ,category_image: image ,offer ,url } = category;

    return (
        <div className={classes.root}>
          <div className={classes.image}>
            <a href={url}>
              <img src={image1} height="150px" width="100px" alt="Product Image" />
            </a>
            <div className={classes.offerText}>{offer}</div>
          </div>
          <div>
              <div className={classes.text}>{name}</div>
          </div>
        </div>
    );
}

export default CategoryOffer;