import Catalog from './_components/catalog'
import Products from './_components/products'

const BrowsePage = () => {
	return (
		<div className='min-h-screen bg-[#FAFAFA]'>
			{/* ================= 1-QISM: HERO CATEGORY CAROUSEL ================= */}
			<Catalog />

			{/* ================= 2-QISM: BENTO GRID MAHSULOTLAR ================= */}
			<Products />
		</div>
	)
}

export default BrowsePage
