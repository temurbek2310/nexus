'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
	ArrowLeft,
	Battery,
	Camera,
	Check,
	Cpu,
	CreditCard,
	Minus,
	Monitor,
	Plus,
	Radio,
	Settings,
	ShieldCheck,
	ShoppingCart,
	Truck,
	Weight,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useCartStore } from '@/store/useCartStore'

// Ma'lumotlar bazasidan keladigan xususiyatlarga mos ikonka tanlash funksiyasi
const getSpecIcon = (key: string) => {
	const k = key.toLowerCase()
	if (k.includes('kamera') || k.includes('camera') || k.includes('obyektiv'))
		return Camera
	if (k.includes('batareya') || k.includes('parvoz') || k.includes('quvvat'))
		return Battery
	if (k.includes('masofa') || k.includes('aloqa') || k.includes('uzatish'))
		return Radio
	if (k.includes("og'irlik") || k.includes('vazn') || k.includes('weight'))
		return Weight
	if (k.includes('ekran') || k.includes('display') || k.includes('kadr'))
		return Monitor
	if (k.includes('protsessor') || k.includes('chip') || k.includes('xotira'))
		return Cpu
	return Settings // Hech qaysiga tushmasa, standart sozlamalar ikonkasini beradi
}

export interface ProductDetails {
	id: string
	brand: string
	name: string
	description: string
	price: number
	oldPrice: number | null
	category: string
	images: string[]
	specs: { key: string; value: string }[]
}

interface ProductDetailsClientProps {
	product: ProductDetails
}

