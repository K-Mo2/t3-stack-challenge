import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useRouter } from 'next/router';
import { api } from "~/utils/api";


export default function Id() {
    const router = useRouter();
    const id = parseInt(router.query.id);
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");
    const [author, setAuthor] = useState("");
    
    const {data, isLoading} =  api.courses.getCourse.useQuery({id: id});
    const updateMutation =  api.courses.updateCourse.useMutation()
    const deleteMutation =  api.courses.deleteCourse.useMutation({id: id})


    const editCourse = function(){
        setIsEditable(true);
    }
    
    const updateCourse = function(id:number){
        try {
            updateMutation.mutate({id: id, name:name || data?.course?.name, description:(description || data?.course?.description)})
            router.reload()
        } catch(error){
            console.log(error);
        }
    }
   
    const deleteCourse = function(id:number){
        try {
            deleteMutation.mutate({id: id})
            router.push('/')
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        setName(data?.course?.name);
        setDesciption(data?.course?.description);
    },[isLoading, data, isEditable])
    
  return (
    <div className='flex flex-col justify-center items-center h-auto'>
        <div className='text-center text-2xl my-10'>Name: {data?.course?.name}</div>
        <div className='text-center text-2xl my-10'>Description: {data?.course?.description}</div>
        <div className='flex flex-row justify-around w-1/4'>
            <div onClick={()=>editCourse()} className='cursor-pointer text-xl rounded p-2 bg-orange-400'>Update</div>
            <div onClick={()=>deleteCourse(id)} className='cursor-pointer text-xl rounded p-2 bg-red-500'>Delete</div>
        </div>
        {isEditable && <div className='flex flex-col mt-4'>
            
            <label htmlFor="name">Name</label>
            <input id='name' type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} className='border-2 border-black rounded my-2'/>
            <label htmlFor="description">Description</label>
            <input id='description' type="text" name='desctiprion' value={description} onChange={(e)=>setDesciption(e.target.value)} className='border-2 border-black rounded my-2'/>
            <div onClick={()=>updateCourse(id)} className='cursor-pointer text-center text-xl rounded p-2 bg-blue-400'>Submit</div>
        </div>}
    </div>
  )
}
