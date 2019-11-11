import { createHashHistory } from 'history'

// export default createHashHistory()

export const historyPush = (path) => {
  const history = createHashHistory()
  if (history.location.pathname !== path) history.push(path)
}

export const historyReplace = (path) => {
  // const history = createBrowserHistory()
  console.log('history replace')
  // if (history.location.pathname !== path) history.replace(path)
}