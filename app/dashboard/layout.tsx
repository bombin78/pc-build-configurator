export default function DashboardLayout({
    children
}: { children: React.ReactNode}) {
    return (
        <div className="mt-8 w-full px-4 sm:px-6">
            { children }
        </div>
    )
}
