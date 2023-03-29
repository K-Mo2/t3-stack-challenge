import { prisma } from './../../db';
import { z } from "zod";


import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const coursesRouter = createTRPCRouter({
  getCourses: publicProcedure
    .query(async({ctx}) => {
        try {
            return {
                courses: await ctx.prisma.course.findMany()
            }
        } catch (error) {
            return {
                sucessful: false,
                error: error
            }
        }
    }),
    
    getCourse: publicProcedure
    .input(z.object({id: z.number()}))
    .query(async({ctx, input})=>{
        try {
            return {
                course: await ctx.prisma.course.findUnique({
                    where:{
                        id: input.id
                    }
                })
            }
        } catch (error) {
            return {
                sucessful: false,
                error: error
            }
        }
    }),
    
    createCourse: publicProcedure
    .input(z.object({ name:z.string(), description:z.string()}))
    .mutation(async({ctx, input})=>{
        try {
            await ctx.prisma.course.create({
                data:{
                    name: input.name,
                    description: input.description
                }
            })
    
            return {
                sucessful: true
            }
        } catch (error) {
            return {
                sucessful: false,
                error: error
            }
        }
    }),
    
    updateCourse: publicProcedure
    .input(z.object({id: z.number(), name:z.string(), description:z.string()}))
    .mutation(async({ctx, input})=>{
        try {
            await ctx.prisma.course.update({
                where:{
                    id: input.id
                },
                data:{
                    name: input.name,
                    description: input.description
                }
            })
    
            return {
                sucessful: true
            }
        } catch (error) {
            return {
                sucessful: false,
                error: error
            }
        }
    }),
    
    deleteCourse: publicProcedure
    .input(z.object({id: z.number()}))
    .mutation(async({ctx, input})=>{
        try {
            await ctx.prisma.course.delete({
                where:{
                    id: input.id
                }
            })
    
            return {
                sucessful: true
            }
        } catch (error) {
            return {
                sucessful: false,
                error: error
            }
        }
    }),

});
