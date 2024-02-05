'use client';

import { quizSchema } from '@/schemas/quiz';
import React from 'react'
import { Rabbit, Shell } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {  Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { type z } from 'zod';



type Props = {
    mode: "blitz" | "normal" | undefined
  }

type Input = z.infer<typeof quizSchema>;


const QuizCreation = ({ mode: modeParam }: Props) => {
    const router = useRouter();
    const { mutate: getQuestions, isLoading } = useMutation({
        mutationFn: async ({mode, username, profileCharacter }: Input) => {
             const response = await axios.post('/api/game', {
                mode,
                username,
                profileCharacter
             });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return response.data;
        }
    })
    
    const form = useForm<Input>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            mode: modeParam,
            username: 'randomUser',
            profileCharacter: '/characters/beardmonkey.avif'
        }
    })

    function onSubmit(input: Input) {
      getQuestions({
        mode: input.mode,
        username: input.username,
        profileCharacter: input.profileCharacter
      }, {
        onSuccess: ({gameId}) => {
          if (form.getValues('mode') === 'normal') {
            router.push(`/play/normal/${gameId}`)
          } else {
            router.push(`/play/blitz/${gameId}`)
          }
        }
      });
    }

    form.watch()

  return (
<div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
    <Card className='w-[300px]'>
      <CardHeader>
        <CardTitle className='font-bold text-2xl'>Start Quiz</CardTitle>
        <CardDescription>Choose a mode</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField  
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='Username' {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public name
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField  
                    control={form.control}
                    name='profileCharacter'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Chose a character</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select a profile Character to display' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={"/assets/characters/beardmonkey.avif"}>
                                        <div className='flex items-center space-x-2'>   
                                        <Image src='/assets/characters/beardmonkey.avif' width={50} height={50} className='rounded-full' alt='' />
                                            <span>Beard Monkey</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value={"/assets/characters/gunmonkey.avif"}>
                                        <div className='flex items-center space-x-2'>
                                        <Image src='/assets/characters/gunmonkey.avif' width={50} height={50} className='rounded-full' alt='' />
                                            <span>Gun Monkey</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value={"/assets/characters/piratemonkey.avif"}>
                                        <div className='flex items-center space-x-2'>
                                        <Image src='/assets/characters/piratemonkey.avif' width={50} height={50} className='rounded-full' alt='' />
                                            <span>Pirate Monkey</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value={"/assets/characters/presidentmonkey.avif"}>
                                        <div className='flex items-center space-x-2'>
                                        <Image src='/assets/characters/presidentmonkey.avif' width={50} height={50} className='rounded-full' alt='' />
                                            <span>President Monkey</span>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value={"/assets/characters/scaredmonkey.avif"}>
                                        <div className='flex items-center space-x-2'>
                                        <Image src='/assets/characters/scaredmonkey.avif' width={50} height={50} className='rounded-full' alt='' /> 
                                            <span>Scared Monkey</span>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                             </Select>
                        </FormItem>
                    )}
                />
                <div className='flex justify-between'>
                    <Button
                      onClick={
                        () => {
                            form.setValue('mode', 'normal')
                        }
                    } 
                        className='w-1/2 rounded-none rounded-l-lg'
                        variant={
                            form.getValues('mode') === 'normal' ? 'default' : 'secondary'
                        }
                    >
                        <Shell className='w-4 h-4 mr-2' /> Normal
                    </Button>
                    <Separator orientation='vertical' />
                    <Button
                    onClick={
                        () => {
                            form.setValue('mode', 'blitz')
                        }
                    } 
                        className='w-1/2 rounded-none rounded-r-lg'
                        variant={
                            form.getValues('mode') === 'blitz' ? 'default' : 'secondary'
                        }
                    >
                        <Rabbit className='w-4 h-4 mr-2' /> Blitz
                    </Button>
                </div>
                <Button disabled={isLoading} type='submit'>Submit</Button>
            </form>  
        </Form>
      </CardContent>
    </Card>
</div>
  )
}


export default QuizCreation 