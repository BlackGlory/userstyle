export function bindClassToSelector(
  classname: string
, selector: () => Iterable<Element>
): () => void {
  handle()

  const observer = onDOMChanged(handle)

  return () => {
    observer.disconnect()
    getElementsByClass(classname)
      .forEach(removeClass(classname))
  }

  function handle() {
    const shouldOnElements = new Set(selector())
    const shouldOffElements =
      getElementsByClass(classname)
        .filter(x => !shouldOnElements.has(x))

    shouldOnElements.forEach(addClass(classname))
    shouldOffElements.forEach(removeClass(classname))
  }
}

function addClass(classname: string): (element: Element) => void {
  return (element: Element) => element.classList.add(classname)
}

function removeClass(classname: string): (element: Element) => void {
  return (element: Element) => element.classList.remove(classname)
}

function getElementsByClass(classname: string): Element[] {
  return toArray(document.getElementsByClassName(classname))
}

function toArray<T>(arrlike: ArrayLike<T>): T[] {
  return Array.from(arrlike)
}

function onDOMChanged(callback: () => void): MutationObserver {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    subtree: true
  , childList: true
  , characterData: true
  , attributes: true
  })
  return observer
}
