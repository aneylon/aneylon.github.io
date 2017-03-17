function load(){
  loadElement(projects, projTmp, 'projectsContent')
  loadElement(images, imgTmp, 'imagesContent')
}

function loadElement(data, template, elementId){
  console.log(data)
}

var projects = [
  {name: 'one-name', desc: 'one-desc', imgUrl: 'one-img', link: 'one-link', github: 'one-git'},
]

var projTmp = ``

var images = [
  {url: 'url', alt: 'desc'},
]

var imgTmp = ``

document.onload = load()
