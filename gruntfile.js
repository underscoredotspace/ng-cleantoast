module.exports = function(grunt) {
  grunt.initConfig({
    jasmine : {
      src : 'dist/*.js',
      options : {
        specs : 'tests/*.js',
        vendor: [
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.4/angular.min.js',
          'https://code.angularjs.org/1.6.4/angular-mocks.js'
        ]
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['toasts', '$timeout']
        }
      },
      build: {
        src: 'src/ng-cleantoast.js',
        dest: 'dist/ng-cleantoast.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('default', ['uglify', 'test']);
};