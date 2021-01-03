'use strict';
$(document).ready( event =>{

  //application namespace
  const app = {
    project: { character: {}, tile: {} },
    worker : { },
    ui     : { interface: { }, load: { }, prompt: { }},
  };

  //workers
  //app.worker.image = new Worker('/client/js/imageworker.js');
  //app.worker.image.onmessage = function( message ) {}

  //character projects
  app.project.createNewCharacterProject = function( name ) {
    let project = new Silk.Project.CharacterProject( name );
    app.ui.load.characterInterface( project );
  }

  app.project.createNewTilemapProject = function( name ) {
    let project = new Silk.Project.TilemapProject( name );
    app.ui.load.tilemapInterface( project );
  }

  //Ui namespace methods
  app.ui.interface.setCharacterInterface = project => {
    $('#projectname').html( project.name );
    $('#modifyimage').click( app.ui.prompt.userCharacterImage );
  }

  app.ui.interface.setForm = form => {
    form.addEventListener('submit', event => {
      event.preventDefault( ); $(form).remove();
      app.ui.onsubmit( form );
    })
  }

  app.ui.load.characterInterface = function( project ) {
    $('#main').load('/html/characterUI.html', function( ) {
      app.ui.interface.setCharacterInterface( project );
    })
  }

  app.ui.load.image = function( event ) {
    return new Promise(function(resolve, reject) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function( event ) {
        let i = new Image();
        i.onload = function( event ) {
          let c = document.createElement('canvas'); c.width = i.width; c.height = i.height;
          let ctx = c.getContext('2d');
          ctx.drawImage( i, 0, 0 );
          resolve( ctx.getImageData(0, 0, i.width, i.height ));
        }
        i.src = event.target.result;
      }
      reader.readAsDataURL( file );
    });
  }

  app.ui.onsubmit = form => {
    let data = $(form).serializeArray( );
    if( form.id == 'characterform') app.project.createNewCharacterProject( data[0].value );
  }

  app.ui.onSubmitCharacterForm = event => {
    event.preventDefault( );
    let data = $(event.target).serializeArray( );
    app.project.createNewCharacterProject( data[0].value );
    $('.form').remove();
  }

  app.ui.prompt.characterProjectForm = ( ) => {
    $.get('/html/characterform.html').done( html => {
      $('#main').append(html);
      $('#main').find('form')[0].addEventListener( 'submit', app.ui.onSubmitCharacterForm );
    })
  }

  app.ui.prompt.userCharacterImage = ( ) => {
    $.get('/html/importimage.html').done( html => {
      $('#main').append( html );
      app.ui.interface.setForm(document.getElementById($(html).find('form')[0].id));
      $('form input[name="sourcefile"]').on('change', event => {
        console.log('input file selected');
        app.ui.load.image( event ).then( imagedata => { app.ui.updateCanvas( imagedata,$('#output')[0])})
      })
    });
  }

  app.ui.updateCanvas = function( imagedata, canvas, limit = true ) {
    const ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = false;
    let sizelimit = 500;
    if( !limit ) {
      canvas.width = imagedata.width; canvas.height = imagedata.height;
    } else {
      canvas.width = imagedata.width <= sizelimit ? imagedata.width : sizelimit;
      canvas.height = imagedata.height <= sizelimit ? imagedata.height : sizelimit;
      let ratio = canvas.width / imagedata.width;
      ctx.setTransform( ratio , 0, 0, ratio , 0, 0 );
      console.log( ratio )
    }
    ctx.putImageData( imagedata, 0, 0 );
  }


  //initialize page
  $('*').click( event => {
    $('.dropdown.active').removeClass('active');
    $('#main_menu').is(event.target) ? $('.logo > .dropdown').toggleClass('active') : null;
    $('.dropdown').has(event.target) ? $($(event.target).parent()).addClass('active') : null;
    $('.folder').has(event.target) ? ui.toggleFolder( event );
    $('#nc').is( event.target) ? app.ui.prompt.characterProjectForm( ) : null;
    event.stopPropagation();
  })

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
