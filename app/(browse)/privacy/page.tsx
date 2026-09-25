import { Badge } from '@/components/ui/badge'

export default function PrivacyPage() {
	return (
		<div className='min-h-screen bg-white selection:bg-gray-100 selection:text-black'>
			<main className='max-w-3xl mx-auto px-6 sm:px-8 py-20 md:py-32'>
				{/* Sarlavha qismi */}
				<header className='mb-16'>
					<Badge
						variant='outline'
						className='font-montserrat rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6'
					>
						Huquqiy Ma'lumot
					</Badge>
					<h1 className='font-space-grotesk text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-tight mb-4'>
						Maxfiylik Siyosati
					</h1>
					<p className='font-montserrat text-gray-500 text-lg'>
						Oxirgi marta yangilangan:{' '}
						<span className='font-medium text-black'>10-Avgust, 2026-yil</span>
					</p>
				</header>

				<hr className='border-gray-200 mb-12' />

				{/* Matnli Kontent qismi */}
				<article className='font-montserrat text-gray-600 text-base md:text-lg leading-relaxed space-y-10'>
					<section>
						<p>
							Ushbu Maxfiylik Siyosati bizning veb-saytimizdan (yoki
							xizmatlarimizdan) foydalanganingizda sizning ma'lumotlaringizni
							qanday yig'ishimiz, foydalanishimiz va himoya qilishimizni
							tushuntiradi. Biz sizning shaxsiy ma'lumotlaringiz xavfsizligiga
							jiddiy e'tibor qaratamiz.
						</p>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							1. Biz qanday ma'lumotlarni yig'amiz?
						</h2>
						<p className='mb-4'>
							Platformamiz orqali xaridni amalga oshirish yoki ro'yxatdan o'tish
							jarayonida biz quyidagi ma'lumotlarni so'rashimiz mumkin:
						</p>
						<ul className='list-none space-y-3 pl-0'>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									<strong>Shaxsiy ma'lumotlar:</strong> Ismingiz, elektron
									pochta manzilingiz, telefon raqamingiz va yetkazib berish
									manzili.
								</span>
							</li>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									<strong>To'lov ma'lumotlari:</strong> Xaridni yakunlash uchun
									zarur bo'lgan tranzaksiya detallari (biz kredit karta
									ma'lumotlarini bevosita saqlamaymiz, ular Stripe kabi xavfsiz
									uchinchi tomon provayderlari orqali qayta ishlanadi).
								</span>
							</li>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									<strong>Foydalanish ma'lumotlari:</strong> Saytimizdagi
									harakatlaringiz, IP manzilingiz va brauzer turi haqida umumiy
									texnik ma'lumotlar.
								</span>
							</li>
						</ul>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							2. Ma'lumotlardan qanday foydalanamiz?
						</h2>
						<p className='mb-4'>
							Yig'ilgan ma'lumotlar faqat quyidagi maqsadlarda ishlatiladi:
						</p>
						<ul className='list-none space-y-3 pl-0'>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-gray-400 rounded-sm mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									Buyurtmalaringizni qabul qilish, qayta ishlash va yetkazib
									berishni tashkil etish.
								</span>
							</li>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-gray-400 rounded-sm mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									Xizmat ko'rsatish sifatini yaxshilash va foydalanuvchi
									interfeysini optimallashtirish.
								</span>
							</li>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-gray-400 rounded-sm mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									Sizning roziligingiz bilan muhim yangilanishlar va aksiyalar
									haqida xabarnomalar (newsletter) yuborish.
								</span>
							</li>
						</ul>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							3. Ma'lumotlarni uchinchi shaxslar bilan ulashish
						</h2>
						<p>
							Biz sizning shaxsiy ma'lumotlaringizni sotmaymiz yoki ijaraga
							bermaymiz. Biroq, buyurtmani amalga oshirish uchun (masalan,
							kuryerlik xizmatlari yoki to'lov tizimlari) zarur bo'lgan
							hollardagina qat'iy maxfiylik shartnomalari asosida ma'lumotlarni
							ishonchli hamkorlarimiz bilan baham ko'rishimiz mumkin.
						</p>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							4. Sizning huquqlaringiz
						</h2>
						<p>
							Siz istalgan vaqtda o'z shaxsiy ma'lumotlaringizni ko'rish,
							o'zgartirish yoki tizimimizdan to'liq o'chirib tashlashni talab
							qilish huquqiga egasiz. Buning uchun texnik qo'llab-quvvatlash
							bo'limimizga murojaat qilishingiz kifoya.
						</p>
					</section>

					<hr className='border-gray-200 my-12' />

					<section className='bg-gray-50 rounded-2xl p-8 border border-gray-200'>
						<h3 className='font-space-grotesk text-xl font-bold text-black tracking-tight mb-2'>
							Savollaringiz bormi?
						</h3>
						<p className='mb-6 text-gray-500 text-sm md:text-base'>
							Maxfiylik siyosatimiz bo'yicha savollar yoki xavotirlar bo'lsa,
							biz bilan bog'lanishdan tortinmang.
						</p>
						<a
							href='mailto:support@sizning-saytingiz.com'
							className='font-montserrat inline-flex items-center justify-center h-10 px-6 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors'
						>
							Biz bilan bog'lanish
						</a>
					</section>
				</article>
			</main>
		</div>
	)
}
