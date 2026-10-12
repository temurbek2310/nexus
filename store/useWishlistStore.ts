import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
	id: string
	name: string
	price: number // yoki string, backend'dagi Product modelingizga qarab
	category: string
	image: string
	inStock: boolean
}

interface WishlistState {
	items: WishlistItem[]
	toggleWishlist: (item: WishlistItem) => void
	removeItem: (id: string) => void
	clearWishlist: () => void
	isInWishlist: (id: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
	persist(
		(set, get) => ({
			items: [],

			// Mahsulotni qo'shish yoki olib tashlash (Yurakcha bosilganda ishlaydi)
			toggleWishlist: item => {
				const currentItems = get().items
				const exists = currentItems.find(i => i.id === item.id)

				if (exists) {
					// Agar bor bo'lsa - o'chiradi (Unlike)
					set({ items: currentItems.filter(i => i.id !== item.id) })
				} else {
					// Yo'q bo'lsa - qo'shadi (Like)
					set({ items: [...currentItems, item] })
				}
			},

			// Faqat o'chirish uchun
			removeItem: id => {
				set(state => ({
					items: state.items.filter(i => i.id !== id),
				}))
			},

			// Barchasini tozalash
			clearWishlist: () => set({ items: [] }),

			// Mahsulot wishlist'da bor-yo'qligini tekshirish (Yurakchani qizil qilish uchun kerak)
			isInWishlist: id => {
				return get().items.some(i => i.id === id)
			},
		}),
		{
			name: 'nexa-wishlist-storage', // LocalStorage dagi nomi
		},
	),
)
