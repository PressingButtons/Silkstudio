'use strict';
//the silk namespace
const Silk = (function( ) {

  const CharacterProject = function( name ) {

    let animations = { };
    let colorSets = [ ];

    return {
      export: function( ) {

      },
      newAnimation: function( name ) {
        animations[name] = new Animation( name );
      },
      deleteAnimation: function( name ) {
        delete animations[name];
      }
    }
  }

  const TileMapProject = function( name ) {

    let tileLayers = [ ];
    let width = null;
    let height = null;

    return {
      export : function( ) {

      }
    }

  }

  const Animation = function( name ) {
    this.name = name;
    this.frames = [ ];
  }

  Animation.prototype.addFrame = function( ) {
    this.frames.push(new AnimationFrame( ));
  }

  Animation.prototype.setBody = function( x, y, width, height ) {

  }

  const AnimationFrame = function( ) {
    this.index = this.body = this.script = null;
    this.time = 0; this.hurtboxes = []; this.hitboxes = [];
  }

  AnimationFrame.prototype.setBody = function( x, y, width, height ) {
    this.body = { x: x, y: y, width:width, height: height }
  }

  //AnimationFrame.prototype.

  const SilkBox = function( type, width, height, properties ) {
    this.type = type;
    this.width = width; this.height = height;
    this.properties = properties;
  }

  return {
    Project : {
      CharacterProject: CharacterProject,
      TileMapProject: TileMapProject,
    }
  }

})( );
