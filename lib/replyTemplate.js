/**
 * @param  {Array} contents
 * @return {Object} the reply message about flex template
 */
function flexImageCarousel(contents) {
  const replyTemplate = {
    'type': 'flex',
    'altText': 'Pick!',
    'contents': {
      'type': 'carousel',
      'contents': contents,
    },
  };
  return replyTemplate;
}

/**
 * @param  {String} imageUrl the url which image you want to show
 * @param  {String} actionUrl the url which you want to direct after you click.
 * @return {Object} return a image bubble template
 */
function imageBubble(imageUrl, actionUrl) {
  return {
    'type': 'bubble',
    'body': {
      'type': 'box',
      'layout': 'vertical',
      'contents': [
        {
          'type': 'image',
          'url': imageUrl,
          'size': 'full',
          'aspectMode': 'cover',
          'aspectRatio': '2:3',
          'gravity': 'top',
          'action': {
            'type': 'uri',
            'label': 'action',
            'uri': actionUrl,
          },
        },
      ],
      'paddingAll': '0px',
    },
  };
}

module.exports = {
  flexImageCarousel,
  imageBubble,
};
