'use client'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/input/Input'
import Link from 'next/link'
import {signIn} from 'next-auth/react'

interface InitialStateProps {
    email: string,
    password: string 
}

const initialState: InitialStateProps = {
    email: '',
    password: ''
}


export default function Login() {

    const [state,setState] = useState(initialState);
    const router = useRouter();

    const onSubmit = (event:FormEvent) => {
      event.preventDefault()

      signIn('credentials', {
         ...state,
         redirect:false,
      })
      .then((callback) => {
 
         if(callback?.ok) {
             router.refresh()
         }
 
         if(callback?.error) {
             throw new Error('Wrong Credentials')
         }
      })
      router.push('/')
    }

    function handleChange(e:any) {
        setState({...state, [e.target.name]: e.target.value});
    }

  return (
    <form onSubmit={onSubmit} className='text-center'>
        <div 
            className='
                flex 
                flex-col 
                justify-center 
                h-[450px] 
                w-[350px]
                mx-auto
                gap-2
        '>
            <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email}/>
            <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password}/>
            <button type='submit'>Submit</button>
        </div>
        <div>
            <div>
                Haven&apos;t you got an account? <Link href='/register'>Register</Link>
            </div>
        </div>
    </form>
  )
}
