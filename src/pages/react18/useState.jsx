import React, { useState } from 'react';

const UseState = () => {
    const [color , setColor] = useState('black')
    const [animal , setAnimal] = useState('cat')
    const colorList = ['black' , 'pink' , 'blue']
    const animalList = ['cat' , 'dog' , 'mouse']
    
    return ( 
        <div>
            <div>Choose a color and a pet</div>
            <select value={color} onChange={(e)=>setColor(e.target.value)}>
            {
                colorList.map(item=><option value={item}>{item}</option>)
            }
                </select>            
                <select value={animal} onChange={(e)=>setAnimal(e.target.value)}>
            {
                animalList.map(item=><option value={item}>{item}</option>)
            }
                </select>       
            <div>You chose a {color} {animal}</div>
                
        </div>
        
     );
}
 
export default UseState;