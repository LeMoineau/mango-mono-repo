import { useRouteError } from 'react-router-dom'

export default function NotFound() {
    const error = useRouteError()
    console.error(error)

    return (
        <div className="w-full max-w-[70rem] px-4 md:px-8 pt-5 pb-0">
            <main className="flex flex-col justify-center items-center">
                <div className="text-center">page not found</div>
            </main>
        </div>
    )
}
