// Placeholder manifest file.
// the installer will append this file to the app vendored assets here: vendor/assets/javascripts/spree/backend/all.js'
$(document).ready( function() {
  $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
    var input = $(this).parents('.input-group').find(':text');
    log = numFiles > 1 ? numFiles + ' files selected' : label;
    if( input.length ) {
      input.val(log);
    } else {
      if( log ) alert(log);
    }
  });
});

$(document).on('change', '.btn-file :file', function() {
  var input = $(this);
  numFiles = input.get(0).files ? input.get(0).files.length : 1;
  label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  //input.trigger('fileselect', [numFiles, label]);
  var file_name = $(this).parents('.input-group').find(':text');
  log = numFiles > 1 ? numFiles + ' files selected' : label;
  if( file_name.length ) {
    file_name.val(log);
  } else {
    if( log ) alert(log);
  }
});