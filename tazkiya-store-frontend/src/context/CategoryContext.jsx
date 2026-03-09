import {createContext, useState} from 'react';

const CategoryContext = createContext();

const CategoryProvider = ({children}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  return (
   <CategoryContext.Provider value={{selectedCategory, setSelectedCategory}}>
   {children}
   </CategoryContext.Provider>
  )
}

export {CategoryContext, CategoryProvider};