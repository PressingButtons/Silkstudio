$(document).ready( event =>{
  //initialize page
  $('*').click( event => {
    $('.dropdown.active').removeClass('active');
    $('#main_menu').is(event.target) ? $('.logo > .dropdown').toggleClass('active') : null;
    $('.dropdown').has(event.target) ? $($(event.target).parent()).addClass('active') : null;
    $('#nc').is( event.target) ? promptCharacterForm( ) : null;
    event.stopPropagation();
  })

  const awaitSubmission = html => {
    let form = document.getElementById($(html).find( 'form' )[0].id);
    $(form).find('button[name="deny"]').click( event => {$('.form').remove()});
    form.addEventListener( 'submit', function(event) {
      event.preventDefault();
      $('.form').remove();
      switch (form.id) {
        case 'characterform':
            createCharacterProject( $(form).serializeArray() );
          break;
        default:

      }
    });
  }

  const createCharacterProject = formdata => {
    let name = formdata[0].value;
    loadCharacterTemplate( name );
  }

  const loadCharacterTemplate = (name) => {
    Promise.all([getHTML('/html/characterUI.html'), getHTML('/html/tab.html')]).then( results => {
      initializeCharacterEditor(results[0], name);
      setTab( results[1], name );
      $('#main').append(results[0]);
    });
  }

  const getHTML = ( url, target = null ) => {
    return new Promise(function(resolve, reject) {
      $.get( url ).done( html => {
        if( target ) $(target).append( html );
        resolve(html)
      }).fail( reject );
    });
  }

  const htmlLoadFailure = error => {
    console.error( error );
    alert(`Failure to load html[${error.status}] - ${error.statusText}`);
  }

  const promptCharacterForm = ( ) => {
    $('.dropdown').removeClass('active');
    getHTML('/html/characterform.html', '#main').then( awaitSubmission ).catch( htmlLoadFailure );
  }

  const initializeCharacterEditor = (html,name) => {
    $('#main').empty( );
    $('#main').append( html );
    $('#editor_canvas')[0].width = 600;
    $('#editor_canvas')[0].height = 400;

  }

  const setCharacterProject = function( ) {

  }

  const setTab = ( html, name ) => {
    $('#tabs').append(html);
    $('.tab').removeClass('active');
    let tab = $('#tabs div.tab:last-child');
    $(tab).addClass('active');
    tab.click( event => selectProject( name ) );
    $(tab).find('p')[0].innerHTML = name;
    $($(tab).find('p')[1]).click( event => { closeProject( name )});
  }

});
