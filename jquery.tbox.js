(function($){

  $.widget("ui.tbox", {

    options: {
      leftTab: null,
      topTab: null,
      rightTab: null,
      bottomTab: null,
      centerContent: null
    },

  _create: function(){
    var _this = this;

    // Add tbox class to element.

    // Setup table structure.
    this.$table = $(this.element);
    this.$table.addClass('ui-tbox');

    // Setup rows.
    $.each(['top', 'middle', 'bottom'], function(i, rowPos){
      var $row = $('<tr class="ui-tbox-row ui-tbox-' + rowPos + '-row"></tr>');
      _this.$table.append($row);

      // Setup cells.
      $.each(['left', 'middle', 'right'], function(i, colPos){
        var $cell = $('<td class="ui-tbox-cell ui-tbox-' + colPos + '-cell"></td>').appendTo($row);
      });
    });

    // Add tabs.
    $.each(['left', 'top', 'right', 'bottom'], function(i, tabPos){
      // If side was passed as option, handle there...
      var $body;
      var $header;
      var hasTab = false;

      // Look for body, title in element
      var $tabEl = $('.' + tabPos + '-tab', _this.element);
      if ($tabEl.length){
        hasTab = true;
        $body = $('> .body', $tabEl);
        $header = $('> .header', $tabEl);
        $tabEl.remove();
      }

      var tabOptions = _this.options[tabPos+ 'Tab'];
      if (tabOptions){
        hasTab = true;
      }

      // If there was a tab, add it.
      if (hasTab){
        _this._setTab($.extend({
          pos: tabPos,
          body: $body,
          header: $header
        }, tabOptions));
      }
      else{
        if (tabPos == 'top' || tabPos == 'bottom'){
          $('> .ui-tbox-' + tabPos + '-row', _this.$table).addClass('empty');
        }
        else if (tabPos == 'left' || tabPos == 'right'){
          $('> .ui-tbox-row > .ui-tbox-' + tabPos + '-cell', _this.$table).addClass('empty');
        }
      }
    });
  },

  _setTab: function(options){
    console.log('_setTab', options);

    options = $.extend({
      rotate: 0
    }, options);


    var $cell;
    var vh; // vertical/horizontal
    if (options.pos == 'left' || options.pos == 'right'){
      $cell = $('> .ui-tbox-middle-row > .ui-tbox-' + options.pos + '-cell', this.$table);
      vh = 'v';
    }
    else if (options.pos == 'top' || options.pos == 'bottom'){
      $cell = $('> .ui-tbox-' + options.pos + '-row > .ui-tbox-middle-cell', this.$table);
      vh = 'h';
    }

    // Setup tab container.
    var $container = $('<div class="ui-tbox-tab-container ui-tbox-' + vh + 'tab-container"></div>')
    var $tab = $('<div class="ui-tbox-tab"></div>').appendTo($container);

    // Setup header container.
    var $hc = $('<div class="ui-tbox-header-container"></div>').appendTo($tab);
    $rc = $('<div class="ui-tbox-rotate-container ui-tbox-rotate-' + options.rotate + '"></div>').appendTo($hc);
    $rc.append(options.header)

    // Setup body container.
    var $bc = $('<div class="ui-tbox-body-container"></div>').appendTo($tab);
    $bc.append(options.body);

    $cell.empty();
    $container.appendTo($cell);

  },

  });

})(jQuery);
