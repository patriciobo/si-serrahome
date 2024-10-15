import Image from 'next/image';
import { SidebarItem } from './SidebarItem';
import {
	CiBellOn,
	CiBookmarkCheck,
	CiCalendar,
	CiChat1,
	CiHome,
	CiLogout,
	CiMenuBurger,
	CiSearch,
} from 'react-icons/ci';

import Link from 'next/link';

const menuItems = [
	{
		path: '/dashboard/home',
		icon: <CiHome size={20} />,
		title: 'Inicio',
		subtitle: 'Inicio',
	},
	{
		path: '/dashboard/reservas',
		icon: <CiCalendar size={20} />,
		title: 'Reservas',
		subtitle: 'Disponibilidad',
	},
	{
		path: '/dashboard/unidades',
		icon: <CiCalendar size={20} />,
		title: 'Unidades',
		subtitle: 'Disponibilidad',
	},
	{
		path: '/dashboard/propiedades',
		icon: <CiCalendar size={20} />,
		title: 'Propiedades',
		subtitle: 'Disponibilidad',
	},
];

export const Sidebar = () => {
	return (
		<aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
			<div>
				<div className='mt-8 text-center'>
					<Link href='/dashboard/home' title='home'>
						<Image
							src='/logo.png'
							alt=''
							className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
							width={100}
							height={100}
						/>
					</Link>
					<h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
						SerraHome
					</h5>
					<span className='hidden text-gray-400 lg:block'>Admin</span>
				</div>

				<ul className='space-y-2 tracking-wide mt-8'>
					{menuItems.map((item) => (
						<SidebarItem key={item.path} {...item} />
					))}
				</ul>
			</div>

			<div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
				<button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
					<CiLogout />
					<span className='group-hover:text-gray-700'>Logout</span>
				</button>
			</div>
		</aside>
	);
};
