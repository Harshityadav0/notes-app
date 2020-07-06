const chalk = require('chalk')
const fs = require('fs')
//Adding an note:
const addNote = (title, body)=> {
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=>note.title===title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}
//To remove a note:
const remNotes = (title)=>    {
    const notes = loadNotes()
    const keepNotes = notes.filter((note)=> note.title !== title)
    if (notes.length > keepNotes.length)    {
        console.log("Note with title : "+ chalk.green(title)+ " removed")
    }   else    {
        console.log("No note with title : "+ chalk.red(title)+ " found")
    }
    saveNotes(keepNotes)
}
//Listing the notes:
const listNotes = ()=>{
    const notes = loadNotes()
    console.log("Your Notes : ")
    notes.forEach((note) => {
        console.log(chalk.bold(note.title))
    })
}
//REading a particular note:
const readnotes = (title)=>  {
    const notes = loadNotes()
    const thenote = notes.find((note)=>note.title===title)
    if(thenote) {
        console.log(chalk.blue.bold(thenote.title))
        console.log("\t" + chalk.green(thenote.body))
    }
}
//SAving the added note:
const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
//loading the note to a vairable:
const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
//exporting functions:
module.exports = {
    addNote: addNote,
    listNotes: listNotes,
    remNotes : remNotes,
    readnotes: readnotes
}