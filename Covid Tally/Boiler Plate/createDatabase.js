const { connection } = require('./connector')
const { data } = require('./data')

const refreshAll = async () => {
    await connection.deleteMany({}).then(()=>{
        console.log("deletd Sucessfully")
    })
 // console.log(connection)
    await connection.insertMany(data).then(()=>{
        console.log("Saved to DB")
    })
}
refreshAll()

