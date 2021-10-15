const app = new Vue({
    el: '#root',
    data: {
        msg : 'Getting Started with Vue',
        framework : 'Vue',
        language : 'JS',
        htmlcontent : '<button> Start Now </button>'
    },
    methods : {
        details : function(){
            return `Welcome to ${this.framework} ${this.language}`;
        }
    }
})