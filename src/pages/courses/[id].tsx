import React, { useEffect, useState } from 'react'
// import CourseCard from '../components/CourseCard'
import { useRouter } from 'next/router';
import { api } from "~/utils/api";


export default function Id() {
    const router = useRouter();
    const [id, setId] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");
    
    const {data, isLoading} =  api.courses.getCourse.useQuery({id: id});
    const updateMutation =  api.courses.updateCourse.useMutation()
    const deleteMutation =  api.courses.deleteCourse.useMutation()


    const editCourse = function(){
        setIsEditable(!isEditable);
    }
    
    const updateCourse = function(id:number){
        try {
            updateMutation.mutate({id: id, name: name, description: description})
            router.reload()
        } catch(error){
            console.log(error);
        }
    }
   
    const deleteCourse = async function(id:number){
        try {
            deleteMutation.mutate({id: id})
            await router.push('/')
        } catch(error){
            console.log(error);
        }
    }

    const navigateHome = async function(){
        await router.push('/courses')
    }

    useEffect(()=>{
        setId(Number(router.query.id) || 0)
        setName(String(data?.course?.name));
        setDesciption(String(data?.course?.description));
    },[isLoading, data, isEditable, router.query.id])
    
  return (
    <div className='flex flex-col justify-center items-center h-auto'>
        <div className='text-center text-2xl my-10'>Name: {data?.course?.name}</div>
        <div className='text-center text-2xl my-10'>Description: {data?.course?.description}</div>
        <div className='flex flex-row justify-around w-1/4'>
            <div onClick={()=>editCourse()} className='cursor-pointer text-xl rounded p-2 bg-orange-400'>Update</div>
            <div onClick={()=> void deleteCourse(id)} className='cursor-pointer text-xl rounded p-2 bg-red-500'>Delete</div>
        </div>
        <div onClick={()=> void navigateHome()} className='cursor-pointer text-xl rounded p-2 bg-green-500 mt-10'>Home</div>
        {isEditable && <div className='flex flex-col mt-4 bg-slate-300 p-4 rounded'>
            
            <label htmlFor="name">Name</label>
            <input id='name' type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} className='border-2 border-black rounded my-2'/>
            <label htmlFor="description">Description</label>
            <input id='description' type="text" name='desctiprion' value={description} onChange={(e)=>setDesciption(e.target.value)} className='border-2 border-black rounded my-2'/>
            <div onClick={()=>updateCourse(id)} className='cursor-pointer text-center text-xl rounded p-2 bg-blue-400'>Submit</div>
        </div>}
    </div>
  )
}
