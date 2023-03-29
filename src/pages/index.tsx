import { type NextPage } from "next";
import Head from "next/head";
// import Link from "next/link";

// import { api } from "~/utils/api";
// import CourseCard from "./components/CourseCard";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  

  useEffect(() => {
    try {
      const redirectToCourses = async()=> await router.push('/courses');
      void redirectToCourses();
    } catch (error) {
      console.log(error);
    }
  
  }, [])
  
  return (
    <>
      <Head>
        <title>Courses    </title>
        <meta name="description" content="Courses" />
      </Head>
      
    </>
  );
};

export default Home;


