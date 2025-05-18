// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function sendResponse(code: number, msg: string, data: any) {
    return {
        code: code,
        msg,
        data,
    };
}
