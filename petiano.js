class Petiano{
    constructor(name, todo, done, date){
        this.name = name;
        this.toDo = todo;
        this.Done = done;
        this.date = date;
    }

    getPetiano(){
        return {
            "Name":`${this.name}`,
            "ToDo":`${this.toDo}`,
            "Done":`${this.Done}`,
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