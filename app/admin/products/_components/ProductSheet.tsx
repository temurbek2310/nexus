'use client'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { ICategory } from '@/lib/actions/category.actions'
import {
	createProduct,
	IProduct,
	updateProduct,
} from '@/lib/actions/product.actions'
import { UploadButton } from '@/lib/uploadthing'
import { ImagePlus, Loader2, Plus, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface ProductSheetProps {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	initialData?: IProduct | null
	categories: ICategory[]
}

export default function ProductSheet({
	isOpen,
	setIsOpen,
	initialData,
	categories,
}: ProductSheetProps) {
	const isEditing = !!initialData
	const [isLoading, setIsLoading] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Forma statelari
	const [title, setTitle] = useState('')
	const [category, setCategory] = useState('')
	const [price, setPrice] = useState<number | ''>('')
	const [discountPrice, setDiscountPrice] = useState<number | ''>('')
	const [stock, setStock] = useState<number | ''>('')
	const [description, setDescription] = useState('')
	const [status, setStatus] = useState<'Faol' | 'Qolmagan' | 'Qoralama'>('Faol')

	const [specs, setSpecs] = useState<{ key: string; value: string }[]>([])
	const [images, setImages] = useState<string[]>([])

	useEffect(() => {
		if (isOpen) {
			setError(null)
			if (initialData) {
				setTitle(initialData.title)
				setCategory(initialData.category)
				setPrice(initialData.price)
				setDiscountPrice(initialData.discountPrice || '')
				setStock(initialData.stock !== undefined ? initialData.stock : '')
				setDescription(initialData.description)
				setSpecs(initialData.specs || [])
				setImages(initialData.images || [])
				setStatus(initialData.status)
			} else {
				setTitle('')
				setCategory('')
				setPrice('')
				setDiscountPrice('')
				setStock('')
				setDescription('')
				setSpecs([{ key: '', value: '' }])
				setImages([])
				setStatus('Faol')
			}
		}
	}, [isOpen, initialData])

	const handleAddSpec = () => setSpecs([...specs, { key: '', value: '' }])
	const handleRemoveSpec = (index: number) =>
		setSpecs(specs.filter((_, i) => i !== index))
	const handleSpecChange = (
		index: number,
		field: 'key' | 'value',
		val: string,
	) => {
		const newSpecs = [...specs]
		newSpecs[index][field] = val
		setSpecs(newSpecs)
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		if (!category) {
			setError('Iltimos, kategoriyani tanlang!')
			setIsLoading(false)
			return
		}

		const cleanedSpecs = specs.filter(
			s => s.key.trim() !== '' && s.value.trim() !== '',
		)

		const payload = {
			title,
			category,
			price: Number(price),
			discountPrice: discountPrice ? Number(discountPrice) : null,
			stock: Number(stock),
			description,
			images,
			specs: cleanedSpecs,
			status: Number(stock) === 0 ? 'Qolmagan' : status,
		}

		try {
			if (isEditing && initialData) {
				await updateProduct(initialData._id, payload)
			} else {
				await createProduct(payload)
			}
			setIsOpen(false)
		} catch (err: any) {
			setError(err.message || 'Xatolik yuz berdi')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent className='w-full sm:max-w-2xl! font-montserrat border-l border-gray-200 bg-white p-0 flex flex-col h-full'>
				<SheetHeader className='p-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10'>
					<SheetTitle className='font-space-grotesk text-2xl font-bold text-gray-900'>
						{isEditing ? 'Mahsulotni tahrirlash' : "Yangi mahsulot qo'shish"}
					</SheetTitle>
					<SheetDescription className='text-sm text-gray-500 font-medium'>
						{isEditing
							? "Katalogni yangilash uchun ma'lumotlarni o'zgartiring."
							: "Do'konga yangi mahsulot joylash uchun formani to'ldiring."}
					</SheetDescription>
				</SheetHeader>

				<div className='flex-1 overflow-y-auto px-6 py-8 custom-scrollbar'>
					<form
						id='product-form'
						onSubmit={onSubmit}
						className='flex flex-col space-y-8'
					>
						{error && (
							<div className='bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold border border-red-100'>
								{error}
							</div>
						)}

						{/* 1. ASOSIY MA'LUMOTLAR */}
						<div className='flex flex-col space-y-5'>
							<h3 className='font-space-grotesk text-lg font-bold text-black border-b border-gray-100 pb-2'>
								Asosiy ma'lumotlar
							</h3>

							<div className='flex flex-col gap-1.5'>
								<label className='text-sm font-semibold text-gray-700'>
									Mahsulot nomi
								</label>
								<input
									required
									value={title}
									onChange={e => setTitle(e.target.value)}
									type='text'
									placeholder='Masalan: DJI Mavic 3 Pro'
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm'
								/>
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className='text-sm font-semibold text-gray-700'>
									Kategoriya
								</label>
								<select
									required
									value={category}
									onChange={e => setCategory(e.target.value)}
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm bg-white cursor-pointer'
								>
									<option value='' disabled>
										Kategoriyani tanlang...
									</option>
									{categories.map(cat => (
										<option key={cat._id} value={cat._id}>
											{cat.title}
										</option>
									))}
								</select>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-1.5'>
									<label className='text-sm font-semibold text-gray-700'>
										Asl narx ($)
									</label>
									<input
										required
										value={price}
										onChange={e => setPrice(Number(e.target.value))}
										type='number'
										step='0.01'
										placeholder='2199.00'
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-mono outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm'
									/>
								</div>
								<div className='flex flex-col gap-1.5'>
									<label className='text-sm font-semibold text-gray-700'>
										Chegirmadagi narxi ($)
									</label>
									<input
										value={discountPrice}
										onChange={e => setDiscountPrice(Number(e.target.value))}
										type='number'
										step='0.01'
										placeholder='Ixtiyoriy...'
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-mono outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm placeholder:font-montserrat'
									/>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-1.5 mt-2'>
									<label className='text-sm font-semibold text-gray-700'>
										Ombordagi soni
									</label>
									<input
										required
										value={stock}
										onChange={e => setStock(Number(e.target.value))}
										type='number'
										min='0'
										placeholder='10'
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-mono outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm'
									/>
								</div>
								<div className='flex flex-col gap-1.5 mt-2'>
									<label className='text-sm font-semibold text-gray-700'>
										Holati
									</label>
									<select
										value={Number(stock) === 0 ? 'Qolmagan' : status}
										disabled={Number(stock) === 0}
										onChange={e =>
											setStatus(
												e.target.value as 'Faol' | 'Qolmagan' | 'Qoralama',
											)
										}
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm bg-white cursor-pointer disabled:bg-gray-50 disabled:text-gray-500'
									>
										<option value='Faol'>Faol (Saytda ko'rinadi)</option>
										<option value='Qolmagan'>Qolmagan (Sotuvda yo'q)</option>
										<option value='Qoralama'>Qoralama (Yashirin)</option>
									</select>
								</div>
							</div>

							<div className='flex flex-col gap-1.5 mt-2'>
								<label className='text-sm font-semibold text-gray-700'>
									Tavsif (Description)
								</label>
								<textarea
									required
									value={description}
									onChange={e => setDescription(e.target.value)}
									rows={4}
									placeholder="Mahsulot haqida to'liq ma'lumot..."
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm resize-none custom-scrollbar'
								></textarea>
							</div>
						</div>

						{/* 2. RASMLAR YUKLASH */}
						<div className='flex flex-col space-y-5'>
							<div className='flex items-center justify-between border-b border-gray-100 pb-2'>
								<h3 className='font-space-grotesk text-lg font-bold text-black'>
									Rasmlar
								</h3>
								<span className='text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md'>
									{images.length} / 10
								</span>
							</div>

							<div className='grid grid-cols-4 gap-3'>
								{images.map((img, i) => (
									<div
										key={i}
										className='relative aspect-square rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center group overflow-hidden'
									>
										<img
											src={img}
											alt={`Product ${i + 1}`}
											className='w-full h-full object-cover'
										/>
										<button
											type='button'
											onClick={() =>
												setImages(images.filter((_, idx) => idx !== i))
											}
											className='absolute top-1.5 right-1.5 w-6 h-6 rounded-md bg-white/90 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50 cursor-pointer'
										>
											<X className='w-3.5 h-3.5' />
										</button>
									</div>
								))}

								{/* 100% ISHLAYDIGAN VA CHIROYLI UPLOAD BOX */}
								{images.length < 10 && (
									<div
										className={`relative aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden transition-all group ${
											isUploading
												? 'opacity-50'
												: 'hover:border-black hover:bg-gray-100'
										}`}
									>
										{isUploading ? (
											<div className='flex flex-col items-center justify-center space-y-2 pointer-events-none'>
												<Loader2 className='w-6 h-6 animate-spin text-gray-400' />
											</div>
										) : (
											<UploadButton
												endpoint='productImages'
												onUploadBegin={() => setIsUploading(true)}
												onClientUploadComplete={res => {
													setIsUploading(false)
													if (res && res.length > 0) {
														const newUrls = res.map(r => r.ufsUrl || r.url)
														setImages(prev =>
															[...prev, ...newUrls].slice(0, 10),
														)
													}
												}}
												onUploadError={(error: Error) => {
													setIsUploading(false)
													alert(`Yuklashda xatolik: ${error.message}`)
												}}
												appearance={{
													container: 'w-full h-full m-0 p-0 absolute inset-0',
													// !text-gray-500 ni qo'shdik va hover holatini mosladik
													button:
														'w-full h-full !bg-transparent !text-gray-400 hover:!text-black font-montserrat flex flex-col items-center justify-center gap-1 focus-within:ring-0 after:hidden !m-0 !p-0 border-none outline-none cursor-pointer transition-colors',
													allowedContent: 'hidden',
												}}
												content={{
													button: (
														<div className='flex flex-col items-center justify-center gap-1'>
															<ImagePlus className='w-5 h-5' />
															<span className='text-[10px] font-bold'>
																Yuklash
															</span>
														</div>
													),
												}}
											/>
										)}
									</div>
								)}
							</div>
						</div>

						{/* 3. TEXNIK XUSUSIYATLAR */}
						<div className='flex flex-col space-y-5'>
							<div className='flex items-center justify-between border-b border-gray-100 pb-2'>
								<h3 className='font-space-grotesk text-lg font-bold text-black'>
									Texnik xususiyatlar
								</h3>
							</div>

							<div className='flex flex-col space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100'>
								{specs.map((spec, index) => (
									<div key={index} className='flex items-center gap-3 group'>
										<div className='flex-1 grid grid-cols-2 gap-3'>
											<input
												type='text'
												placeholder='Nomlanishi (Masalan: Kamera)'
												value={spec.key}
												onChange={e =>
													handleSpecChange(index, 'key', e.target.value)
												}
												className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black bg-white shadow-sm'
											/>
											<input
												type='text'
												placeholder='Qiymati (Masalan: 4/3 CMOS)'
												value={spec.value}
												onChange={e =>
													handleSpecChange(index, 'value', e.target.value)
												}
												className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black bg-white shadow-sm'
											/>
										</div>
										<button
											type='button'
											onClick={() => handleRemoveSpec(index)}
											className='w-9 h-9 shrink-0 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 shadow-sm'
										>
											<Trash2 className='w-4 h-4' />
										</button>
									</div>
								))}

								<button
									type='button'
									onClick={handleAddSpec}
									className='mt-2 flex items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-200 py-2.5 text-sm font-bold text-gray-500 hover:border-black hover:text-black transition-all bg-white cursor-pointer'
								>
									<Plus className='w-4 h-4 mr-2' />
									Yangi xususiyat qo'shish
								</button>
							</div>
						</div>
					</form>
				</div>

				<div className='p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 shrink-0'>
					<button
						type='button'
						onClick={() => setIsOpen(false)}
						className='px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm cursor-pointer'
					>
						Bekor qilish
					</button>
					<button
						type='submit'
						form='product-form'
						disabled={isLoading || isUploading}
						className='px-6 py-2.5 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 flex items-center cursor-pointer'
					>
						{isLoading
							? 'Saqlanmoqda...'
							: isEditing
								? "O'zgarishlarni saqlash"
								: 'Mahsulotni yaratish'}
					</button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
