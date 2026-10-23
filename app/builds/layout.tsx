export default function BuildsLayout({
	children
}: {children: React.ReactNode}) {
	return (
		<div className="w-full px-4 sm:px-6">
			{ children }
		</div>
	);
}
