class Petiano{
    constructor(name, date){
        this.name = name;
        this.date = date;
        this.toDo = [];
        this.done = [];
    }

    setToDo(toDos){
        this.toDo.push(toDos);
    }

    setDone(dones){
        this.done.push(dones);
    }

    getPetiano(){
        return {
            "nome":`${this.name}`,
            "ToDo":`${this.toDo}`,
            "Done":`${this.done}`,
            "Date":`${this.date}`
        };
    }
}

module.exports = Petiano;


/* petianos = [];


for(i = 0; i < 5; i++){
    data = "18/04/2022";

    petiano = new Petiano(message.user, message.date);

    escreverTodo()
    petiano.setToDo("Aulas da monitoria");
    petiano.setToDo("Aulas da monitoria");

    petiano.setDone("- Monitoria: Terminei a lista de ponteiros", "- Aulas da monitoria");

    petianos.push(petiano.getPetiano());

}

*/