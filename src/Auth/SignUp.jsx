import React from 'react'
import { Input } from '../components/Input'
import Button from '../components/Button'

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
    <div className="ml-1">
        <img className='' src="./src/assets/logo.png" alt="" />
    </div>
    <div className="flex flex-col items-center justify-center">
        <p className='text-lg font-semibold mb-8 hover:text-yellow-600 hover:underline cursor-pointer'>Hey there! Sign up to continue</p>

        <Input type={'text'} placeholder={'Name'} />
        <Input type={'email'} placeholder={'Email'} />
        <Input type={'password'} placeholder={'set a password'} />
        <p className='mt-4 hover:text-yellow-600'><span><a href="#">Already have an account?</a></span></p>
        <Button className='mt-10'>Login</Button>
    </div>
</div>
  )
}

export default SignUp