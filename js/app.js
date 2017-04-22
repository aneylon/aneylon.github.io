var modalIsVisible = false
function toggleImgModal() {
  modalIsVisible = !modalIsVisible
  if(modalIsVisible){
    document.getElementById('imgModal').style.display = 'initial'
  } else {
    document.getElementById('imgModal').style.display = 'none'
  }
}

function showImage(img){
  console.log(img)
  document.getElementById('imgModalImg').src = img
  toggleImgModal()
}

function load(){
  loadElement(links, linksTmp, 'headerLinks')
  loadElement(projects, projTmp, 'projectsContent')
  loadElement(images, imgTmp, 'imagesList')
}

function loadElement(data, template, elementId){
  template = _.template(template)
  var output = data.reduce((acc, cur) => {
    acc += template(cur)
    return acc
  }, '')

  document.getElementById(elementId).innerHTML = output
}

var links = [
  {
    url: '#projects',
    text: 'Projects'
  },
  {
    url: 'http://www.github.com/aneylon',
    text: 'Github'
  },
  {
    url: 'http://www.linkedin.com/in/arlenneylon',
    text: 'Linkedin'
  },
  {
    url: 'mailto:arlen.m.neylon@gmail.com',
    text: 'Mail'
  },
  {
    url: '#images',
    text: 'Images'
  },
]

var linksTmp = `
  <li>
    <a href="<%= url %>">
      <%= text %>
    </a>
  </li>`

var projects = [
    {
      url: 'http://things-near-me.herokuapp.com/',
      name: 'Things Near Me',
      thumbnailUrl: 'img/ThingsNearMe_thumb.jpg',
      alt: 'Things Near Me',
      description: 'Post and search events by zipcode.',
      gitUrl: 'http://github.com/aneylon/things-near-me'
    },
    {
      url: 'http://finance-ipsum.herokuapp.com',
      name: 'Finance Ipsum',
      thumbnailUrl: 'img/FinanceIpsum_thumb.jpg',
      alt: 'Finance Ipsum',
      description: 'Generate filler text for your fin-tech mockup.',
      gitUrl: 'http://github.com/aneylon/finance-ipsum'
    },
    {
      url: 'http://arlen-neylon.com/LangApp',
      name: 'Language App',
      thumbnailUrl: 'img/LangApp_thumb.jpg',
      alt: 'Language App',
      description: 'The app that started it all. Vanilla flash card like app for learning vocabulary.',
      gitUrl: 'http://github.com/aneylon/LangApp'
    },
    {
      url: 'http://arlen-neylon.com/learn-to-count',
      name: 'Learn to Count',
      thumbnailUrl: 'img/LearnToCount_thumb.jpg',
      alt: 'Learn to Count',
      description: 'Learning to count in a foriegn language can be a pain. Use this app to help take the edge off.',
      gitUrl: 'http://github.com/aneylon/learn-to-count'
    },
    {
      url: 'http://arlen-neylon.com/color-picker',
      name: 'Color Picker',
      thumbnailUrl: 'img/ColorPicker_thumb.jpg',
      alt: 'Color Picker',
      description: 'Generate random color schemes.',
      gitUrl: 'http://github.com/aneylon/color-picker'
    },
    {
      url: 'http://arlen-neylon.com/dice',
      name: 'Dice Roller',
      thumbnailUrl: 'img/Dice_thumb.jpg',
      alt: 'Dice Roller',
      description: 'Roll any number of dice of any denomination and add a modifier.',
      gitUrl: 'http://github.com/aneylon/dice'
    },

]

var projTmp = `
      <li>
        <a href="<%= url %>">
          <h1><%= name %></h1>
        </a>
        <a href="<%= url %>">
        <img src="<%= thumbnailUrl %>" alt="<%= alt %>">
        </a>
        <p><%= description %></p>
        <a href="<%= gitUrl %>">View the code on Github</a>
      </li>`

var images = [
  {
    imgUrl: 'img/newYear2017.jpg',
    thumbnailUrl: 'img/newYear2017_thumb.jpg',
    alt: 'New Year 2017'
  },
  {
    imgUrl: 'img/SelfPortrait02.jpg',
    thumbnailUrl: 'img/SelfPortrait02_thumb.jpg',
    alt: 'Self Portrait'
  },
  {
    imgUrl: 'img/WesternBG.jpg',
    thumbnailUrl: 'img/WesternBG_thumb.jpg',
    alt: 'Western Background'
  },
  {
    imgUrl: 'img/FoggyThings.png',
    thumbnailUrl: 'img/FoggyThings_thumb.jpg',
    alt: 'Foggy Things'
  },
  {
    imgUrl: 'img/LowPolyPlanet_01.jpg',
    thumbnailUrl: 'img/LowPolyPlanet_01_thumb.jpg',
    alt: 'Low Poly Planet'
  },
]

var imgTmp = `
  <li>
    <img onClick="showImage('<%= imgUrl %>')" src="<%= thumbnailUrl %>" alt="<%= alt %>">
  </li>`

document.onload = load()
