export function saveStore (component, key, value) {
  let lilyBlogStore = window.localStorage.__lilyBlog__
  if (!lilyBlogStore) {
    lilyBlogStore = {}
    lilyBlogStore[component] = {}
  } else {
    lilyBlogStore = JSON.parse(lilyBlogStore)
    if (!lilyBlogStore[component]) {
      lilyBlogStore[component] = {}
    }
  }
  lilyBlogStore[component][key] = value
  window.localStorage.__lilyBlog__ = JSON.stringify(lilyBlogStore)
}

export function getStore (component, key, def) {
  let lilyBlogStore = window.localStorage.__lilyBlog__
  if (!lilyBlogStore) {
    return def
  }
  lilyBlogStore = JSON.parse(lilyBlogStore)
  if (!lilyBlogStore[component]) {
    return def
  }
  let ret = lilyBlogStore[component][key]
  return ret || def
}
