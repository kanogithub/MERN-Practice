import '@/assets/styles/global.css'
import { getProviders, signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/utils/authOptions'
import Link from 'next/link'
import Image from 'next/image'
import { FaGoogle } from 'react-icons/fa'
import logo from '@/assets/images/logo-white.png'

export default function SignIn({ providers }) {
  const icons = {
    'Google': <FaGoogle className='inline mr-2 mb-0.5' />
  }

	return (
		<main className='h-screen flex'>
			<section className='m-auto max-w-lg my-10 px-6 content-center'>
        <div className='px-20 py-10 bg-gray-100 rounded-xl shadow-md'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className='my-4'>
              <button onClick={() => signIn(provider.id)} className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'>
                {icons[provider.name]} Sign in with {provider.name}
              </button>
            </div>
          ))}

          <div className='my-4'>
            <Link href='/' className='block bg-blue-600 text-white text-center py-4 px-6 rounded-xl hover:bg-blue-500'>
              <Image src={logo} alt='Logo' className='h-5 mr-4 mb-0.5 w-auto inline' />Back to Home
            </Link>
          </div>
        </div>
			</section>
		</main>
	)
}

export async function getServerSideProps(context) {
	const session = await getServerSession(context.req, context.res, authOptions)

	// If the user is already logged in, redirect.
	// Note: Make sure not to redirect to the same page
	// To avoid an infinite loop!
	if (session) {
    const callbackUrl = context.query.callbackUrl

		return { redirect: { destination: callbackUrl || '/' } }
	}

	const providers = await getProviders()

	return {
		props: { providers: providers ?? [] },
	}
}
