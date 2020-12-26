var fullname = 'Carlos Santana';

var person = {
    fullname: 'Francisco Villa',
    other: {
        fullname : 'Miguel Hidalgo'
    },
    getFullName : function() {
        return this.fullname;
    }
};

var getFullName = person.getFullName.bind(person.other);

console.log(getFullName());