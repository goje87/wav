(function(GLOBAL) {

  app.routerConfig({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
  });

  app.routes([
    {name: 'home', path: '/'},
    {name: 'browse', path: '/b/?:path(*)'},
    {name: 'login', path: '/login'},
    {name: 'logout', path: '/logout'},
    {name: 'albums', path: '/albums'},
    {name: 'newAlbum', path: '/albums/new'},
    {name: 'album', path: '/album/:id'},
    {name: 'songs', path: '/songs'}
  ]);

  // Ask user to login before viewing any pages
  app.on('beforePageRender', function(route) {
    var allowedRoutes = [
      'login', 'logout'
    ];

    // If current route is found in allowed routes, then dont do anything
    if(_.indexOf(allowedRoutes, route.name) >= 0) return true;

    // Check if user is logged in
    app.action('callServerMethod', 'getUserId', function(err, userId) {
      if(err) throw err;

      if(!userId) {
        app.action('redirect', 'login');
      }
    });

    return true;
  });

})(this);
