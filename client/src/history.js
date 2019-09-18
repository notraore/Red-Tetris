import { createHashHistory } from 'history'

export default createHashHistory()

export const historyPush = (path) => {
  const history = createHashHistory()
  if (history.location.pathname !== path) history.push(path)
}