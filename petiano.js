class Petiano {
    
    constructor(user) {
        this.user = user;
    }
}

class ToDo  {
    constructor() {
        
        this.todo = []
    }
    newToDo(user, ...ToDo) {
        let petiano = new Petiano(user)
        this.todo.push({user,ToDo})
        

        return petiano
    }
    get allpetiano() {
        return this.todo

    }
    get numberOfPetianos() {
        return this.todo.length
    }
}

class Done {
    constructor() {
        
        this.done = []
    }
    newToDo(user, ...Done) {
        let petiano = new Petiano(user)
        this.done.push({user,Done})

        return petiano
    }
    get allpetiano() {
        return this.done

    }
    get numberOfPetianos() {
        return this.done.length
    }
}


let petianosToDo = new ToDo()
let petianosDone = new Done()

/*petianosToDo.newToDo("Hallyson N. Fernandes", "- Aulas da monitoria", "- Verificar lista e reunião com professor")
petianosDone.newToDo("hallyson N. Fernandes", "- Monitoria: Terminei a lista de ponteiros", "- Aulas da monitoria")

petianosToDo.newToDo("Jhénifer Matos", "- Bot Discord", "- estudar sobre WordPress para o site", "Reunião Sangue Bom")
petianosDone.newToDo("Jhénifer Matos", "- participei da reunião do pet sangue bom pra definir a função de cada um", "- Estudei Wordpress")

console.log(petianosToDo.allpetiano)

console.log(petianosDone.allpetiano)*/




