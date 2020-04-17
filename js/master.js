$(function(){
  $('#update').hide()

  $clearInputs = ()=>{
    $('.tovalidate, form select, #age').each(function(){
      $(this).val("")
    })
  }

  $formValidation = ()=>{
    if($('form input').val()!=''){
      $validation = true
      $('.errorMsg').text("")

    }
    $('.tovalidate').each(function(){
      if($(this).val()==''){
        $(this).addClass('error')
        $('.errorMsg').text("*Veuillez remplir les champs obligatoires")
        $('.errorMsg').css({color:'#d63838'})
        $validation = false
      }else{
        $(this).removeClass('error')
        // $('.errorMsg').text("")

      }
    })
    return $validation
  }

  // Get All Users
  $getAllUsers = ()=>{
    $.each(users,(index,user)=>{
    $userDetails ="<tr><input type='hidden' value='"+index+"'><td>"+user.id+"</td>"
                  +"<td>"+user.nom+"</td>"
                  +"<td>"+user.prenom+"</td>"
                  +"<td>"+user.email+"</td>"
                  +"<td>"+user.age+"</td>"
                  +"<td>"+user.poste+"</td>"
                  +"<td>"+user.tel+"</td>"
                  +"<td>"+user.status+"</td>"
                  +"<td>"+user.pays+"</td>"
                  +"<td><button class='ui button'>edit</button></td>"
                  +"<td><button class='ui button delete'>delete</button></td></tr>"
      $('tbody').append($userDetails)
    })
  }

  $getAllUsers()

  // save new user
  $('#save').click(function(e){
    e.preventDefault()
    $formValidation()

    if($formValidation()){
      $user ={
        id:$('#id').val(),
        nom:$('#nom').val(),
        prenom:$('#prenom').val(),
        email:$('#email').val(),
        age:$('#age').val(),
        poste:$('#poste').val(),
        tel:$('#tel').val(),
        status:$('#status').val(),
        pays:$('#pays').val(),
      }

      users.push($user)
      $newUser ="<tr><input type='hidden' value='"+((users.length)-1)+"'><td>"+$user.id+"</td>"
                      +"<td>"+$user.nom+"</td>"
                      +"<td>"+$user.prenom+"</td>"
                      +"<td>"+$user.email+"</td>"
                      +"<td>"+$user.age+"</td>"
                      +"<td>"+$user.poste+"</td>"
                      +"<td>"+$user.tel+"</td>"
                      +"<td>"+$user.status+"</td>"
                      +"<td>"+$user.pays+"</td>"
                      +"<td><button class='ui button'>edit</button></td>"
                      +"<td><button class='ui button delete'>delete</button></td></tr>"

      $('tbody').append($newUser)
      $('.errorMsg').text("*Enregistré !")
      $('.errorMsg').css({color:'#38d68a'})
      $clearInputs()
    }
  })

  // Delete & Update
  $('tbody').click(function(e){
    $target = $(e.target)

    if($target[0].innerText=='edit'){
      $('#save').hide()
      $('#update').show()
      $('.errorMsg').text("")

      //get the user index via its hidden field
      $index = $target.parent().siblings('input').val()

      //set input values
      $('#id').val(users[$index].id)
      $('#nom').val(users[$index].nom)
      $('#prenom').val(users[$index].prenom)
      $('#email').val(users[$index].email)
      $('#age').val(users[$index].age)
      $('#poste').val(users[$index].poste)
      $('#tel').val(users[$index].tel)
      $('#status').val(users[$index].status)
      $('#pays').val(users[$index].pays)

      // update users
      $('#update').click(function(e){
        e.preventDefault()

        if ($formValidation()) {
          // if($formValidation){
          users[$index].id = $('#id').val()
          users[$index].nom = $('#nom').val()
          users[$index].prenom = $('#prenom').val()
          users[$index].email = $('#email').val()
          users[$index].age = $('#age').val()
          users[$index].poste = $('#poste').val()
          users[$index].tel = $('#tel').val()
          users[$index].pays = $('#pays').val()
          users[$index].status = $('#status').val()

          $('tbody').html("")
          $getAllUsers()
        }

      })
    }else{
      $('#save').show()
      $('#update').hide()
    }

    //Delete user
    if($target[0].innerText=='delete'){
      $index = $target.parent().siblings('input').val()
      $confirm =confirm("Voulez-vous supprimer cet entrée ?")

      if($confirm){
        $($target).parent().parent().fadeOut()

        // CODE TO DELETE HERE

        users.splice($index,1)
        $('form input').removeClass('error')
        $('tbody').html("")
        $clearInputs()
        $getAllUsers()
      }
    }
  })
})
