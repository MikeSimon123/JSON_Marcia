let formUser = document.getElementById("form-usuario")
let tabelaUsuarios = document.getElementById("tabelaUsuarios")

let nome = document.getElementById("nome-usuario");
let email = document.getElementById("email-usuario")
let botaoCadastrar = document.getElementById("botCad")
let botaoCancelar = document.getElementById("botCancel")

let nomeAtual = ""

document.getElementById("formEdicao").addEventListener("reset", function(){
    document.getElementById("edicao").style.display = "none"
    document.getElementById("overlay").style.display = "none"
    document.getElementById("nomeUsuarioAtual").innerHTML = "Usuário em edição: "
})

document.getElementById("formEdicao").addEventListener("submit", function(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    usuarios.forEach(objeto => {
        if(objeto.nomeUsuario == nomeAtual){
            objeto.nomeUsuario = document.getElementById("nomeUsuarioEdicao").value
            objeto.emailUsuario = document.getElementById("emailUsuarioEdicao").value
        }
    })

    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}) 
let idUsuarioEmEdicao = null

formUser.addEventListener("submit", (e) => {
    e.preventDefault()
    let nomeUsuario = document.getElementById("nome-usuario").value;
    let emailUsuario = document.getElementById("email-usuario").value;

    if(nomeUsuario != "" && emailUsuario != ""){
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
    } else {
        window.alert("Preencha os campos completamente antes de cadastrar!")
    }

    
})

function exibirUsuarios(users){
    tabelaUsuarios.innerHTML = "<tr> <th>ID</th> <th>Nome</th> <th>Email</th> <th>Ações</th></tr>"
    users.forEach((usuariosArg, index) => {
        this.linha = document.createElement("tr")
        this.linha.innerHTML = `
            <td>${index + 1 }</td>
            <td>${usuariosArg.nomeUsuario}</td>
            <td>${usuariosArg.emailUsuario}</td>
            <td class='acoes'> <button class='edicao' id='editar${index}'>Editar</button> <button class='excluir' id='excluir${index}'>Excluir</button> </td>
        `
        
        tabelaUsuarios.appendChild(this.linha)

        document.getElementById(`excluir${index}`).addEventListener('click', function(){
                removerUsuario(index)
        })
        document.getElementById(`editar${index}`).addEventListener("click", function(){
            document.getElementById("edicao").style.display = "flex"
            document.getElementById("nomeUsuarioEdicao").value = JSON.parse(localStorage.getItem("usuarios"))[index].nomeUsuario
            document.getElementById("emailUsuarioEdicao").value = JSON.parse(localStorage.getItem("usuarios"))[index].emailUsuario
            document.getElementById("overlay").style.display = "block"
            document.getElementById("nomeUsuarioAtual").innerHTML += JSON.parse(localStorage.getItem("usuarios"))[index].nomeUsuario
            nomeAtual = JSON.parse(localStorage.getItem("usuarios"))[index].nomeUsuario
        })
    })

   //ao carregar mostrar
   //deixar responsivo e colocar css
}

function removerUsuario(index){
    let dados = JSON.parse(localStorage.getItem("usuarios"))
    dados.splice(index, 1)
    localStorage.setItem("usuarios", JSON.stringify(dados))
    exibirUsuarios(JSON.parse(localStorage.getItem("usuarios")))
}

window.addEventListener("load", function(){
    if(localStorage.hasOwnProperty("usuarios")){
        exibirUsuarios(JSON.parse(localStorage.getItem("usuarios")))
    }
})

function createPopUp(){
    let popUp = document.createElement("div")
    
}
