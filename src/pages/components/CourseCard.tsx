import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

interface Course {
    id: number,
    name: string,
    description: string,
}

export default function CourseCard(props:Course) {
    const router = useRouter();
    
  return (
    
    <div onClick={()=>router.push(`courses/${props.id}`)} className='flex bg-purple-300 flex-col justify-around items-center shadow-md w-2/12 mx-4 rounded h-1/4 cursor-pointer'>
        <div className='text-black rounded text-center w-8/12 p-4 mx-4 my-3'>Name: {props.name}</div>
        <div className='text-black rounded text-center w-8/12 p-4 mx-4 my-3'>Description: {props.description}</div>
    </div>
  )
}
