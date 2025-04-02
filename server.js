import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.listen(3000)
app.use(express.json())



// criar um usuario

app.post('/usuarios', async (req, res) =>{

    const users = await prisma.user.create({
        data:{
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })
        
    res.status(201).json(users)
})

// listar usuarios do banco de dados

app.get('/usuarios', async (req, res) =>{

    const allUser = await prisma.user.findMany({

    })

    res.status(200).json(allUser)
})

// editar usuario especifico

app.put('/usuarios/:id', async (req, res) =>{

    const editUser = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(200).json(editUser)

})

// deletar usuario especifico

app.delete('/usuarios/:id', async (req, res) => {

    const userId = req.params.id

    const User = await prisma.user.findUnique({
        where: { id: userId}
    })

    await prisma.user.delete({
        where: {
            id: userId
        },
        
    }),
    
    res.status(200).json({ message: `Usuário deletado com sucesso!`,
        User
     })
})