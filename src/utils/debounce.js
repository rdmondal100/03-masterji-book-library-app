
export function debounce(fn, delayInSec) {
    let timerId=null;
    return function (...args) {
        clearTimeout(timerId)
        timerId = setTimeout(async() => {
        await fn.call(this, ...args)
        }, delayInSec * 1000);
    }
}