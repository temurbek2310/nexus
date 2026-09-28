'use client'

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { ImagePlus, Plus, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export interface IProductMock {
	id: string
	title: string
	category: string
	price: number
	discountPrice?: number
	description: string
	status: string
}

interface ProductSheetProps {
	isOpen: boolean
	setIsOpen: (val: boolean) => void
	initialData?: IProductMock | null
}

export default function ProductSheet({
	isOpen,
	setIsOpen,
	initialData,
}: ProductSheetProps) {
	const isEditing = !!initialData
	const [isLoading, setIsLoading] = useState(false)

	// Dinamik texnik xususiyatlar uchun State
	const [specs, setSpecs] = useState<{ key: string; value: string }[]>([])

	// Rasmlar uchun State (Hozircha faqat UI uchun max 10 talik mantiq)
	const [images, setImages] = useState<string[]>([])

	// Oyna ochilganda ma'lumotlarni to'ldirish yoki tozalash
	useEffect(() => {
		if (isOpen) {
			if (isEditing) {
				// Tahrirlash rejimida mock datalarni qo'shamiz
				setSpecs([
					{ key: 'Kamera', value: '4/3 CMOS Hasselblad' },
					{ key: "Og'irlik", value: '895 gramm' },
				])
				setImages(['img1.png', 'img2.png']) // Mock rasmlar
			} else {
				// Yangi qo'shish rejimida tozalash
				setSpecs([{ key: '', value: '' }])
				setImages([])
			}
		}
	}, [isOpen, isEditing])

	// --- Dinamik Xususiyatlar Funksiyalari ---
	const handleAddSpec = () => {
		setSpecs([...specs, { key: '', value: '' }])
	}

	const handleRemoveSpec = (index: number) => {
		setSpecs(specs.filter((_, i) => i !== index))
	}

	const handleSpecChange = (
		index: number,
		field: 'key' | 'value',
		val: string,
	) => {
		const newSpecs = [...specs]
		newSpecs[index][field] = val
		setSpecs(newSpecs)
	}

	// --- Rasm qo'shish simulatsiyasi ---
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFilesCount = e.target.files.length
			if (images.length + newFilesCount > 10) {
				alert('Maksimal 10 ta rasm yuklash mumkin!')
				return
			}
			// UI ko'rinishi uchun fiktiv (mock) rasm URL larini yozamiz
			const newMockImages = Array.from({ length: newFilesCount }).map(
				(_, i) => `new_img_${Date.now()}_${i}.png`,
			)
			setImages([...images, ...newMockImages])
		}
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		// Bu yerda kelajakda API ga jo'natiladigan obyekt:
		// const payload = { title, price, category, specs, images... }

		setTimeout(() => {
			setIsLoading(false)
			setIsOpen(false)
		}, 1000)
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetContent className='w-full sm:max-w-2xl! font-montserrat border-l border-gray-200 bg-white p-0 flex flex-col h-full'>
				{/* Header qismi */}
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

				{/* Asosiy Forma (Scrollable) */}
				<div className='flex-1 overflow-y-auto px-6 py-8 custom-scrollbar'>
					<form
						id='product-form'
						onSubmit={onSubmit}
						className='flex flex-col space-y-8'
					>
						{/* 1. ASOSIY MA'LUMOTLAR */}
						<div className='flex flex-col space-y-5'>
							<h3 className='font-space-grotesk text-lg font-bold text-black border-b border-gray-100 pb-2'>
								Asosiy ma'lumotlar
							</h3>

							<div className='flex flex-col gap-1.5'>
								<label className='text-sm font-semibold text-gray-700'>
									Mahsulot nomi (Title)
								</label>
								<input
									required
									defaultValue={initialData?.title}
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
									defaultValue={initialData?.category || ''}
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm bg-white cursor-pointer'
								>
									<option value='' disabled>
										Kategoriyani tanlang...
									</option>
									<option value='Dronlar'>Dronlar</option>
									<option value='Kameralar'>Kameralar</option>
									<option value='Aksessuarlar'>Aksessuarlar</option>
								</select>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-1.5'>
									<label className='text-sm font-semibold text-gray-700'>
										Asosiy narx ($)
									</label>
									<input
										required
										defaultValue={initialData?.price}
										type='number'
										step='0.01'
										placeholder='2199.00'
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-mono outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm'
									/>
								</div>
								<div className='flex flex-col gap-1.5'>
									<label className='text-sm font-semibold text-gray-700'>
										Chegirma narxi ($)
									</label>
									<input
										defaultValue={initialData?.discountPrice}
										type='number'
										step='0.01'
										placeholder='Ixtiyoriy...'
										className='w-full rounded-xl border border-gray-200 p-3 text-sm font-mono outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm placeholder:font-montserrat'
									/>
								</div>
							</div>

							<div className='flex flex-col gap-1.5'>
								<label className='text-sm font-semibold text-gray-700'>
									Tavsif (Description)
								</label>
								<textarea
									required
									defaultValue={initialData?.description}
									rows={4}
									placeholder="Mahsulot haqida to'liq ma'lumot..."
									className='w-full rounded-xl border border-gray-200 p-3 text-sm font-medium outline-none transition-all focus:border-black focus:ring-1 focus:ring-black shadow-sm resize-none'
								></textarea>
							</div>
						</div>

						{/* 2. RASMLAR (Max 10 ta) */}
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
										{/* Rasm joyi (Mock) */}
										<span className='text-xs text-gray-400 font-mono'>
											Img {i + 1}
										</span>
										<button
											type='button'
											onClick={() =>
												setImages(images.filter((_, idx) => idx !== i))
											}
											className='absolute top-1.5 right-1.5 w-6 h-6 rounded-md bg-white/90 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50'
										>
											<X className='w-3.5 h-3.5' />
										</button>
									</div>
								))}

								{images.length < 10 && (
									<label className='aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-100 transition-all group'>
										<input
											type='file'
											accept='image/*'
											multiple
											className='hidden'
											onChange={handleImageUpload}
										/>
										<ImagePlus className='w-5 h-5 text-gray-400 group-hover:text-black transition-colors mb-1' />
										<span className='text-[10px] font-bold text-gray-400 group-hover:text-black'>
											Yuklash
										</span>
									</label>
								)}
							</div>
						</div>

						{/* 3. TEXNIK XUSUSIYATLAR (Dynamic Fields) */}
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
									className='mt-2 flex items-center justify-center w-full rounded-lg border-2 border-dashed border-gray-200 py-2.5 text-sm font-bold text-gray-500 hover:border-black hover:text-black transition-all bg-white'
								>
									<Plus className='w-4 h-4 mr-2' />
									Yangi xususiyat qo'shish
								</button>
							</div>
						</div>
					</form>
				</div>

				{/* Footer qismi (Tugmalar) */}
				<div className='p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 shrink-0'>
					<button
						type='button'
						onClick={() => setIsOpen(false)}
						className='px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm'
					>
						Bekor qilish
					</button>
					<button
						type='submit'
						form='product-form'
						disabled={isLoading}
						className='px-6 py-2.5 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-sm disabled:opacity-50 flex items-center'
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
