// http://www.sitepoint.com/backbone-basics-models-views-collections-templates/

var Surfboard = Backbone.Model.extend({
  defaults: {
    manufacturer: '',
    model: '',
    stock: 0
  }
});

var board1 = new Surfboard({
  manufacturer: 'Channel Islands',
  model: 'Whip',
  stock: 12
});

$('#board1-manufacturer').html(board1.get('manufacturer'));
$('#board1-model').html(board1.get('model'));
$('#board1-stock').html(board1.get('stock'));

var board2 = new Surfboard({
  manufacturer: 'Lost',
  model: 'Sub Scorcher',
  stock: 9
});

$('#board2-manufacturer').html(board2.get('manufacturer'));
$('#board2-model').html(board2.get('model'));
$('#board2-stock').html(board2.get('stock'));