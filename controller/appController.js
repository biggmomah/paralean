const usuariosDB= []

export function getLogin(req, res){
    res.render('login')
}

export function postLogin(req, res){
    const {nombre, password} = req.body;


    const existeUsuario = usuariosDB.find(usuario => usuario.nombre == nombre && usuario.password == password);

    console.log(existeUsuario);
    if (!existeUsuario) {
        console.log('credenciales incorrectas')
        res.redirect('/login-error')
    } else {
      req.session.nombre = nombre
      req.session.contador = 0
      
      res.redirect('/datos')
    }
}

export function getRegistro(req, res){
    res.render('registro')
}

export function postRegistro(req, res){
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
}

export function getLoginError(req, res){
    res.render('login-error')
}



export function getDatos(req, res){
    if(req.session.nombre){
        req.session.contador++
        const datosUsuario = usuariosDB.find(element => {return element.nombre == req.session.nombre})
        res.render('datos', {
            datos: datosUsuario,
            contador: req.session.contador
        })
    }else{
        res.redirect('/login')
    }
}

export function getLogout(req, res){
    req.session.destroy(err=>{
        if(err) return res.json({error: err})
        res.redirect('/login')
    })    
}



