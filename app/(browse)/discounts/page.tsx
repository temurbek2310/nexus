import DiscountProducts from './_components/discount-products'
import Hero from './_components/hero'

export default function DiscountsPage() {
	return (
		<div className='bg-[#FAFAFA] pt-32 pb-24'>
			<div className='max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-24'>
				{/* ================= CREATIVE HERO CAROUSEL ================= */}
				<Hero />

				{/* ================= DISCOUNT PRODUCTS GRID ================= */}
				<DiscountProducts />
			</div>
		</div>
	)
}
