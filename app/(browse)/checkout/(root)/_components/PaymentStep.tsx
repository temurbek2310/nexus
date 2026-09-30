'use client'

import { Button } from '@/components/ui/button'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

interface PaymentStepProps {
	orderId: string // <--- QO'SHILDI
	total: number
	subtotal: number
	tax: number
	shipping: number
	savings: number
	onBack: () => void
}

export default function PaymentStep({
	orderId,
	total,
	subtotal,
	tax,
	shipping,
	savings,
	onBack,
}: PaymentStepProps) {
	const stripe = useStripe()
	const elements = useElements()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!stripe || !elements) return

		setIsLoading(true)
		setErrorMessage(null)

		// Stripe to'lovni tasdiqlab, success sahifasiga order_id bilan yo'naltiradi
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/checkout/success?order_id=${orderId}`,
			},
		})

		if (error) {
			setErrorMessage(
				error.message || "To'lovni tasdiqlashda xatolik yuz berdi",
			)
			setIsLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-6 animate-in fade-in duration-300'
		>
			<div className='flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-space-grotesk font-bold'>
						2
					</div>
					<h2 className='font-space-grotesk text-xl font-bold text-black'>
						Bank kartasi orqali to'lov
					</h2>
				</div>
				<Button
					type='button'
					variant='ghost'
					size='sm'
					onClick={onBack}
					className='text-gray-500'
				>
					<ArrowLeft className='w-4 h-4 mr-2' /> Orqaga
				</Button>
			</div>

			<div className='bg-gray-50 p-6 rounded-2xl border border-gray-100 font-montserrat flex flex-col gap-3'>
				<div className='flex justify-between text-sm text-gray-600'>
					<span>Mahsulotlar jami:</span>
					<span className='font-semibold text-black'>
						${subtotal.toFixed(2)}
					</span>
				</div>
				<div className='flex justify-between text-sm text-gray-600'>
					<span>Soliq (12%):</span>
					<span className='font-semibold text-black'>${tax.toFixed(2)}</span>
				</div>
				<div className='flex justify-between text-sm text-gray-600'>
					<span>Yetkazib berish:</span>
					<span className='font-semibold text-black'>
						${shipping.toFixed(2)}
					</span>
				</div>
				{savings > 0 && (
					<div className='flex justify-between text-sm text-green-600 font-medium'>
						<span>Tejalgan summa:</span>
						<span>-${savings.toFixed(2)}</span>
					</div>
				)}
				<div className='w-full h-px bg-gray-200 my-2'></div>
				<div className='flex justify-between items-center'>
					<span className='font-bold text-black'>Jami to'lov:</span>
					<span className='font-space-grotesk text-2xl sm:text-3xl font-bold text-black'>
						${total.toFixed(2)}
					</span>
				</div>
			</div>

			<div className='p-6 border border-gray-200 rounded-2xl bg-white'>
				<PaymentElement />
			</div>

			{errorMessage && (
				<div className='p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-montserrat'>
					{errorMessage}
				</div>
			)}

			<div className='flex items-center gap-2 text-gray-400 font-montserrat text-xs'>
				<ShieldCheck className='w-4 h-4 text-green-500' />
				<span>
					To'lov Stripe ning 256-bitli xavfsiz shifrlash tizimi orqali
					himoyalangan.
				</span>
			</div>

			<div className='mt-4 flex justify-stretch sm:justify-end'>
				<Button
					type='submit'
					disabled={!stripe || isLoading}
					className='w-full h-14 px-10 bg-black text-white hover:bg-gray-800 rounded-2xl font-montserrat font-semibold text-base shadow-xl'
				>
					{isLoading
						? "To'lov bajarilmoqda..."
						: `To'lash ($${total.toFixed(2)})`}
				</Button>
			</div>
		</form>
	)
}
