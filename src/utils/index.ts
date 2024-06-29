export const getParams = (pathname: string) => {
    return pathname.split("/").at(-1)
}
