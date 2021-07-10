 // The jQuery Connector
  // ----------------------------------------------------------------------------------------------------

  $.fn.fullCalendar = function(options) {
    var args = Array.prototype.slice.call(arguments, 1) // for a possible method call
    var res = this // what this function will return (the current jQuery object by default)

    this.each(function(i, el) { // loop each DOM element involved
      var $el = $(el)
      var calendar = $el.data('fullCalendar') // get the existing calendar object (if any)
      var singleRes // the returned value of this single method call

      // a method call
      if (typeof options === 'string') {

        if (options === 'getCalendar') {

          if (!i) { // first element only
            res = calendar
          }

        } else if (options === 'destroy') { // don't warn if no calendar object

          if (calendar) {
            calendar.destroy()
            $el.removeData('fullCalendar')
          }

        } else if (!calendar) {

          console.warn('Attempting to call a FullCalendar method on an element with no calendar.')

        } else if ($.isFunction(calendar[options])) {

          singleRes = calendar[options].apply(calendar, args)

          if (!i) {
            res = singleRes // record the first method call result
          }

        } else {
          console.warn("'" + options + "' is an unknown FullCalendar method.")
        }

      // an initialization
      } else {

        if (calendar) {
          console.warn('Can\'t initialize another calendar on the same element.')
        } else {
          calendar = new FullCalendar.Calendar(el, options)
          $el.data('fullCalendar', calendar)
          calendar.render()
        }
      }
    })

    return res
  }