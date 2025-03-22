import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetSingleCompany from '@/customHooks/useGetSingleCompany'


function CompanySetup() {
  const params= useParams()
  console.log(params.id);
  
  
 useGetSingleCompany(params.id)

  


  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    file: null,
  })

  const {singleCompany}=useSelector(store=>store.company)
  const[loading,setLoading]=useState(false)

  const navigate=useNavigate()

  const ChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const ChangeFileHandler=(e)=>{
    const file = e.target.files?.[0]  
    setInput({...input,file})
  }

  const SubmitHandler=async(e)=>{
    e.preventDefault()
    console.log(input);
    
    const formdata=new FormData
    formdata.append("name", input.name)
    formdata.append("description",input.description)
    formdata.append("location",input.location)
    formdata.append("website",input.website)
    if(input.file){
      formdata.append("file",input.file)
    }

    try {
      setLoading(true)
      const res= await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`,formdata,{
        headers:{"Content-Type":"multipart/form-data"},
        withCredentials:true
      })
      console.log(params.id);
      
      if(res.data.success){
        toast.success(res.data.message)
        navigate("/admin/companies")
      }
    } catch (error) {
      console.log("error while updating a file",error);
      toast.error(error.response.data.message || "something went wrong")
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    setInput((prevInput) => ({
      ...prevInput,
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      location: singleCompany?.location || "",
      website: singleCompany?.website || "",
      file: singleCompany?.file || null,
    }));
  }, [singleCompany]);
  return (
    <div>
      <div className='max-w-xl mx-auto my-10'>
        <form onSubmit={SubmitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button onClick={()=>navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold  text-xl'>Company Setup</h1>
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={ChangeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={ChangeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={ChangeEventHandler}
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={ChangeEventHandler}
              />
            </div>

            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={ChangeFileHandler}
              />
            </div>
          </div>
          {
            loading ? <Button className="w-full"><Loader2 className="mr-2 h-4 w-4  animate-spin"/>Please wait</Button>:<Button
            type="submit"
            className="w-full my-4 bg-[#6a38c2] hover:bg-[#7c5ab8]"
          >
            Update
          </Button>
          }
        </form>
      </div>
    </div>
  )
}

export default CompanySetup