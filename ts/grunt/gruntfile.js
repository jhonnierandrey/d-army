module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfit({
        ts : {
            main : {
                src : [],
                dest: 'javascript/'
            }
        }
    })
}