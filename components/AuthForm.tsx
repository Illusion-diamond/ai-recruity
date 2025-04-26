"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import FormField from "@/components/FormField"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/Firebase/client"
import { signIn, signUp } from "@/lib/actions/aut.action"

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name:type==='sign-up' ? z.string().min(3): z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })
}

const AuthForm = ({type}: {type:FormType}) => {
  const formSchema = AuthFormSchema(type)
  const router=useRouter()
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
   try{
      if(type==='sign-up'){
        const {name, email, password} = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })

        if(!result?.success){
          toast.error(result?.message)
          return
        }
        toast.success("Account created successfully")
        router.push('/sign-in')
        console.log('SIGN UP', values)
      }
      else{
        const {email, password} = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();

        if(!idToken){
          toast.error("There was an error signing in")
          return;
        }

        await signIn({
          email,
          idToken
        })

        toast.success("Sign in successfully")
        router.push('/')
        console.log('sign-in', values)
      }
   }catch(error){
    console.log(error)
    toast.error("sign in successfully")
   }
  }
const isSigIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justifu-center ">
                <img src="/logo.svg" alt="logo" height={32} width={38} />
                <h2 className="text-primary-100">Recrutie</h2>
            </div>
          <h3 > Practice Job Interview </h3>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 mt-4 form">
                {!isSigIn && (
                  <FormField
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Your Name"
                  />
                  
                )}

                <FormField
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Your Email"
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Your Password"
                    type="password"
                  />
                <Button type="submit" className="btn">{ isSigIn ? 'Sign In' : 'Create an Account'}</Button>
            </form>
        </Form>
        <p className="text-center">
            {isSigIn ? 'No account yet ? ' : 'Already have an account? '}
            <Link href={!isSigIn ? '/sign-in' : '/sign-up'} className="text-user-primary ml-1 font-bold">{!isSigIn ? "Sign in": "Sign up"}</Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm