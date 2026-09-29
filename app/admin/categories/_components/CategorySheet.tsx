'use client'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import {
	createCategory,
	ICategory,
	updateCategory,
} from '@/lib/actions/category.actions'
import { UploadButton } from '@/lib/uploadthing'
import { ImagePlus, Loader2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface CategorySheetProps {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	initialData?: ICategory | null
}

export default function CategorySheet({
	isOpen,
	setIsOpen,
	initialData,
}: CategorySheetProps) {
	const isEditing = !!initialData
	const [isLoading, setIsLoading] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Forma statelari
	const [title, setTitle] = useState('')
	const [slug, setSlug] = useState('')
	const [image, setImage] = useState<string | null>(null)
	const [description, setDescription] = useState('') // YANGLIK: Description state
	const [status, setStatus] = useState<'Faol' | 'Faol emas'>('Faol')

	// Oyna ochilganda ma'lumotlarni to'ldirish
	useEffect(() => {
		if (isOpen) {
			setError(null)
			if (initialData) {
				setTitle(initialData.title)
				setSlug(initialData.slug)
				setImage(initialData.image)
				setDescription(initialData.description || '') // YANGLIK
				setStatus(initialData.status)
			} else {
				setTitle('')
				setSlug('')
				setImage(null)
				setDescription('') // YANGLIK
				setStatus('Faol')
			}
		}
	}, [isOpen, initialData])

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTitle = e.target.value
		setTitle(newTitle)

		if (!isEditing) {
			const generatedSlug = newTitle
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)+/g, '')
			setSlug(generatedSlug)
		}
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		const payload = { title, slug, image, description, status } // YANGLIK: Payloadga qo'shildi

		try {
			if (isEditing && initialData) {
				await updateCategory(initialData._id, payload)
			} else {
				await createCategory(payload)
			}
			setIsOpen(false)
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'Xatolik yuz berdi')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent className='w-full sm:max-w-xl! font-montserrat border-l border-gray-200 bg-white p-0 flex flex-col h-full'>
				<SheetHeader className='p-6 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10'>
					<SheetTitle className='font-space-grotesk text-2xl font-bold text-gray-900'>
						{isEditing ? 'Kategoriyani tahrirlash' : 'Yangi kategoriya'}
					</SheetTitle>
					<SheetDescription className='text-sm text-gray-500 font-medium'>
						{isEditing
							? "Kategoriya ma'lumotlarini o'zgartiring."
							: "Mahsulotlar uchun yangi bo'lim yarating."}
					</SheetDescription>
				</SheetHeader>

				<div className='flex-1 overflow-y-auto px-6 py-8 custom-scrollbar'>
					<form
						id='category-form'
						onSubmit={onSubmit}
						className='flex flex-col space-y-8'
					>
						{error && (
							<div className='bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold border border-red-100'>
								{error}
							</div>
						)}

						{/* 1. RASM YUKLASH (UploadThing) */}
						<div className='flex flex-col space-y-3'>
							<label className='text-sm font-semibold text-gray-700'>
								Kategoriya rasmi
							</label>

							<div className='flex items-center gap-6'>
								{image ? (
									<div className='relative w-32 h-32 rounded-2xl border border-gray-200 overflow-hidden group shadow-sm'>
										<img
											src={image}
											alt='Category preview'
											className='w-full h-full object-cover'
										/>
										<button
											type='button'
											onClick={() => setImage(null)}
											className='absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50 cursor-pointer'
										>
											<X className='w-4 h-4' />
										</button>
									</div>
								) : (
									<div
										className={`relative w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden transition-all ${
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
												endpoint='categoryImage'
												onUploadBegin={() => setIsUploading(true)}
												onClientUploadComplete={res => {
													setIsUploading(false)
													if (res && res[0]) {
														setImage(res[0].ufsUrl || res[0].url)
													}
												}}
												onUploadError={(error: Error) => {
													setIsUploading(false)
													alert(`Yuklashda xatolik: ${error.message}`)
												}}
												appearance={{
													container: 'w-full h-full m-0 p-0 absolute inset-0',
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

								<div className='flex-1 text-xs text-gray-500 font-medium'>
									Rasm formati: JPG, PNG, WEBP.
									<br />
									Kvadrat (1:1) o'lcham tavsiya etiladi.
									<br />
									Maksimal hajm: 4MB.
								</div>
							</div>
						</div>

						{/* 2. MA'LUMOTLAR */}
						<div className='flex flex-col space-y-5'>
							<div className='flex flex-col gap-1.5'>
								<label className='text-sm font-semibold text-gray-700'>
									Nomi (Title)
								</label>
								<input
									required
									value={title}
									onChange={handleTitleChange}
									type='text'
									placeholder='Masalan: Noutbuklar'
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm'
								/>
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className='text-sm font-semibold text-gray-700'>
									Manzil (Slug)
								</label>
								<div className='relative'>
									<span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-mono'>
										/
									</span>
									<input
										required
										value={slug}
										onChange={e => setSlug(e.target.value)}
										type='text'
										placeholder='noutbuklar'
										className='w-full rounded-xl border border-gray-200 py-3 pl-6 pr-3 text-sm font-mono outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm'
									/>
								</div>
								<span className='text-[11px] text-gray-400 font-medium ml-1'>
									Veb-saytda ko'rinadigan qisqa havola nomi.
								</span>
							</div>

							{/* YANGLIK: Tavsif (Description) inputi */}
							<div className='flex flex-col gap-1.5'>
								<label className='text-sm font-semibold text-gray-700'>
									Tavsif (Description)
								</label>
								<textarea
									value={description}
									onChange={e => setDescription(e.target.value)}
									rows={3}
									placeholder="Kategoriya haqida qisqacha ma'lumot..."
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm resize-none custom-scrollbar'
								></textarea>
							</div>

							<div className='flex flex-col gap-1.5 mt-2'>
								<label className='text-sm font-semibold text-gray-700'>
									Holati
								</label>
								<select
									value={status}
									onChange={e =>
										setStatus(e.target.value as 'Faol' | 'Faol emas')
									}
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm bg-white cursor-pointer'
								>
									<option value='Faol'>Faol (Saytda ko'rinadi)</option>
									<option value='Faol emas'>Faol emas (Yashirin)</option>
								</select>
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
						form='category-form'
						disabled={isLoading || isUploading}
						className='px-6 py-2.5 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 cursor-pointer'
					>
						{isLoading
							? 'Saqlanmoqda...'
							: isEditing
								? "O'zgarishlarni saqlash"
								: 'Kategoriya yaratish'}
					</button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
