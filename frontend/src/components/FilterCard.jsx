import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData=[
  {
    filterType:"Location",
    array:["Delhi","Bangalore","Pune","Mumbai","Hyderabad"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer","Backend Developer","Cloud Engineer","BlockChain Developer"]
  },
  {
    filterType:"Salary",
    array:["0-40k","45-1lakh","1-5lakh"]
  }
]

function FilterCard() {
  const[selectedValue,setSelectedValue]=useState('')
  const dispatch=useDispatch()
  const changeHandler=(value)=>{
    setSelectedValue(value)
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])
  return (  
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>FilterCard</h1>
      <hr className='mt-3'/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((item,index)=>
          <div>
            <h1 className='font-bold text-lg'>{item.filterType}</h1>
            {
              item.array.map((item,idx)=>{
                const itemId=`r${index}-${idx}`
                return(
                  <div className='flex items-center space-x-2 my-2 text-sm font-medium '>
                  <RadioGroupItem value={item} id={itemId}/>
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
                )
              })
            }
          </div>)
        }
      </RadioGroup>
      </div>
  )
}

export default FilterCard