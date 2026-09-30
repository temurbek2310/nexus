import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
	id: string
	brand: string
	name: string
	price: number
	oldPrice?: number | null
	image: string
	quantity: number
}

interface CartState {
	items: CartItem[]
	addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
	removeItem: (id: string) => void
	updateQuantity: (id: string, delta: number) => void
	clearCart: () => void
	getTotalPrice: () => number
	getTotalItems: () => number
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			// 1. Mahsulot qo'shish
			addItem: item => {
				set(state => {
					const existingItem = state.items.find(i => i.id === item.id)
					const qtyToAdd = item.quantity || 1

					if (existingItem) {
						return {
							items: state.items.map(i =>
								i.id === item.id
									? { ...i, quantity: i.quantity + qtyToAdd }
									: i,
							),
						}
					}
					// Yangi mahsulot bo'lsa
					return { items: [...state.items, { ...item, quantity: qtyToAdd }] }
				})
			},

			// 2. Mahsulotni savatdan o'chirish
			removeItem: id => {
				set(state => ({
					items: state.items.filter(i => i.id !== id),
				}))
			},

			// 3. Miqdorni o'zgartirish
			updateQuantity: (id, delta) => {
				set(state => ({
					items: state.items.map(item => {
						if (item.id === id) {
							const newQuantity = Math.max(1, item.quantity + delta)
							return { ...item, quantity: newQuantity }
						}
						return item
					}),
				}))
			},

			// 4. Savatni tozalash
			clearCart: () => set({ items: [] }),

			// 5. Jami narxni hisoblash
			getTotalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.price * item.quantity,
					0,
				)
			},

			// 6. Jami sonni hisoblash
			getTotalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0)
			},
		}),
		{
			name: 'nexa-cart-storage',
		},
	),
)
