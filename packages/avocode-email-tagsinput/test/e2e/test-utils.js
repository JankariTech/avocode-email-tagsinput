const tagsInputFieldSelector = '.tagsinput'
const tagSubmitKeys = [ 'Comma', 'Enter', 'Space' ]
const URL = isDevelopment
  ? 'http://localhost:8080/#/avocode-email-tagsinput'
  : 'https://avocode-email-tagsinput.surge.sh/#/avocode-email-tagsinput'

const getInputText = async (page, inputFieldSelector = tagsInputFieldSelector) => {
  const text = await page.evaluate((selector) => {
    const editor = document.querySelector(selector)

    return editor.textContent
  }, inputFieldSelector)

  return text.trim()
}

const getTagNodes = async (page, inputFieldSelector = tagsInputFieldSelector) => {
  return page.evaluate((selector) => {
    const editor = document.querySelector(selector)
    const tagNodes = editor.querySelectorAll('.tag')

    return Array.from(tagNodes)
      .map((node) => {
        return {
          text: node.textContent.trim(),
          className: node.className,
          html: node.innerHTML,
        }
      })
  }, inputFieldSelector)
}


const getAnchorAndFocus = async (page) => {
  return page.evaluate(() => {
    const selection = window.getSelection()

    return [ selection.anchorOffset, selection.focusOffset ]
  })
}

const addEmailTag = async (page, emailTag, submitKey = 'Comma') => {
  await page.click(tagsInputFieldSelector)
  await page.type(tagsInputFieldSelector, emailTag)
  if (tagSubmitKeys.includes(submitKey)) {
    await page.keyboard.press(submitKey)
  } else {
    throw new Error(`invalid submit key provided. Expected ${
      tagSubmitKeys.toString()}, but found: ${submitKey}`
    )
  }
}

export {
  URL,
  tagsInputFieldSelector,
  addEmailTag,
  getTagNodes,
  getInputText,
  getAnchorAndFocus,
}
