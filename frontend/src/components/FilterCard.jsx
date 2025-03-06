import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

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
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>FilterCard</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((item,index)=>
          <div>
            <h1 className='font-bold text-lg'>{item.filterType}</h1>
            {
              item.array.map((item,index)=>
              <div className='flex items-center space-x-2 my-2 text-sm font-medium '>
                <RadioGroupItem value={item} />
                <Label>{item}</Label>
              </div>
              )
            }
          </div>)
        }
      </RadioGroup>
      </div>
  )
}

export default FilterCard