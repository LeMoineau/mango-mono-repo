import ChapterViewer from '@shared/types/chapterViewer'
import axios from 'axios'
import { useRef, useState } from 'react'
import config from '../config/config'
import { ChapterId, MangaId, SourceName } from '@shared/types/primitives/id'

const useChapterViewer = () => {
    const [pagesLoaded, setPagesLoaded] = useState<string[]>([])
    const src = useRef<SourceName>()
    const mangaId = useRef<MangaId>()
    const chapterId = useRef<ChapterId>()
    const chapterViewer = useRef<ChapterViewer>()
    const pages = useRef<{ [key: number]: string }>({})

    const selectChapterViewer = (
        s: SourceName,
        mi: MangaId,
        ci: ChapterId,
        cv: ChapterViewer
    ) => {
        src.current = s
        mangaId.current = mi
        chapterId.current = ci
        chapterViewer.current = cv
    }

    const _arrayBufferToBase64 = (buffer: Buffer) => {
        var binary = ''
        var bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b) => (binary += String.fromCharCode(b)))
        return window.btoa(binary)
    }

    const loadPage = (pageNb: number) => {
        if (
            !chapterViewer.current ||
            !src.current ||
            !mangaId.current ||
            !chapterId.current
        ) {
            return
        }
        if (pageNb <= 0 || pageNb > chapterViewer.current.nbPages) {
            return
        }
        axios
            .get(
                `${config.getEnv().MANGO_SCRAPER_API_ENDPOINT}/srcs/${
                    src.current
                }/mangas/${mangaId.current}/chapters/${
                    chapterId.current
                }/${pageNb}`,
                {
                    responseType: 'arraybuffer',
                }
            )
            .then((imgBuffer: any) => {
                const targetUrl = new URL(
                    chapterViewer.current!.pages[pageNb - 1].url
                ).href
                pages.current[pageNb - 1] = `data:image/${_getImgExtFromURL(
                    targetUrl
                )};base64,${_arrayBufferToBase64(imgBuffer.data)}`
                // URL.createObjectURL(
                //     new Blob([new Uint8Array(imgBuffer.data)], {
                //         type: `image/${_getImgExtFromURL(targetUrl)}`,
                //     })
                // )
                setPagesLoaded(Object.values(pages.current))
            })
    }

    const _getImgExtFromURL = (url: string): string => {
        const res = url.match(/([\w-]+)(\.[\w-]+)+(?!.*\/)/gm)
        if (res && res?.length > 0 && res[0].includes('.')) {
            const ext = res[0].split('.')[1]
            if (ext === 'jpg') {
                return 'jpeg'
            }
            if (ext === 'xml' || ext === 'svg') {
                return 'svg+xml'
            }
            return ext
        }
        return 'jpeg'
    }

    return {
        pagesLoaded,
        selectChapterViewer,
        loadPage,
    }
}

export default useChapterViewer
