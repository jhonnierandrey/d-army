// this .call .apply .bind

console.log(this);

this.lugar = 'Contexto global';

function saludar(saludo, aQuien){
    console.log(`${saludo} ${aQuien} desde el ${this.lugar}`);
}

//saludar("Hola", "Manu");

const obj = {
    lugar: 'Contexto objeto'
}

// saludar.call(obj, "Hola", "John");
// saludar.call(null, "Hola", "John");
// saludar.call(this, "Hola", "John");
// saludar.apply(obj, ["Adios", "MirCha"]);
// saludar.apply(null, ["Adios", "MirCha"]);
// saludar.apply(this, ["Adios", "MirCha"]);

const persona = {
    nombre : 'John',
    saludar : function() {
        console.log(`Hola ${this.nombre}`);
    }
}

persona.saludar();

const otraPersona = {
    saludar: persona.saludar.bind(persona)
}

otraPersona.saludar();