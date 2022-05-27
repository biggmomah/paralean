const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const bcrypt = require('bcrypt')
// const router = require('./routes/appRoutes')

/* import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";
import bcrypt from 'bcrypt'
import passport from "passport";
import { Strategy } from "passport-local"; */




const passport = require('passport');
const {Strategy} = require('passport-local')

const LocalStrategy = Strategy;


const app = express();
const usuariosDB= ['UsuariosDB']



/* Motor de plantillas */
// Seteamos ejs como motor principal
app.set('view engine', 'ejs')
// Seteamos carpeta de donde va air a buscar los archivos
app.set('views', './views')


// Todo archivo estatico que llamemos estara alojado en nuestra carpeta public
app.use(express.static('./public'))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// app.use('/', router)
app.use(session({
    secret: '123456788!"#$%&/)(',
    resave: false,
    saveUninitialized: false,
    /* cookie:{
        maxAge: 60000
    } */
}))

app.get('/', (req, res)=>{
    res.redirect('/login')
})

app.get('/login', (req, res)=>{
    res.render('login')
})


app.get('/login-error', (req, res)=>{
    res.render('login-error')
})
app.get('/index', (req, res)=>{
    res.render('index', {titulo: "PRUEBAS"})
})

app.get('/registro', (req, res)=>{
    res.render('registro')
})

app.get('/registro-error', (req, res)=>{
    res.render('registro-error')
})

app.get('/datos', (req, res)=>{
    if(req.session.nombre){
        req.session.contador++
        const datosUsuario = usuariosDB.find(element => {return element.nombre == req.session.nombre})
        res.render('datos', {
            datos: datosUsuario,
            contador: req.session.contador
        })

    }

}) 

app.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if(err) return res.json({error: err})
        res.redirect('/login')
    })
})

app.post('/registro', (req, res)=>{
    const {nombre, password, direccion} = req.body
    
    const usuario = usuariosDB.find(element => element.nombre == nombre)

   if(!usuario){
       usuariosDB.push({nombre,password, direccion})
       console.log(usuariosDB)
       res.redirect('/login')
   }else{
       console.log('existe')
       res.redirect('/login')
   }
    
})

app.post('/login', (req, res)=>{
    const {nombre, password} = req.body
    const existeUser = usuariosDB.find(element => element.nombre == nombre)

   if(existeUser){
      req.session.nombre = nombre
      req.session.contador= 0
      res.redirect('/datos') 
   }else{
       console.log('credenciales incorrectas')
       res.redirect('/login-error')
   }
   
})






/* INICIALIZACION SERVIDOR */
const PORT = 8080
const server = app.listen(PORT, ()=>console.log(`Listening port ${PORT}`))
server.on('error', error=>{
    console.log(`error on the server ${error}`)
})


/* app.get('/', (req, res) =>{
    res.render('index', {titulo: 'inicio EJS'})
})

app.get('/servicios', (req, res) =>{
    res.render('servicios', {titulo: 'servicios EJS'})
})

app.use((req,res,next) =>{
    res.status(404).render('404', {titulo: 'Pagina 404', descripcion: 'pagina no encontrada'})
})


app.listen(3030, ()=> console.log('listening port 3030')) */
