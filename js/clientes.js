const formClientes = document.getElementById("cad-cliente")
const cadName = document.getElementById("cad-name")
const cadEmail = document.getElementById("cad-email")
const cadCidade = document.getElementById("cad-cidade")
const cadDate = document.getElementById("cad-nasc")
const clientesTable = document.getElementById("clientes-table")
const overlay = document.getElementById("overlay")
const editForm = document.getElementById("editForm")
const editCancel = document.getElementById("editCancel")
const editEditar = document.getElementById("editEditar")

const editName = document.getElementById("editname")
const editCidade = document.getElementById("editcidade")
const editEmail = document.getElementById("editemail")
const editDate = document.getElementById("editnascimento")

formClientes.addEventListener("submit", function(e){
    e.preventDefault()

    cadastrarUsuario({
        nome: cadName.value,
        email: cadEmail.value,
        cidade: cadCidade.value,
        nascimento: cadDate.value
    })

    atualizarTabelaClientes()
})

function cadastrarUsuario(config){
    let cliente = {
        nome: config.nome,
        email: config.email,
        cidade: config.cidade,
        nascimento: config.nascimento
    }
    if(localStorage.hasOwnProperty("clientes")){
        let atualizado = JSON.parse(localStorage.getItem("clientes"))
        atualizado.push(cliente)
        localStorage.setItem("clientes", JSON.stringify(atualizado))
    }
    else {
        let clientes = []
        clientes.push(cliente)
        localStorage.setItem("clientes", JSON.stringify(clientes))
    }
}

function atualizarTabelaClientes(){
    clientesTable.innerHTML = "<tr> <th>ID</th> <th>Nome</th> <th>Email</th> <th>Cidade</th> <th>Data de Nascimento</th> <th>Ações</th> <tr>"

    let clientes = JSON.parse(localStorage.getItem("clientes"))
    
    for(let index = 0; index < clientes.length; index++){
        let clientes = JSON.parse(localStorage.getItem("clientes"))
        let linha = document.createElement("tr")
        linha.innerHTML = `
            <td>${index}</td>
            <td>${clientes[index].nome}</td>
            <td>${clientes[index].email}</td>
            <td>${clientes[index].cidade}</td>
            <td>${clientes[index].nascimento}</td>
            <td><button class='excluir-cliente'>Excluir</button> <button class='editar-cliente'>Editar</button></td>
        `
        clientesTable.appendChild(linha)
        document.getElementsByClassName("excluir-cliente")[index].onclick = () => {
            clientes.splice(index, 1)
            localStorage.setItem("clientes", JSON.stringify(clientes))
            window.location.reload()
        }
        document.getElementsByClassName("editar-cliente")[index].onclick = () => {
            overlay.style.display = "block"
            editForm.style.display = "flex"
            editName.value = clientes[index].nome
            editCidade.value = clientes[index].cidade
            editEmail.value = clientes[index].email
            editDate.value = clientes[index].nascimento
            localStorage.setItem("clienteEmEdicao", `${index}`)
        }
        
    }
}

function excluirCliente(nome){
    let atualizado = JSON.parse(localStorage.getItem("clientes"))
    let indexA = 0
    atualizado.forEach((cliente, index) => {
        if(cliente.nome == nome){
            indexA = index
        }
    })
    atualizado.splice(indexA, 1)
    localStorage.setItem("clientes", JSON.stringify(atualizado))
    atualizarTabelaClientes()
}

window.addEventListener("DOMContentLoaded", function(){
    atualizarTabelaClientes()
})


editCancel.addEventListener("click", function(){
    overlay.style.display = "none"
    editForm.style.display = "none"
})

editEditar.addEventListener("click", function(){
    overlay.style.display = "none"
    editForm.style.display = "none"
    let indexEdicao = Number(localStorage.getItem("clienteEmEdicao"))
    clientes = JSON.parse(localStorage.getItem("clientes"))
    clientes[indexEdicao].nome = editName.value
    clientes[indexEdicao].cidade = editCidade.value
    clientes[indexEdicao].email = editEmail.value
    clientes[indexEdicao].nascimento = editDate.value

    localStorage.setItem("clientes", JSON.stringify(clientes))    
})