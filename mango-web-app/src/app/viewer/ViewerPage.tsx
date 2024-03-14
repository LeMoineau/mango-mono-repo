import useQuery from '@/common/hooks/use-query'
import { useEffect, useRef, useState } from 'react'
import useChapterViewer from '@/common/hooks/use-chapter-viewer'
import useApi from '@shared/hooks/use-api'
import ChapterViewer from '@shared/types/chapterViewer'
import config from '@/common/config/config'
import { SourceName } from '@shared/types/primitives/id'
import useChapterReaderEvents from '@/common/hooks/use-chapter-reader-events'

export default function ViewerPage() {
    const query = useQuery()
    const { data: chapterViewer, fetch } = useApi<ChapterViewer>(
        config.getEnv().MANGO_SCRAPER_API_ENDPOINT
    )
    const { pagesLoaded, selectChapterViewer, loadPage } = useChapterViewer()
    const readerDiv = useRef(null)
    const {} = useChapterReaderEvents(readerDiv)

    const [test, setTest] = useState('')

    useEffect(() => {
        window.addEventListener('scroll', (evt) => {
            console.log('scroll win', evt)
        })
        if (
            query.has('src') &&
            query.has('mangaId') &&
            query.has('chapterId')
        ) {
            fetch(
                `srcs/${query.get('src')}/mangas/${query.get(
                    'mangaId'
                )}/chapters/${query.get('chapterId')}`,
                true
            )
                .then((chapterViewer) => {
                    if (!chapterViewer) {
                        return
                    }
                    selectChapterViewer(
                        query.get('src')! as SourceName,
                        query.get('mangaId')!,
                        query.get('chapterId')!,
                        chapterViewer
                    )
                    loadPage(1)
                    loadPage(2)
                })
                .catch((err: any) => {
                    console.error(err)
                    setTest(err)
                })
        }
    }, [])

    return (
        <>
            <div className="fixed top-0 left-0 w-full flex flex-row justify-between items-center bg-gradient-to-b from-black h-20 p-4">
                <div className="flex flex-col">
                    <h1 className="text-white text-lg font-semibold">
                        {chapterViewer?.title}
                    </h1>
                    <p className="text-white text-sm font-normal">
                        {query.get('src')}
                    </p>
                </div>
            </div>
            {/* <div className="mt-20 px-5 w-full">
                coucou: {test} & {pagesLoaded} & {query.get('src')},
                {query.get('mangaId')},{query.get('chapterId')} &{' '}
                {JSON.stringify(chapterViewer)}
            </div> */}
            <div
                className="flex bg-black flex-col justify-center items-center w-full"
                ref={readerDiv}
                onScroll={(evt) => {
                    console.log('scroll', evt)
                }}
            >
                {pagesLoaded.map((url: string, index: number) => {
                    return (
                        <img
                            key={index}
                            src={url}
                            className="max-w-[800px] w-full"
                        />
                    )
                })}
            </div>
        </>
    )
}
