let formUser = document.getElementById("form-usuario")
let tabelaUsuarios = document.getElementById("tabelaUsuarios")


formUser.addEventListener("submit", (e) => {
    e.preventDefault()
    let nomeUsuario = document.getElementById("nome-usuario").value;
    let emailUsuario = document.getElementById("email-usuario").value;

    console.log(nomeUsuario)
    console.log(emailUsuario)

    let usuarios = []

    if(localStorage.hasOwnProperty("usuarios")){
        usuarios = JSON.parse(localStorage.getItem("usuarios"))
    }

    usuarios.push({nomeUsuario, emailUsuario})
    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    //Atualizar a tabela na tela
    //exibirUsuarios()
    exibirUsuarios(usuarios)

    

    //limpa o formulario
    formUser.reset()
})

function exibirUsuarios(users){
    tabelaUsuarios.innerHTML = "<tr> <th>ID</th> <th>Nome</th> <th>Email</th></tr>"
    users.forEach((usuariosArg, index) => {
        this.linha = document.createElement("tr")
        this.linha.innerHTML = `
            <td>${index + 1 }</td>
            <td>${usuariosArg.nomeUsuario}</td>
            <td>${usuariosArg.emailUsuario}</td>
        `
        
        tabelaUsuarios.appendChild(this.linha)
    })

   //ao carregar mostrar
   //deixar responsivo e colocar css
}

window.addEventListener("load", function(){
    if(localStorage.hasOwnProperty("usuarios")){
        exibirUsuarios(JSON.parse(localStorage.getItem("usuarios")))
    }
})
