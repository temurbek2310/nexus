import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HelpCircle, Mail, MessageSquare } from 'lucide-react'
import Link from 'next/link'

// E-commerce uchun maxsus tayyorlangan FAQ ma'lumotlari
const faqs = [
	{
		value: 'item-1',
		question: "O'zbekiston bo'ylab yetkazib berish qancha vaqt oladi?",
		answer:
			'Toshkent shahri ichida buyurtmalar 24 soat ichida yetkaziladi. Viloyat markazlariga 2-3 ish kuni, uzoqroq tumanlarga esa 3-5 ish kuni ichida maxsus xavfsiz qadoqlarda yetkazib beriladi.',
	},
	{
		value: 'item-2',
		question: 'Xarid qilingan mahsulotlarga kafolat bormi?',
		answer:
			"Ha, barcha kameralar, dronlar va stabilizatorlar uchun ishlab chiqaruvchining rasmiy 1 yillik kafolati taqdim etiladi. Kafolat muddati davomida yuzaga kelgan texnik nosozliklar bepul ta'mirlab beriladi yoki yangisiga almashtiriladi.",
	},
	{
		value: 'item-3',
		question: 'Dronlarni uchirish uchun maxsus ruxsatnoma kerakmi?',
		answer:
			"O'zbekiston qonunchiligiga ko'ra, og'irligi 250 grammdan yuqori bo'lgan dronlarni olib kirish va uchirish uchun ruxsatnoma talab qilinadi. Biz sotadigan ba'zi ixcham modellar (masalan, DJI Mini seriyasi) 249 gramm bo'lib, ular uchun ruxsatnoma shart emas. Har bir model ta'rifida bu haqida batafsil yozilgan.",
	},
	{
		value: 'item-4',
		question: "Mahsulot yoqmasa yoki to'g'ri kelmasa qaytara olamanmi?",
		answer:
			"Siz mahsulotni qabul qilib olgan kuningizdan boshlab 14 kun ichida qaytarishingiz mumkin. Faqat mahsulotning qadog'i buzilmagan, tovar ko'rinishi va zavod plombalari joyida bo'lishi shart.",
	},
	{
		value: 'item-5',
		question: 'Uskunani sozlashda qiynalsam texnik yordam qanday ishlaydi?',
		answer:
			"Bizning 24/7 ishlovchi mutaxassislarimiz Telegram orqali video qo'ng'iroq yoki yozishmalar orqali istalgan qurilmani sozlashda, dasturlarini o'rnatishda bepul yordam berishadi.",
	},
]

const FaqPage = () => {
	return (
		<div className='min-h-screen bg-white pt-24 pb-24'>
			{/* FAQ Hero Qismi */}
			<section className='relative px-6 sm:px-12 lg:px-24 py-16 md:py-24 border-b border-gray-200 bg-gray-50/50 overflow-hidden'>
				{/* Vercel Grid Pattern */}
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none'></div>

				<div className='relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center'>
					<Badge
						variant='outline'
						className='mb-6 bg-white border-gray-200 text-black font-space-grotesk tracking-widest uppercase py-1 px-4 flex items-center gap-2'
					>
						<HelpCircle className='size-3.5' />
						Yordam markazi
					</Badge>
					<h1 className='font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black mb-6'>
						Qanday yordam bera olamiz?
					</h1>
					<p className='font-montserrat text-gray-500 text-base md:text-lg text-balance'>
						Mijozlarimiz tomonidan eng ko'p beriladigan savollarga javoblar.
						Agar o'zingizni qiziqtirgan savolga javob topmasangiz, biz bilan
						bog'laning.
					</p>
				</div>
			</section>

			{/* Accordion Qismi */}
			<section className='max-w-3xl mx-auto px-6 sm:px-12 mt-16 md:mt-24'>
				<Accordion type={'single' as const} collapsible className='w-full'>
					{faqs.map(faq => (
						<AccordionItem
							key={faq.value}
							value={faq.value}
							className='border-gray-200 py-2'
						>
							{/* Accordion Trigger (Savol) */}
							<AccordionTrigger className='font-space-grotesk text-left text-lg md:text-xl font-bold text-gray-900 hover:text-gray-600 hover:no-underline transition-colors'>
								{faq.question}
							</AccordionTrigger>
							{/* Accordion Content (Javob) */}
							<AccordionContent className='font-montserrat text-gray-500 text-base leading-relaxed text-pretty pt-2 pb-6'>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>

			{/* Kontaktga yo'naltirish (Bottom CTA) */}
			<section className='max-w-3xl mx-auto px-6 sm:px-12 mt-20'>
				<div className='rounded-3xl bg-gray-50 border border-gray-200 p-8 md:p-12 text-center flex flex-col items-center'>
					<h2 className='font-space-grotesk text-2xl font-bold text-black mb-4'>
						Savolingizga javob topilmadi-mi?
					</h2>
					<p className='font-montserrat text-gray-500 mb-8 max-w-md text-balance'>
						Bizning jamoa sizning barcha savollaringizga javob berishga va
						uskunani tanlashda yordam berishga tayyor.
					</p>
					<div className='flex flex-col sm:flex-row items-center gap-4'>
						<Button
							asChild
							size='lg'
							className='rounded-xl bg-black text-white hover:bg-gray-800 font-montserrat px-8 h-12 w-full sm:w-auto'
						>
							<Link href='/contact'>
								<MessageSquare className='size-4 ml-0 mr-2' />
								Biz bilan bog'lanish
							</Link>
						</Button>
						<Button
							asChild
							variant='outline'
							size='lg'
							className='rounded-xl border-gray-300 text-black hover:border-black font-montserrat px-8 h-12 w-full sm:w-auto'
						>
							<a href='mailto:support@nexus.uz'>
								<Mail className='size-4 ml-0 mr-2' />
								Email yozish
							</a>
						</Button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default FaqPage
