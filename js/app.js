function load(){
  // loadElement(test, testTmp, 'testContent')
  // loadElement(projects, projTmp, 'projectsContent')
  // loadElement(images, imgTmp, 'imagesContent')
}

function loadElement(data, template, elementId){
  console.log(data)
  var output = ''
  for(var key in data){

  }
  document.getElementById(elementId).innerHTML = 'this is a test'
}

var test = [
  {content: 'stuff'},
  {content: 'moreStuff'},
  {content: 'evenMoreStuff'}
]

var testTmp = `<li></li>`

var projects = [
  {name: 'one-name', desc: 'one-desc', imgUrl: 'one-img', link: 'one-link', github: 'one-git'},
]

var projTmp = ``

var images = [
  {url: 'url', alt: 'desc'},
]

var imgTmp = ``

document.onload = load()
