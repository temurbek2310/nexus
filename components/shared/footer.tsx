'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

// Hydration xatolarining oldini olish uchun funksiyalar
const subscribe = () => () => {}
const getClientYear = () => new Date().getFullYear().toString()
const getServerYear = () => ''

const Footer = () => {
	const year = useSyncExternalStore(subscribe, getClientYear, getServerYear)

	return (
		<footer className='border-t border-gray-200 bg-white pt-12 pb-8'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
					{/* Brend haqida */}
					<div className='col-span-1 md:col-span-2'>
						<Link
							href='/'
							className='font-space-grotesk text-lg font-bold tracking-tight text-black flex items-center gap-2 mb-4'
						>
							<svg
								height='20'
								viewBox='0 0 76 65'
								fill='black'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M37.5274 0L75.0548 65H0L37.5274 0Z' />
							</svg>
							NEXUS
						</Link>
						<p className='font-montserrat text-gray-500 text-sm max-w-sm'>
							Eng zamonaviy texnologiyalar va gadjetlar. Vercel uslubidagi
							tezlik va qulaylik sizning xizmatingizda.
						</p>
					</div>

					{/* Linklar qatorlari */}
					<div className='flex flex-col gap-3 font-montserrat text-sm'>
						<h3 className='font-space-grotesk text-black font-semibold mb-1'>
							Do'kon
						</h3>
						<Link
							href='/catalog'
							className='text-gray-500 hover:text-black transition-colors'
						>
							Katalog
						</Link>
						<Link
							href='#'
							className='text-gray-500 hover:text-black transition-colors'
						>
							Yangi kelganlar
						</Link>
						<Link
							href='/discounts'
							className='text-gray-500 hover:text-black transition-colors'
						>
							Chegirmalar
						</Link>
					</div>

					<div className='flex flex-col gap-3 font-montserrat text-sm'>
						<h3 className='font-space-grotesk text-black font-semibold mb-1'>
							Yordam
						</h3>
						<Link
							href='/faq'
							className='text-gray-500 hover:text-black transition-colors'
						>
							FAQ
						</Link>
						<Link
							href='/shipping'
							className='text-gray-500 hover:text-black transition-colors'
						>
							Yetkazib berish
						</Link>
						<Link
							href='/contact'
							className='text-gray-500 hover:text-black transition-colors'
						>
							Aloqa
						</Link>
					</div>
				</div>

				{/* Pastki qism */}
				<div className='flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 font-montserrat text-sm text-gray-500'>
					<p>© {year} NEXUS Inc. Barcha huquqlar himoyalangan.</p>
					<div className='flex gap-6 mt-4 md:mt-0'>
						<Link
							href={'/privacy'}
							className='hover:text-black transition-colors'
						>
							Maxfiylik siyosati
						</Link>
						<Link
							href={'/terms'}
							className='hover:text-black transition-colors'
						>
							Shartlar
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
