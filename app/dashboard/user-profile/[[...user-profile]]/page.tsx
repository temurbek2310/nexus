'use client'

import { UserProfile } from '@clerk/nextjs'
import { Suspense } from 'react' // 1. Suspense qo'shildi

export default function SettingsPage() {
	return (
		<div className='flex flex-col gap-6 pb-10 pt-4'>
			{/* Sarlavha qismi */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
						Sozlamalar
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Shaxsiy ma'lumotlaringiz, xavfsizlik va akkaunt sozlamalarini
						boshqaring.
					</p>
				</div>
			</div>

			<div className='flex w-full justify-start'>
				{/* 2. UserProfile ni Suspense bilan o'raymiz. Yuklanguncha kulrang skelet (Skeleton) ko'rinib turadi */}
				<Suspense
					fallback={
						<div className='h-[600px] w-full max-w-5xl animate-pulse rounded-xl bg-gray-100/50 border border-gray-100' />
					}
				>
					<UserProfile
						appearance={{
							elements: {
								rootBox: 'w-full max-w-5xl',
								card: 'w-full border border-gray-200 shadow-sm rounded-xl bg-white m-0',
								navbar: 'border-r border-gray-100 bg-gray-50/50',
								navbarButton:
									'text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors',
								activeNavbarButton:
									'bg-white text-black font-medium border border-gray-200 shadow-sm rounded-lg',
								headerTitle:
									'text-lg font-semibold text-gray-900 font-montserrat',
								headerSubtitle: 'text-sm text-gray-500',
								profileSectionTitle:
									'text-sm font-medium text-gray-900 border-b border-gray-100 pb-2',
								profileSectionContent: 'pt-4',
								formButtonPrimary:
									'bg-black text-white hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors shadow-sm',
								formButtonReset:
									'text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm transition-colors',
								profileSectionPrimaryButton:
									'text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium rounded-lg px-3 py-1.5 transition-colors',
								formFieldInput:
									'rounded-lg border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-sm transition-colors',
								formFieldLabel: 'text-sm font-medium text-gray-700',
								badge:
									'bg-gray-100 text-gray-700 border border-gray-200 rounded-md',
								avatarImageActionsUpload:
									'text-black border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm font-medium',
								accordionTriggerButton:
									'text-gray-900 font-medium hover:bg-gray-50 rounded-lg',
							},
						}}
					/>
				</Suspense>
			</div>
		</div>
	)
}
