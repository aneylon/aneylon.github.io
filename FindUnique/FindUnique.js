
document.querySelector('form').addEventListener('click', function(e){
  e.preventDefault()
})

function getUnique() {
  let more = getArrayFromText('#textOne')
  let less = getArrayFromText('#textTwo')

  for(let entry in less){
    if(more[entry]) {
      delete more[entry]
    }
  }

  let result = ''
  for(let entry in more){
    result += entry
    result += '<br>'
  }
  document.querySelector('#results').innerHTML = result
}

function getArrayFromText(element){
  return document.querySelector(element).value
          .split('\n')
          .reduce((acc, cur) => {
            if(cur !== '')
              acc[cur] = cur
            return acc
          }, {})
}
