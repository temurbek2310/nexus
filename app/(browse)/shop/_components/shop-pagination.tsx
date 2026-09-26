'use client'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

interface ShopPaginationProps {
	totalPages: number
	currentPage: number
}

export const ShopPagination = ({
	totalPages,
	currentPage,
}: ShopPaginationProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const onPageChange = (page: number) => {
		const current = qs.parse(searchParams.toString())
		const url = qs.stringifyUrl(
			{ url: pathname, query: { ...current, page: String(page) } },
			{ skipNull: true, skipEmptyString: true },
		)
		router.push(url, { scroll: true }) // Yangi sahifaga o'tganda tepaga scroll bo'ladi
	}

	if (totalPages <= 1) return null

	return (
		<div className='mt-12 flex justify-center pb-8'>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href='#'
							onClick={e => {
								e.preventDefault()
								if (currentPage > 1) onPageChange(currentPage - 1)
							}}
							className={cn(
								'rounded-xl',
								currentPage === 1 && 'pointer-events-none opacity-50',
							)}
						/>
					</PaginationItem>

					{[...Array(totalPages)].map((_, i) => {
						const pageNum = i + 1
						return (
							<PaginationItem key={pageNum}>
								<PaginationLink
									href='#'
									isActive={currentPage === pageNum}
									onClick={e => {
										e.preventDefault()
										onPageChange(pageNum)
									}}
									className='rounded-xl'
								>
									{pageNum}
								</PaginationLink>
							</PaginationItem>
						)
					})}

					<PaginationItem>
						<PaginationNext
							href='#'
							onClick={e => {
								e.preventDefault()
								if (currentPage < totalPages) onPageChange(currentPage + 1)
							}}
							className={cn(
								'rounded-xl',
								currentPage === totalPages && 'pointer-events-none opacity-50',
							)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
