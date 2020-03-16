//Declaration des varialbles
let tb = document.querySelector('tbody')
let td = document.createElement('tr')
let inputs = document.querySelectorAll('.tovalidate')
let submitbtn = document.querySelector('form input[type="submit"]')
let form = document.querySelector('form')
let errorMsg = document.querySelector('.errorMsg')


// 1.Affichage des Users
for(i=0;i<user.length;i++){
  tb.innerHTML += `<tr><td>${user[i].nom}</td>
									<td>${user[i].prenom}</td>
									<td>${user[i].email}</td>
									<td>${user[i].age}</td>
									<td>${user[i].poste}</td>
									<td>${user[i].numeroTelephone}</td>
                  <td>${user[i].status}</td>
  								<td>${user[i].pays}</td></tr>`
}



// 2. Ajout des Users
submitbtn.addEventListener('click',(e)=>{
  e.preventDefault();

  do{
    let check

    //recuperation valeurs inputs
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

          tb.innerHTML += `<tr><td>${newUser.nom}</td>
                          <td>${newUser.prenom}</td>
                          <td>${newUser.email}</td>
                          <td>${newUser.age}</td>
                          <td>${newUser.poste}</td>
                          <td>${newUser.tel}</td>
                          <td>${newUser.status}</td>
                          <td>${newUser.pays}</td></tr>`

        //Reinitialisation champ du formulaire
        document.querySelector('#age').value = ''
        for(i=0;i<inputs.length;i++){
          inputs[i].value=''
        }
    }

  }while (check=false)

})
