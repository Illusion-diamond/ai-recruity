import {ReactNode} from 'react'
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/actions/aut.action'
const AuthLayout = async ({children}:{children: ReactNode}) => {
  const isAuthenticatedUser = await isAuthenticated()
  if(isAuthenticatedUser)redirect('/') 


  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

export default AuthLayout
