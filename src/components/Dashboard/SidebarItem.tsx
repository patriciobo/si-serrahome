'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	CiBellOn,
	CiBookmarkCheck,
	CiChat1,
	CiLogout,
	CiMenuBurger,
	CiSearch,
} from 'react-icons/ci';

interface Props {
	path: string;
	icon: JSX.Element;
	title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {
	const currentPath = usePathname();

	return (
		<>
			<li className=''>
				<Link
					href={path}
					className={`transition-all duration-[250ms] ease-out px-4 py-3 flex items-center space-x-4 rounded-xl text-oscuro hover:bg-verdeClaro hover:text-white${
						currentPath === path
							? ' bg-gradient-to-r from-verdeIntermedio to-verdeClaro text-white'
							: ''
					}`}
				>
					{icon}
					<span className='-mr-1 font-medium'>{title}</span>
				</Link>
			</li>
		</>
	);
};
