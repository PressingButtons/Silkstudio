'use strict';
const fs = require('fs');
const filemanager = ( path, projectFolder ) => {
  let repositories = null; //listing of projects
  //open and read project directory
  fs.readdir( projectFolder, (err, subfolders) => {
    if( err ) throw err;
    repositories = subfolders;
  })

  const create_repository = name => {
    fs.mkdir(path.join(projectFolder, name), err => {
      if( err ) throw err;
      repositories.push(name);
    })
  }

  const extract_repository = name => {

  }

  return {
    get repository_list( ) { return repositories },
    create_repository : create_repository,
    extract_repository: extract_repository,
  }

}
