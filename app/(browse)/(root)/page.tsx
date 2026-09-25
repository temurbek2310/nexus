import BestPrices from './_components/best-prices'
import Categories from './_components/categories'
import CoolestGadgets from './_components/coolest-gadgets'
import CtaSection from './_components/cta-section'
import Hero from './_components/hero'

const HomePage = () => {
	return (
		<>
			<Hero />
			<Categories />
			<BestPrices />
			<CoolestGadgets />
			<CtaSection />
		</>
	)
}

export default HomePage
