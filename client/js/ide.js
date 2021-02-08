'use strict';
//requires Jquery full library for ajax
const IDE = (function( ) {

  //namespaces
  let compile = { }, listeners = { }, request = { }, silk = { }, ui = { };

  compile.handlebars = function( hbs, data ) {
    return new Promise(function(resolve, reject) {
      try {
        let template = Handlebars.compile( hbs );
        resolve(template( data ));
      } catch( error ) {
        reject( error )
      }
    });
  }

  //listeners
  listeners.onDocumentClick = function( event ) {

  }

  //requests
  request.resource = function( url ) {
    return new Promise(function(resolve, reject) {
      $.get( url ).done( resolve ).fail( reject );
    });
  }

  request.resources = function( ...urls ) {
    return new Promise(function(resolve, reject) {
      let promises = [];
      urls.forEach(( url ) => {
        promises.push( request.resource( url ))
      });
      Promise.all( promsies ).then( resolve ).catch( reject );
    });
  }

  request.template = function( templateURL, tempateData, insertData ) {
    request.resources( templateURL, templateData )
    .then( hbs => {
      let template = hbs[0], data = Object.assign(hbs[1], insertData );
      return compile.handlebars( template, data );
    }).then( resolve ).catch( reject );
  }


  /*
  const ajax = { };

  ajax.getResource = function( url )  {
    return new Promise(function(resolve, reject) {
      if( !window.jQuery ) reject('No JQuery detected!');
      $.get( url ).done( resolve ).fail( reject );
    });
  }

  ajax.getMultipleResources = function( ...urls ) {
    return new Promise(function(resolve, reject) {
      let promises = [ ];
      urls.forEach((url, i) => {
        promises.push( ajax.getResource( url ))
      });
      Promise.all( promises ).then( resolve ).catch( reject );
    });
  }

  const actions = { };

  actions.AltActions = function( key ) {
    switch( key ) {
      case 'n' : actions.requestNewProject( );
    }
  }

  actions.requestNewProject = function( ) {
    ajax.getMultipleResources('/hbs/prompt.hbs', '/hbs/newProject.hbs')
    .then( ui.setNewProjectPrompt )
    .catch( listeners.onError )
    //.then( hbs => { ui.loadHBS( hbs, 'overpane' ); $('#overpane').addClass('show')})
  }

  const app = { };

  app.createProject = function( projectname ) {
    //create the project object
    //lod the project template
    ui.loadProjectTemplate( projectname );
  }

  app.createGameObject = function( name ) {
    ajax.getMultipleResources('/hbs/charactereditor.hbs')
    .then( hbs => { ui.setChracterEditorTemplate( name, hbs )})
    .catch( listeners.onError );
  }

  const listeners = { };

  listeners.keyboard = function( event ) {
    let original = event.originalEvent;
    if( original.altKey ) actions.AltActions( event.key.toLowerCase());
  }

  listeners.onDocumentClick = function( event ) {
    ui.toggleDropDown( event );
    ui.toggleOverPane( event );
    ui.toggleFolder( event );
    event.stopPropagation( );
  }

  listeners.onError = function( error ) {
    console.error( error );
    alert('Error: ' + error )
  }

  listeners.onFormSubmission = function( event ) {
    event.preventDefault( );
    let formdata = { };
    for( var pair of new FormData(event.target).entries()) { formdata[pair[0]] = pair[1] }
    switch( event.target.id ) {
      case 'newprojectform': app.createProject( formdata.projectname ); break;
    }
    ui.toggleOverPane( 'off' )
  }

  listeners.onLoadProject = function( event ) {
    console.log('load project')
  }

  listeners.onNewProject = function( event ) {
    actions.requestNewProject( );
  }

  listeners.onSaveProject = function( event ) {
    console.log('save project');
  }

  listeners.onTaskBarOption = function( type ) {
    switch (type) {
      case 'GameObject': app.createGameObject( );
    }
  }

  const ui = { };

  ui.loadHBS = function( hbs, targetID, inserts ) {
    let template = Handlebars.compile( hbs );
    let result = template( inserts );
    $(targetID).html( result );
  }

  ui.loadProjectTemplate = function( name ) {
    ajax.getMultipleResources('/hbs/project.hbs')
    .then( hbs => {ui.setProjectTemplate(name, hbs)})
    .catch( listeners.onError );
  }

  ui.setChracterEditorTemplate = function( name, hbs ) {
    let inserts = { objectName: name }
    ui.loadHBS( hbs[0], '#workspace', inserts );
  }

  ui.setNewProjectPrompt = function( data ) {
    let inserts = { name: 'Create New Project', content: data[1] }
    ui.loadHBS( data[0], '#overpane', inserts );
    $('#newprojectform')[0].addEventListener( 'submit', listeners.onFormSubmission )
    $('#overpane').addClass('show');
    $('#newprojectform input').focus();
  }

  ui.setProjectTemplate = function( name, hbs, ...projectdata ) {
    let inserts = {
      name: name,
      folders: [{ folder: 'Scenes'}, {folder:'Objects'}, {folder:'Assets'}, {folder:'Scripts'}]
    }
    ui.loadHBS( hbs[0], '#app-body', inserts );
  }

  ui.toggleDropDown = function( event ) {
    let target = $('.dropdown').has(event.target);
    $('.dropdown').not(target).removeClass('show');
    if( target.length == 0) return;
    $(target).toggleClass('show');
  }

  ui.toggleFolder = function( event ) {
    let target = $('.folder').has( event.target );
    if( target.length == 0 ) return;
    $(event.target).toggleClass('open');
  }

  ui.toggleOverPane = function( event ) {
    if($('#overpane').is( event.target ) || event == 'off' ){
       $('#overpane').removeClass('show');
       $('#overpane').empty();
     }
  }

  //listeners
  $('*').click( listeners.onDocumentClick );
  $(document).keydown( listeners.keyboard );
  $(document).keyup( listeners.keyboard );

  return {
    onNewProject: listeners.onNewProject,
    onLoadProject: listeners.onLoadProject,
    onSaveProject: listeners.onSaveProject,
    onTaskBarOption: listeners.onTaskBarOption,
  }
  */

})( );
