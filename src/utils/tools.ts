/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns 返回Promise，成功resolve(true)，失败reject(Error)
 */
export function copyText(text: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // 现代浏览器 Clipboard API
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => resolve(true))
        .catch(err => reject(new Error(`Clipboard API error: ${err.message}`)))
      return
    }

    // 兼容旧浏览器的实现
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed' // 避免滚动
      textarea.style.opacity = '0' // 透明
      document.body.appendChild(textarea)
      textarea.select()

      const success = document.execCommand('copy')
      document.body.removeChild(textarea)

      success ? resolve(true) : reject(new Error('execCommand copy failed'))
    }
    catch (err) {
      reject(new Error(`Legacy copy error: ${err instanceof Error ? err.message : String(err)}`))
    }
  })
}
