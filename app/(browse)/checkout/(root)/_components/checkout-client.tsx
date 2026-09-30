'use client'

import { createPaymentIntent } from '@/lib/actions/order.actions'
import { useCartStore } from '@/store/useCartStore'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useMemo, useState, useTransition } from 'react'
import AddressStep from './AddressStep'
import PaymentStep from './PaymentStep'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

interface Address {
	_id: string
	type: string
	recipient: string
	phone: string
	region: string
	fullAddress: string
	isDefault: boolean
}

interface CheckoutClientProps {
	initialAddresses: Address[]
}

export default function CheckoutClient({
	initialAddresses,
}: CheckoutClientProps) {
	const [selectedAddressId, setSelectedAddressId] = useState<string>(
		initialAddresses.find(a => a.isDefault)?._id ||
			initialAddresses[0]?._id ||
			'',
	)
	const [step, setStep] = useState<1 | 2>(1)
	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [orderId, setOrderId] = useState<string | null>(null) // <--- QO'SHILDI
	const [isPending, startTransition] = useTransition()
	const [errorMsg, setErrorMsg] = useState('')

	const cartItems = useCartStore(state => state.items)

	const { subtotal, tax, shipping, total, savings } = useMemo(() => {
		const subtotal = cartItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		)
		const tax = subtotal * 0.12
		const shipping = subtotal > 0 ? 15 : 0
		const savings = cartItems.reduce((acc, item) => {
			const oldPrice = item.oldPrice ? Number(item.oldPrice) : item.price
			return (
				acc +
				(oldPrice > item.price ? (oldPrice - item.price) * item.quantity : 0)
			)
		}, 0)
		const total = subtotal + tax + shipping
		return { subtotal, tax, shipping, total, savings }
	}, [cartItems])

	const handleProceedToPayment = () => {
		if (!selectedAddressId) {
			setErrorMsg('Iltimos, manzilni tanlang')
			return
		}

		startTransition(async () => {
			try {
				const res = await createPaymentIntent({
					addressId: selectedAddressId,
					cartItems,
					subtotal,
					tax,
					shipping,
					total,
					savings,
				})

				if (res?.clientSecret && res?.orderId) {
					setClientSecret(res.clientSecret)
					setOrderId(res.orderId) // <--- orderId saqlanadi
					setStep(2)
				}
			} catch (err: unknown) {
				setErrorMsg(err instanceof Error ? err.message : 'Xatolik yuz berdi')
			}
		})
	}

	return (
		<div className='min-h-screen bg-[#FAFAFA] pt-32 pb-24'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6'>
				<div className='mb-10'>
					<h1 className='font-space-grotesk text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-black mb-2'>
						Buyurtmani rasmiylashtirish
					</h1>
					<p className='font-montserrat text-gray-500 text-sm'>
						{step === 1
							? '1-qadam: Yetkazib berish manzilini tanlang'
							: "2-qadam: Karta ma'lumotlarini kiriting"}
					</p>
				</div>

				<div className='bg-white border border-gray-200 rounded-[2rem] p-4 sm:p-6 md:p-10 shadow-sm'>
					{errorMsg && (
						<div className='mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-montserrat'>
							{errorMsg}
						</div>
					)}

					{step === 1 && (
						<AddressStep
							addresses={initialAddresses}
							selectedAddressId={selectedAddressId}
							onSelectAddress={setSelectedAddressId}
							onNext={handleProceedToPayment}
						/>
					)}

					{step === 2 && clientSecret && orderId && (
						<Elements stripe={stripePromise} options={{ clientSecret }}>
							<PaymentStep
								orderId={orderId}
								total={total}
								subtotal={subtotal}
								tax={tax}
								shipping={shipping}
								savings={savings}
								onBack={() => setStep(1)}
							/>
						</Elements>
					)}

					{isPending && (
						<div className='py-10 text-center font-montserrat text-sm text-gray-500'>
							To'lov muhiti tayyorlanmoqda...
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
