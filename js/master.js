// $(function(){

//Declaration des varialbles
let table = document.querySelector('table')
let tb = document.querySelector('tbody')
let td = document.createElement('tr')
let inputs = document.querySelectorAll('.tovalidate')
let submitbtn = document.querySelector('form input[type="submit"]')
let form = document.querySelector('form')
let errorMsg = document.querySelector('.errorMsg')



// 1.Affichage des Users
for(i=0;i<user.length;i++){
  tb.innerHTML += `<tr id=${i}"><td>${user[i].id}</td>
                  <td>${user[i].prenom}</td>
									<td>${user[i].nom}</td>
									<td>${user[i].email}</td>
									<td>${user[i].age}</td>
									<td>${user[i].poste}</td>
									<td>${user[i].tel}</td>
                  <td>${user[i].status}</td>
  								<td>${user[i].pays}</td>
                    <td><button id=${i} class="ui button">edit</button></td>
                  <td><button class="ui button">delete</button></td></tr>`
}



// 2. Ajout des Users
submitbtn.addEventListener('click',(e)=>{
  e.preventDefault();

  do{
    let check

    //recuperation valeurs inputs
    let id = document.querySelector('#id').value
    let nom = document.querySelector('#nom').value
    let prenom = document.querySelector('#prenom').value
    let email = document.querySelector('#email').value
    let age = document.querySelector('#age').value
    let poste = document.querySelector('#poste').value
    let tel =document.querySelector('#tel').value
    let status =document.querySelector('#status').value
    let pays = document.querySelector('#pays').value

    // convesrion de la collection inputs en tableau
    inputs = Array.from(inputs)

    //assignation de la classe error si champ vide
    for(i=0;i<inputs.length;i++){
      if(inputs[i].value==''){
        check = false
        inputs[i].classList.add('error')
        errorMsg.style.color = '#d63838'
        errorMsg.innerText = '* Veuillez remplir les champs obligatoires'
      }else if(!inputs[i].value=='') {
        check = true
        inputs[i].classList.remove('error')
      }
    }

    //Creation nouvel utilisateur si check est OK
    if(check){
          let newUser ={
            id:id,
            nom:nom,
            prenom:prenom,
            email:email,
            age:age,
            poste:poste,
            tel:tel,
            status:status,
            pays:pays
          }
          user.push(newUser)

          tb.innerHTML += `<tr id=""><td>${newUser.id}</td>
                          <td>${newUser.nom}</td>
                          <td>${newUser.prenom}</td>
                          <td>${newUser.email}</td>
                          <td>${newUser.age}</td>
                          <td>${newUser.poste}</td>
                          <td>${newUser.tel}</td>
                          <td>${newUser.status}</td>
                          <td>${newUser.pays}</td>
                          <td><button class="ui button">X</button></td></tr>`

        //Reinitialisation champ du formulaire
        document.querySelector('#age').value = ''
        for(i=0;i<inputs.length;i++){
          inputs[i].value=''

          errorMsg.style.color = '#38d672'
          errorMsg.innerText = 'Enregistré avec succès !'
        }
    }
  }while (check=false)
})

//Suprimmer les Users
table.addEventListener('click',(e)=>{

  let element = e.target.innerText

  //delete
  if(element=='delete'){
    let prompt = confirm("Voulez vous supprimer ?")
    td = e.target.parentNode
    tr = td.parentNode
    if(prompt){
      tr.style.display="none"
    }
  }

  //edit
  if(element=='edit'){

    //   if(element=='edit'){

      let index = e.target.id
    	console.log(user[index])

  //   $name.value = user[index].nom
      document.querySelector('#id').value = user[index].id
      document.querySelector('#nom').value = user[index].nom
      document.querySelector('#prenom').value = user[index].prenom
      document.querySelector('#email').value = user[index].email
      document.querySelector('#age').value = user[index].age
      document.querySelector('#poste').value = user[index].poste
      document.querySelector('#tel').value = user[index].tel
      document.querySelector('#pays').value = user[index].pays
      document.querySelector('#status').value = user[index].status

     btn = document.querySelector('form input[type="submit"]')
    btn.defaultValue = 'Mettre a jour'
  //   console.log(btn)

  //     }
  }
})

// })
