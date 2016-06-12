/*
    Fast/simple selector
    $('#id') to get by id
    $('.class') to get by class
    $('name') to get by name

    Separate queries by spaces to get children, e.g
    $('#id .class') to get all elements with class 'class' in element with id 'id'

    Returns array when there are multiple or no results (empty array), or single element
    if querying by id
*/

function $$ (selector, context) {
  context = context || document

  var selectors = selector.split(' ')

  selector = selectors[0]
  var queryType = selector[0]
  var query = selector.substr(1)
  var result
  var iterable = false
  if (queryType === '#') {
    result = context.getElementById(query)
  } else if (queryType === '.') {
    result = context.getElementsByClassName(query).toArray()
    iterable = true
  } else {
    result = context.getElementsByTagName(selector).toArray()
    iterable = true
  }
  if (result === null) return []

  if (selectors.length > 1) {
    result = iterable ? result : [result]
    var newSelector = selectors.slice(1).join(' ')
    var results = []
    result.forEach(function (context) {
      results = results.concat($$(newSelector, context))
    })
    return results
  }

  // if we queried for a single element by id
  if (result.length === 1 && queryType === '#') result = result[0]
  return result
}
