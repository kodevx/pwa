import React from 'react';

const useCategoryHead = props => {
 
const { data } = props;
const CategoryData = data ? JSON.parse(data.TopMenu): null; 

  return {
     category: CategoryData
 }
}

export default useCategoryHead;