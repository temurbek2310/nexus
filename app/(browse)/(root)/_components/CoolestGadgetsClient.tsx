'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/useCartStore'
import { ArrowRight, Check, Plus, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export interface Gadget {
	id: string
	brand: string
	name: string
	price: string
	oldPrice?: string | null // <--- SHU QATOR QO'SHILADI
	image: string
}

interface CoolestGadgetsClientProps {
	gadgets: Gadget[]
}

const getGridStyles = (index: number) => {
	if (index === 0)
		return 'md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[400px] lg:min-h-[600px]'
	if (index === 5 || index === 6)
		return 'md:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[300px]'
	return 'col-span-1 row-span-1 min-h-[300px]'
}

export default function CoolestGadgetsClient({
	gadgets,
}: CoolestGadgetsClientProps) {
	const addItem = useCartStore(state => state.addItem)
	const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})

	const handleAddToCart = (e: React.MouseEvent, gadget: Gadget) => {
		e.preventDefault()
		e.stopPropagation()

		addItem({
			id: gadget.id,
			brand: gadget.brand,
			name: gadget.name,
			price: Number(gadget.price),
			// ASOSIY YECHIM: oldPrice ni ham qo'shamiz
			oldPrice: gadget.oldPrice ? Number(gadget.oldPrice) : undefined,
			image: gadget.image,
			quantity: 1,
		})

		setAddedItems(prev => ({ ...prev, [gadget.id]: true }))
		setTimeout(() => {
			setAddedItems(prev => ({ ...prev, [gadget.id]: false }))
		}, 2000)
	}

	if (!gadgets || gadgets.length === 0) return null

	return (
		<section className='py-24 bg-white border-b border-gray-200 overflow-hidden'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* Sarlavha qismi */}
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6'>
					<div>
						<Badge
							variant='outline'
							className='mb-4 bg-gray-50 border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1 px-3 flex items-center gap-2 w-max'
						>
							<Sparkles className='size-3' /> Innovatsion Gadjetlar
						</Badge>
						<h2 className='font-space-grotesk text-3xl md:text-4xl font-bold tracking-tight text-black'>
							Eng zo'r texnologiyalar
						</h2>
						<p className='font-montserrat text-gray-500 mt-3 max-w-md text-sm text-balance'>
							Kundalik hayotingizni osonlashtiruvchi va ilhomlantiruvchi aqlli
							qurilmalar.
						</p>
					</div>

					<Button
						asChild
						variant='ghost'
						className='group font-montserrat text-sm font-medium text-black hover:bg-transparent px-0'
					>
						<Link href='/browse?category=gadgets'>
							Barcha gadjetlar{' '}
							<ArrowRight className='size-4 ml-2 group-hover:translate-x-1' />
						</Link>
					</Button>
				</div>

				{/* Bento Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr'>
					{gadgets.map((gadget, index) => {
						const isHero = index === 0
						const isWide = index === 5 || index === 6
						const isAdded = addedItems[gadget.id]

						return (
							<Link
								href={`/shop/${gadget.id}`}
								key={gadget.id}
								className={cn(
									'group relative flex flex-col rounded-3xl bg-gray-50/50 hover:bg-gray-50 border border-gray-200 overflow-hidden transition-colors duration-300',
									getGridStyles(index),
								)}
							>
								{isHero && (
									<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none'></div>
								)}

								<div
									className={cn(
										'absolute z-20 flex flex-col pointer-events-none',
										isWide
											? 'top-0 right-0 h-full w-1/2 p-6 md:p-8 justify-center items-start'
											: 'top-0 left-0 w-full p-6 md:p-8',
									)}
								>
									<span className='font-space-grotesk text-[10px] md:text-xs font-bold tracking-widest text-gray-400 uppercase mb-1'>
										{gadget.brand}
									</span>
									<h3
										className={cn(
											'font-space-grotesk font-bold text-gray-900 leading-tight mb-2 text-balance',
											isHero ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl',
										)}
									>
										{gadget.name}
									</h3>
									<span className='font-montserrat font-medium text-black bg-white/80 backdrop-blur-sm border border-gray-200 px-3 py-1 rounded-full w-max text-sm'>
										${gadget.price}
									</span>
								</div>

								<div
									className={cn(
										'relative flex-1 w-full flex items-center justify-center p-8 z-10 pointer-events-none',
										isWide ? 'w-1/2 mr-auto' : 'mt-20',
									)}
								>
									{gadget.image && (
										<Image
											src={gadget.image}
											alt={gadget.name}
											fill
											className={cn(
												'object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700 ease-out',
												isHero ? 'p-12 md:p-24' : 'p-6 md:p-10',
											)}
											sizes='(max-width: 768px) 100vw, 50vw'
										/>
									)}
								</div>

								<div className='absolute bottom-6 right-6 z-30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
									<Button
										onClick={e => handleAddToCart(e, gadget)}
										size='icon'
										className={cn(
											'size-12 rounded-full shadow-lg transition-colors',
											isAdded
												? 'bg-green-500 hover:bg-green-600 text-white'
												: 'bg-black text-white hover:bg-gray-800',
										)}
									>
										{isAdded ? (
											<Check className='size-5 animate-in zoom-in' />
										) : (
											<Plus className='size-5' />
										)}
									</Button>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		</section>
	)
}
