const fs = require('fs')
const yargs = require("yargs")
const chalk = require("chalk")

function loadData(){
    const buffer = fs.readFileSync("data.json")
    const data = buffer.toString()
    const dataObj = JSON.parse(data)
    return dataObj
}

function saveData(data){
    fs.writeFileSync("data.json", JSON.stringify(data))
}

function addData(todo, status){
    const data = loadData()
    let id 
    if (data.length === 0){
        id = 1 }
    else id = data[data.length-1].id + 1
    const newTodo = {id:id, todo: todo, status: status}
    data.push(newTodo)
    saveData(data)
}

// List all todo
yargs.command({
    command: "list",
    describe:"Listing all todo",
    handler: function(){
        console.log(chalk.blue("Listing todo"))
        const data = loadData()
        data.forEach(({id, todo, status}) => console.log(`
        id: ${id}
        todo: ${todo}
        status: ${chalk.red(status)}
        `))
    }
})

// Add todo 
yargs.command({
    command: "add",
    describe: "Adding new todo",
    builder: {
        todo: {
            describe: "Todo content",
            demandOption: true,
            type: "string ",
            alias: "t"
        },
        status: {
            describe: "Status of content",
            demandOption: false,
            type: "string",
            alias: "st",
            default: "Incomplete"
        }
    },
    handler: function({todo, status}){
        addData(todo, status)
        console.log(chalk.green.bold("Adding Success!! :D "))
    }
})

// List all incompleted todo
yargs.command({
    command: "list-incomplete",
    describe: "List all incomplete todo",
    handler: function(){
        const data = loadData();
        const incompleteData = data.filter(function(status){
            return status.status.includes("Incomplete")
        })
        incompleteData.forEach(({todo, status}) => console.log(`
        todo: ${todo}
        status: ${chalk.red(status)}
        `))
    }
})

// List all completed todo
yargs.command({
    command: "list-complete",
    describe: "List all complete todo",
    handler: function(){
        const data = loadData();
        const completeData = data.filter(function(status){
            return status.status.includes("Complete")
        })
        completeData.forEach(({todo, status}) => console.log(`
        todo: ${todo}
        status: ${chalk.green(status)}
        `))
    }
})

// Delete todo by id
yargs.command({
    command: "delete",
    describe: "Delete todo by id",
    handler: function(deleteID){
        const data = loadData();
        console.log(data)
        const deletedData = data.filter(function(todoId){
            return !todoId.id.includes(deleteID === data.id)
        })
        console.log(deletedData)
        saveData(deletedData)
    }
})

// Delete all todo
// yargs.command({})

// Delete all completed todo at once
yargs.command({
    command: "delete-complete-all",
    describe: "Delete all complete todo",
    handler: function(){
        const data = loadData();
        const deleteCompleteAll = data.filter(function(status){
            return !status.status.includes("Complete")
        })
        deleteCompleteAll.forEach(({todo, status}) => console.log(`
        todo: ${todo}
        status: ${chalk.green(status)}
        `))
        saveData(deleteCompleteAll);
    }
})

yargs.parse()