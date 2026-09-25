import { Badge } from '@/components/ui/badge'

export default function TermsPage() {
	return (
		<div className='bg-white selection:bg-gray-100 selection:text-black'>
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
						Foydalanish Shartlari
					</h1>
					<p className='font-montserrat text-gray-500 text-lg'>
						Kuchga kirish sanasi:{' '}
						<span className='font-medium text-black'>10-Avgust, 2026-yil</span>
					</p>
				</header>

				<hr className='border-gray-200 mb-12' />

				{/* Matnli Kontent qismi */}
				<article className='font-montserrat text-gray-600 text-base md:text-lg leading-relaxed space-y-10'>
					<section>
						<p>
							Ushbu veb-saytga tashrif buyurish va undan xarid qilish orqali siz
							quyidagi "Foydalanish Shartlari"ga to'liq rozilik bildirasiz.
							Iltimos, xizmatlarimizdan foydalanishdan oldin ushbu qoidalarni
							diqqat bilan o'qib chiqing. Agar shartlarning biror qismiga rozi
							bo'lmasangiz, saytimizdan foydalanishni to'xtatishingizni
							so'raymiz.
						</p>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							1. Umumiy qoidalar va Hisob (Account)
						</h2>
						<ul className='list-none space-y-3 pl-0 mb-4'>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									Platformadan foydalanish va xaridni amalga oshirish uchun
									kamida 18 yoshga to'lgan bo'lishingiz kerak.
								</span>
							</li>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									Ro'yxatdan o'tish paytida taqdim etilgan ma'lumotlarning
									aniqligi va akkaunt xavfsizligi uchun siz shaxsan javobgarsiz.
								</span>
							</li>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									Biz istalgan vaqtda shubhali faollik kuzatilgan akkauntlarni
									vaqtincha yoki butunlay bloklash huquqini o'zida saqlab
									qolamiz.
								</span>
							</li>
						</ul>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							2. Mahsulotlar va Narxlash
						</h2>
						<p className='mb-4'>
							Biz taklif qilayotgan barcha kameralar, dronlar, stabilizatorlar
							va boshqa texnikalar rasmiy ishlab chiqaruvchilar tomonidan taqdim
							etilgan bo'lib, quyidagi shartlar amal qiladi:
						</p>
						<ul className='list-none space-y-3 pl-0'>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-gray-400 rounded-sm mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									<strong>Narxlar o'zgarishi:</strong> Barcha gadjetlarning
									narxlari oldindan ogohlantirilmasdan o'zgartirilishi mumkin.
									Ammo xarid tasdiqlangandan so'ng narx o'zgarmaydi.
								</span>
							</li>
							<li className='flex items-start'>
								<span className='w-1.5 h-1.5 bg-gray-400 rounded-sm mt-2.5 mr-3 flex-shrink-0'></span>
								<span>
									<strong>Zaxira:</strong> Mahsulotlarning mavjudligi doimiy
									kafolatlanmaydi. Agar buyurtma qilingan tovar omborda qolmagan
									bo'lsa, biz to'lovni 100% qaytarib beramiz.
								</span>
							</li>
						</ul>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							3. To'lov va Qaytarish siyosati (Refunds)
						</h2>
						<p>
							To'lovlar uchinchi tomon xavfsiz to'lov shlyuzlari orqali amalga
							oshiriladi. Xarid qilingan texnikani qaytarish shartlari rasmiy
							"Qaytarish Siyosati"da belgilangan bo'lib, odatda xarid qilingan
							kundan boshlab 14 kun ichida, agar zavod qadog'i buzilmagan
							bo'lsa, amalga oshirilishi mumkin. Ochildi qilingan va
							foydalanilgan gadjetlar faqat zavod nuqsoni (brak) bo'lgandagina
							kafolat asosida almashtirib beriladi.
						</p>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							4. Intellektual Mulk
						</h2>
						<p>
							Saytdagi barcha kontent, jumladan matnlar, grafikalar, logotiplar,
							rasmlar, dasturiy ta'minot kodlari (UI dizaynlar) va gadjet
							obzorlari bizning yoki kontent yetkazib beruvchilarimizning
							eksklyuziv mulki hisoblanadi. Ulardan ruxsatsiz tijorat
							maqsadlarida nusxa ko'chirish yoki foydalanish qat'iyan man
							etiladi.
						</p>
					</section>

					<section>
						<h2 className='font-space-grotesk text-2xl font-bold text-black tracking-tight mb-4 mt-8'>
							5. Qoidalarga o'zgartirish kiritish
						</h2>
						<p>
							Biz ushbu "Foydalanish Shartlari"ni istalgan vaqtda yangilash
							huquqini o'zida saqlab qolamiz. O'zgarishlar veb-saytda e'lon
							qilingan vaqtdan boshlab kuchga kiradi. Foydalanuvchilar
							qoidalarni vaqti-vaqti bilan tekshirib turishlari tavsiya etiladi.
						</p>
					</section>

					<hr className='border-gray-200 my-12' />

					{/* Vercel uslubidagi yordam/aloqa paneli */}
					<section className='bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6'>
						<div>
							<h3 className='font-space-grotesk text-xl font-bold text-black tracking-tight mb-1'>
								Tushunmovchiliklar bormi?
							</h3>
							<p className='text-gray-500 text-sm md:text-base'>
								Foydalanish shartlari bo'yicha to'liq ma'lumot olish uchun bizga
								yozing.
							</p>
						</div>
						<a
							href='/contact'
							className='font-montserrat whitespace-nowrap inline-flex items-center justify-center h-10 px-6 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm'
						>
							Aloqa bo'limi
						</a>
					</section>
				</article>
			</main>
		</div>
	)
}