export default function ProductDetailsClient({
	product,
}: ProductDetailsClientProps) {
	const [activeImage, setActiveImage] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [isAdded, setIsAdded] = useState(false)

	const addItem = useCartStore(state => state.addItem)

	let discountPercent = 0
	if (product.oldPrice && product.oldPrice > product.price) {
		discountPercent = Math.round(
			((product.oldPrice - product.price) / product.oldPrice) * 100,
		)
	}

	const handleAddToCart = () => {
		addItem({
			id: product.id,
			brand: product.brand,
			name: product.name,
			price: Number(product.price),
			// ASOSIY YECHIM: Savatda tejalgan summani hisoblash uchun oldPrice uzatildi
			oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
			image: product.images[0],
			quantity: quantity,
		})

		setIsAdded(true)
		setTimeout(() => setIsAdded(false), 2000)
	}

	return (
		<div className='min-h-screen bg-[#FAFAFA] pt-32 pb-24'>
			<div className='max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12'>
				<Button
					asChild
					variant='ghost'
					className='mb-8 font-montserrat text-gray-500 hover:text-black hover:bg-transparent px-0'
				>
					<Link href='/shop'>
						<ArrowLeft className='w-4 h-4 mr-2' />
						Do'konga qaytish
					</Link>
				</Button>

				<div className='flex flex-col lg:flex-row gap-12 xl:gap-20 items-start'>
					{/* CHAP TOMON: RASMLAR */}
					<div className='w-full lg:w-1/2 lg:sticky lg:top-32 flex flex-col gap-6'>
						<div className='relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden flex items-center justify-center p-12 group'>
							<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>
							<div className='absolute inset-0 bg-gray-100 rounded-full blur-[80px] opacity-50 w-3/4 h-3/4 m-auto pointer-events-none transition-opacity duration-500 group-hover:opacity-80'></div>

							<div className='relative w-full h-full min-h-[200px]'>
								<Image
									src={product.images[activeImage] || '/placeholder.png'}
									alt={product.name}
									fill
									className='object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105'
									sizes='(max-width: 1024px) 100vw, 50vw'
									priority
								/>
							</div>
						</div>

						<div className='flex items-center gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
							{product.images.map((img, idx) => (
								<button
									key={idx}
									onClick={() => setActiveImage(idx)}
									className={cn(
										'relative w-24 h-24 shrink-0 rounded-2xl border-2 overflow-hidden bg-white transition-all duration-300',
										activeImage === idx
											? 'border-black shadow-md'
											: 'border-transparent opacity-60 hover:opacity-100',
									)}
								>
									<Image
										src={img}
										alt={`${product.name} - ${idx + 1}`}
										fill
										className='object-contain p-4'
										sizes='96px'
									/>
								</button>
							))}
						</div>
					</div>

					{/* O'NG TOMON: MA'LUMOTLAR */}
					<div className='w-full lg:w-1/2 flex flex-col'>
						<div className='flex items-center gap-3 mb-6'>
							<span className='font-space-grotesk text-sm font-bold tracking-widest text-gray-400 uppercase'>
								{product.brand}
							</span>
							<span className='w-1.5 h-1.5 rounded-full bg-gray-300'></span>
							<span className='font-montserrat text-sm font-medium text-gray-500'>
								{product.category}
							</span>
						</div>

						<h1 className='font-space-grotesk text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black mb-6'>
							{product.name}
						</h1>

						<div className='flex items-end gap-4 mb-8'>
							<span className='font-space-grotesk text-3xl sm:text-4xl md:text-5xl font-bold text-black'>
								${product.price}
							</span>
							{product.oldPrice && (
								<span className='font-montserrat text-xl text-gray-400 line-through mb-1.5'>
									${product.oldPrice}
								</span>
							)}
							{discountPercent > 0 && (
								<Badge className='bg-red-500 hover:bg-red-600 text-white font-montserrat px-3 py-1 rounded-full text-sm font-bold mb-2 shadow-sm shadow-red-500/20'>
									-{discountPercent}%
								</Badge>
							)}
						</div>

						<p className='font-montserrat text-gray-600 text-base md:text-lg leading-relaxed mb-10 text-balance'>
							{product.description}
						</p>

						<div className='grid grid-cols-2 gap-4 mb-10'>
							{product.specs.map((spec, idx) => {
								const Icon = getSpecIcon(spec.key) // Ikonkani aqlli tanlash funksiyasi
								return (
									<div
										key={idx}
										className='flex flex-col gap-1 p-5 rounded-2xl bg-white border border-gray-200'
									>
										<Icon className='w-5 h-5 text-gray-400 mb-2' />
										<span className='font-montserrat text-xs text-gray-500 uppercase tracking-wider font-semibold line-clamp-1'>
											{spec.key}
										</span>
										<span className='font-space-grotesk text-base font-bold text-black line-clamp-1'>
											{spec.value}
										</span>
									</div>
								)
							})}
						</div>

						<div className='w-full h-px bg-gray-200 mb-10'></div>

						{/* XARID QISMI */}
						<div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 w-full'>
							<div className='flex items-center justify-between w-full sm:w-36 h-12 sm:h-14 bg-white border border-gray-200 rounded-2xl px-2 shrink-0'>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
									className='h-10 w-10 rounded-xl hover:bg-gray-100 shrink-0'
								>
									<Minus className='w-4 h-4' />
								</Button>
								<span className='font-space-grotesk font-bold text-lg w-8 text-center select-none'>
									{quantity}
								</span>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => setQuantity(quantity + 1)}
									className='h-10 w-10 rounded-xl hover:bg-gray-100 shrink-0'
								>
									<Plus className='w-4 h-4' />
								</Button>
							</div>

							<Button
								onClick={handleAddToCart}
								className={cn(
									'flex-1 w-full h-14 rounded-2xl font-montserrat text-base font-semibold transition-all duration-300 shadow-xl group',
									isAdded
										? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20'
										: 'bg-black text-white hover:bg-gray-800 shadow-black/10',
								)}
							>
								{isAdded ? (
									<>
										<Check className='w-5 h-5 mr-3 animate-in zoom-in' />
										Qo'shildi
									</>
								) : (
									<>
										<ShoppingCart className='w-5 h-5 mr-3 transition-transform duration-300 group-hover:-rotate-12' />
										Savatga qo'shish
									</>
								)}
							</Button>
						</div>

						<Button
							variant='outline'
							className='w-full h-14 bg-white border-2 border-black text-black hover:bg-gray-50 rounded-2xl font-montserrat text-base font-bold transition-all mb-10'
						>
							<CreditCard className='w-5 h-5 mr-3' />
							Hozir xarid qilish
						</Button>

						<div className='flex flex-col gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100'>
							<div className='flex items-center gap-4'>
								<Truck className='w-5 h-5 text-gray-500' />
								<div className='flex flex-col'>
									<span className='font-space-grotesk text-sm font-bold text-black'>
										Yetkazib berish bepul
									</span>
									<span className='font-montserrat text-xs text-gray-500'>
										Barcha viloyatlarga 1-3 kun ichida
									</span>
								</div>
							</div>
							<div className='w-full h-px bg-gray-200'></div>
							<div className='flex items-center gap-4'>
								<ShieldCheck className='w-5 h-5 text-gray-500' />
								<div className='flex flex-col'>
									<span className='font-space-grotesk text-sm font-bold text-black'>
										1 yillik rasmiy kafolat
									</span>
									<span className='font-montserrat text-xs text-gray-500'>
										Nosozliklar bepul ta'mirlab beriladi
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
