import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react'

const ContactPage = () => {
	return (
		<div className='min-h-screen bg-white pt-24 pb-24'>
			{/* Hero Qismi */}
			<section className='relative px-6 sm:px-12 lg:px-24 py-16 md:py-24 border-b border-gray-200 bg-gray-50/50 overflow-hidden'>
				{/* Vercel Grid Pattern */}
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>

				<div className='relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center'>
					<Badge
						variant='outline'
						className='mb-6 bg-white border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1 px-4 flex items-center gap-2'
					>
						<MessageSquare className='size-3.5' />
						Aloqa
					</Badge>
					<h1 className='font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black mb-6 leading-[1.1]'>
						Biz har doim <br className='hidden md:block' />
						<span className='text-gray-400'>aloqadamiz.</span>
					</h1>
					<p className='font-montserrat text-gray-500 text-base md:text-lg text-balance max-w-2xl'>
						Texnik yordam, hamkorlik yoki xarid masalalari bo'yicha biz bilan
						bog'laning. Mutaxassislarimiz sizga yordam berishdan mamnun
						bo'lishadi.
					</p>
				</div>
			</section>

			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24 mt-16 md:mt-24'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24'>
					{/* Chap qism: Kontakt ma'lumotlari */}
					<div className='flex flex-col gap-12'>
						<div>
							<h2 className='font-space-grotesk text-3xl font-bold text-gray-900 mb-6'>
								Biz bilan bog'lanish
							</h2>
							<p className='font-montserrat text-gray-500 mb-8 max-w-md'>
								Sizning fikringiz va murojaatlaringiz biz uchun muhim.
								O'zingizga qulay usulni tanlang yoki formani to'ldirib yuboring.
							</p>
						</div>

						{/* Kontakt Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
							{/* Manzil */}
							<div className='flex flex-col items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-200'>
								<div className='size-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black'>
									<MapPin className='size-5' />
								</div>
								<div>
									<h3 className='font-space-grotesk font-bold text-gray-900 mb-1'>
										Manzilimiz
									</h3>
									<p className='font-montserrat text-sm text-gray-500'>
										Toshkent shahri, Yunusobod tumani, Amir Temur shoh ko'chasi
										107-B.
									</p>
								</div>
							</div>

							{/* Telefon */}
							<div className='flex flex-col items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-200'>
								<div className='size-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black'>
									<Phone className='size-5' />
								</div>
								<div>
									<h3 className='font-space-grotesk font-bold text-gray-900 mb-1'>
										Telefon
									</h3>
									<div className='flex flex-col gap-1 mt-2'>
										<a
											href='tel:+998901234567'
											className='font-montserrat text-sm text-gray-600 hover:text-black transition-colors font-medium'
										>
											+998 90 123 45 67
										</a>
										<a
											href='tel:+998711234567'
											className='font-montserrat text-sm text-gray-600 hover:text-black transition-colors font-medium'
										>
											+998 71 123 45 67
										</a>
									</div>
								</div>
							</div>

							{/* Email */}
							<div className='flex flex-col items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-200'>
								<div className='size-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black'>
									<Mail className='size-5' />
								</div>
								<div>
									<h3 className='font-space-grotesk font-bold text-gray-900 mb-1'>
										Elektron pochta
									</h3>
									<a
										href='mailto:info@nexus.uz'
										className='font-montserrat text-sm text-gray-600 hover:text-black transition-colors'
									>
										info@nexus.uz
									</a>
									<p className='font-montserrat text-xs text-gray-400 mt-1'>
										24 soat ichida javob beriladi
									</p>
								</div>
							</div>

							{/* Ish vaqti */}
							<div className='flex flex-col items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-200'>
								<div className='size-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black'>
									<Clock className='size-5' />
								</div>
								<div>
									<h3 className='font-space-grotesk font-bold text-gray-900 mb-1'>
										Ish vaqti
									</h3>
									<p className='font-montserrat text-sm text-gray-500'>
										Dush - Juma: 09:00 - 20:00
										<br />
										Shanba: 10:00 - 18:00
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* O'ng qism: Aloqa formasi */}
					<div className='relative w-full rounded-3xl border border-gray-200 bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'>
						<h3 className='font-space-grotesk text-2xl font-bold text-gray-900 mb-2'>
							Xabar yuborish
						</h3>
						<p className='font-montserrat text-sm text-gray-500 mb-8'>
							Barcha maydonlarni to'ldiring va biz sizga qisqa fursatda aloqaga
							chiqamiz.
						</p>

						<form className='flex flex-col gap-6 font-montserrat'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
								<div className='flex flex-col gap-2'>
									<label
										htmlFor='name'
										className='text-sm font-medium text-gray-900'
									>
										Ismingiz
									</label>
									<Input
										id='name'
										placeholder='Masalan: Sardor'
										className='h-12 bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black rounded-xl'
									/>
								</div>

								<div className='flex flex-col gap-2'>
									<label
										htmlFor='phone'
										className='text-sm font-medium text-gray-900'
									>
										Telefon raqam
									</label>
									<Input
										id='phone'
										type='tel'
										placeholder='+998'
										className='h-12 bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black rounded-xl'
									/>
								</div>
							</div>

							<div className='flex flex-col gap-2'>
								<label
									htmlFor='subject'
									className='text-sm font-medium text-gray-900'
								>
									Murojaat mavzusi
								</label>
								<Input
									id='subject'
									placeholder='Texnik yordam, Hamkorlik, Buyurtma holati...'
									className='h-12 bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black rounded-xl'
								/>
							</div>

							<div className='flex flex-col gap-2'>
								<label
									htmlFor='message'
									className='text-sm font-medium text-gray-900'
								>
									Xabar matni
								</label>
								<Textarea
									id='message'
									placeholder='Savolingiz yoki taklifingizni batafsil yozing...'
									className='min-h-[150px] resize-none bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black rounded-xl p-4'
								/>
							</div>

							<Button
								type='button'
								size='lg'
								className='h-12 rounded-xl bg-black text-white hover:bg-gray-800 font-medium transition-all w-full md:w-max mt-4'
							>
								Xabarni yuborish
								<Send className='size-4 ml-2' />
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactPage
