
export function joinUrl (...urls: string[]) {

    const urlString = urls.join('/').split('/').filter(item => item !== '');

    const trimmedUrls = urlString.map(item => {

        item = item.replace('/', '')

        return item

    })

    const url = "/" + trimmedUrls.join('/');

    return url;

}

export function paramObj (path: string) {

    let pathArr = path.split('/');

    pathArr = pathArr
                .filter(item => item.includes(":"))
                .map(item => item.replace(":", ""))

    return [...pathArr] as const

}