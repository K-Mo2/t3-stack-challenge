import React, { ReactNode, useEffect, useState } from 'react'
import { api } from "~/utils/api";
import CourseCard from "../components/CourseCard";
import { useRouter } from 'next/router';


interface Course {
    id: number,
    name: string,
    description: string,
}

export default function Index() {
    const router = useRouter();
    const {data, isLoading} =  api.courses.getCourses.useQuery();
    const createMutation =  api.courses.createCourse.useMutation();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDesciption] = useState("");

    const createCourse = function(name:string, description:string){
        const res = createMutation.mutate({name: name, description:description});
        router.reload();
    }
    
    useEffect(()=>{
        console.log(data, isLoading);
    },[isLoading, data])

    return (
    <div className='h-full w-full'>
    <div className='w-full h-10 text-center my-10 underline text-3xl'><h1 className='text-center'>Courses</h1></div>
    <div className='flex w-full justify-center items-center h-10  text-center mt-1 text-xl'><div onClick={()=>setShowModal(!showModal)} className='text-center cursor-pointer bg-orange-300 p-2 rounded'>Create Course</div></div>
    {showModal &&  <div className='flex flex-col w-full justify-center items-center mt-4'>
            <div className='bg-slate-300 flex flex-col p-4 rounded'>
                <label htmlFor="name">Name</label>
                <input id='name' type="text" name='name' onChange={(e)=>setName(e.target.value)} className='border-2 border-black rounded my-2'/>
                <label htmlFor="description">Description</label>
                <input id='description' type="text" name='desctiprion' onChange={(e)=>setDesciption(e.target.value)} className='border-2 border-black rounded my-2'/>
                <div onClick={()=>createCourse(name, description)} className='cursor-pointer text-center text-xl rounded p-2 bg-blue-400'>Submit</div>
            </div>
        </div>}
    <div className='flex flex-row justify-around w-full h-auto p-4'>
    {data?.courses?.map((el)=>{
        return <CourseCard key={el.id} id={el.id} name={el.name} description={el.description}></CourseCard>   
    })}
    </div>
    </div>
  )
}
