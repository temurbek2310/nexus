import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Montserrat, Space_Grotesk } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
})

const space_Grotesk = Space_Grotesk({
	variable: '--font-space-grotesk',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'NEXUS | Premium E-Commerce',
	description: "Eng so'nggi va innovatsion texnologiyalar do'koni.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			className={`${montserrat.variable} ${space_Grotesk.variable} h-full antialiased`}
		>
			<body className='min-h-full flex flex-col'>
				<ClerkProvider
					appearance={{
						variables: {
							colorPrimary: '#000000', // Qora asosiy rang (Tugmalar va focus uchun)
							colorBackground: '#ffffff', // Fon oq
							borderRadius: '1rem', // 16px - Dumaloq burchaklar
						},
						elements: {
							// Karta dizayni (Soya va chiziqlar)
							card: 'shadow-2xl shadow-black/5 border border-gray-200',

							// Sarlavhalar (Space Grotesk shrifti bilan)
							headerTitle:
								'font-space-grotesk text-2xl font-bold tracking-tight',
							headerSubtitle: 'font-montserrat text-gray-500',

							// Tugmalar (Montserrat shrifti bilan)
							formButtonPrimary:
								'font-montserrat text-base font-semibold shadow-sm transition-all',

							// Google / GitHub bilan kirish tugmalari
							socialButtonsBlockButton:
								'font-montserrat border-gray-200 hover:bg-gray-50 transition-colors',
							socialButtonsBlockButtonText:
								'font-montserrat font-medium text-gray-600',

							// Input maydonlari
							formFieldLabel: 'font-montserrat font-medium text-gray-700',
							formFieldInput:
								'font-montserrat h-11 border-gray-200 focus:ring-black rounded-xl',

							// Pastki matnlar va linklar
							footerActionText: 'font-montserrat text-gray-500',
							footerActionLink:
								'font-montserrat font-semibold text-black hover:text-gray-700',

							// Divider (Yoki so'zi tushadigan chiziq)
							dividerLine: 'bg-gray-200',
							dividerText: 'font-montserrat text-gray-400',
						},
					}}
				>
					{children}
				</ClerkProvider>
			</body>
		</html>
	)
}
