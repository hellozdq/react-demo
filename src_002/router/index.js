import {lazy} from 'react'

// const Person = lazy(import("../pages/Person"));
// const AddCount = lazy(import("../pages/AddCount"));
// const A = ()=> <h1>A</h1>
import Person from '../pages/Person'
import AddCount from '../pages/AddCount'



const  routes = [
    {
         path:"/",
         component:Person,
         exact:true
     },
     {
         path:"/addcount",
         component:AddCount,
        //  routes: [
        //      {
        //          path:"/Person/A",
        //          component: A,
        //      },
        //  ]
     }
 ]
 export default routes;