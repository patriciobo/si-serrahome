import { Sidebar } from '../../components/Dashboard/Sidebar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300'>
			<div className='flex w-full h-full'>
				<Sidebar />
				<div className='ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen'>
					<div className='p-10 w-full h-full'>{children}</div>
				</div>
			</div>
		</div>
	);
}
