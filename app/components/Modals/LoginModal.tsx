'use client'

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../container/Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../container/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import Lago from '../navbar/Lago';

const LoginModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged In');
                router.refresh();
                LoginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(() => {
        LoginModal.onClose();
        registerModal.onOpen();
    }, [LoginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            {/* <Heading
                title='Welcome back'
                subtitle='Login to your account'
                // center
            /> */}
            <p className=''>Sign In</p>
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                error={errors}
                required
            />
            <p className='text-[12px]'>By continuing, you agree to Lee-yan smart properties <Link href="/" className='text-blue-600'>Conditions of Use</Link> and <Link href="/" className='text-blue-600'>Privacy Notice.</Link></p>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-0'>
            <hr />
            <div className='google-btn'>
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
                />
            </div>
            <div className='text-normal-500 text-center mt-1 font-light'>
                <div className='items-center gap-2'>
                    <div className='flex mb-3 gap-2 justify-center items-center'>
                        <div className='w-[90px] h-[3px]'><hr /></div>
                        <div><p className='text-sm text-neutral-600'>New to Lee-yan smart properties?</p></div>
                        <div  className='w-[90px] h-[3px]'><hr /></div>
                    </div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 justify-center hover:bg-neutral-100 border-[0.8px] border-solid border-neutral-400 rounded-xl px-5 py-[6px] text-sm hover:shadow-md cursor-pointer hover:underline'>
                        Create your Lee-yan smart properties account
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal
          disabled={isLoading}  
          isOpen={LoginModal.isOpen} 
          title={<Lago />}
          actionLabel='Submit'
          onClose={LoginModal.onClose}
          onSubmit={handleSubmit(onSubmit)} 
          body={bodyContent}
          footer={footerContent}
    />
  )
}

export default LoginModal