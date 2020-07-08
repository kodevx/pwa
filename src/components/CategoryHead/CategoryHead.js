import React, { useEffect, Suspense } from 'react';
import { mergeClasses } from '../../classify';
import defaultClasses from './CategoryHead.css';
import CategoryMenu from './CategoryMenu';
import useCategoryHead from '../../talons/useCategoryHead';

const CategoryHead = props => {
   const classes = mergeClasses(defaultClasses, props.classes);
   // console.log('Props', props);
   const { data } = props;
   const talonProps = useCategoryHead({ data });
   const { category } = talonProps;
   console.log('Parsed Data: ',category);
   const Categories = category ? category.map(category => <CategoryMenu key={category.id} data={category} />) : null;
   const CategoryHeads = category ? Categories : null;

   return (
      <div>
         <ul>
            <div className={classes.root}>
               <Suspense fallback={<div>Loading Headers...</div>}>
                  {CategoryHeads}
               </Suspense>
            </div>
         </ul>
      </div>
   )
}

export default CategoryHead;