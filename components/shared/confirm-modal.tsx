'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ConfirmModalProps {
	children: React.ReactNode
	onConfirm: () => void
	title?: string
	description?: string
	cancelText?: string
	confirmText?: string
	variant?: 'default' | 'destructive'
}

export default function ConfirmModal({
	children,
	onConfirm,
	title = 'Ishonchingiz komilmi?',
	description = "Bu amalni ortga qaytarib bo'lmaydi. Haqiqatan ham davom etishni xohlaysizmi?",
	cancelText = 'Bekor qilish',
	confirmText = 'Tasdiqlash',
	variant = 'destructive',
}: ConfirmModalProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className='bg-white rounded-2xl max-w-md'>
				<AlertDialogHeader>
					<AlertDialogTitle className='font-space-grotesk text-xl font-bold text-black'>
						{title}
					</AlertDialogTitle>
					<AlertDialogDescription className='font-montserrat text-sm text-gray-500'>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className='mt-4'>
					<AlertDialogCancel className='font-montserrat rounded-xl'>
						{cancelText}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						className={`font-montserrat rounded-xl text-white ${
							variant === 'destructive'
								? 'bg-red-600 hover:bg-red-700'
								: 'bg-black hover:bg-gray-800'
						}`}
					>
						{confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
