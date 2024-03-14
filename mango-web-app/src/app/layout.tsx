import { Outlet } from 'react-router-dom'
import '@/common/config/globals.css'

export default function RootLayout() {
    return (
        <div className="w-full max-w-[70rem] px-4 md:px-8 pt-5 pb-0">
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    )
}
