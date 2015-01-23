Package.describe({
  name: 'app-errors',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'A pattern to display errors to the user',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.0');
    api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.addFiles(['app-errors.js', 'app-errors_list.html', 'app-errors_list.js'], 'client');

    if(api.export){
        api.export('AppErrors');
    }

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('app-errors');
  api.addFiles('app-errors-tests.js');
});
