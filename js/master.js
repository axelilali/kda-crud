$(function(){
  $('#update').hide()

  //loader
    $('tbody').html('<tr class="loader"><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td></tr>'+
                    '<tr class="loader"><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td></tr>'+
                    '<tr class="loader"><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><</tr>')

  $clearInputs = ()=>{
    $('.tovalidate, form select, #age').each(function(){
      $(this).val("")
    })
  }

  $formValidation = ()=>{
    $('.tovalidate').each(function(){
      if($(this).val()==''){
        $(this).addClass('error')
        $('.errorMsg').text("*Veuillez remplir les champs obligatoires")
        $('.errorMsg').css({color:'#d63838'})
        $result = false
      }else{
        $(this).removeClass('error')
        $('.errorMsg').text("")
        $result = true
      }
    })
    return $result
  }

  // Get All Users
  $getAllUsers = (data)=>{
    $.each(data,(index,user)=>{
    $userDetails ="<tr><input class='index' type='hidden' value='"+index+"'><input class='_id' type='hidden' value='"+user._id+"'><td>"+user.nom+"</td>"
                  +"<td>"+user.prenom+"</td>"
                  +"<td>"+user.email+"</td>"
                  +"<td>"+user.poste+"</td>"
                  // +"<td>"+user.numeroTelephone[0]+"</td>"
                  +"<td>"+user.estMarie+"</td>"
                  +"<td>"+user.pays+"</td>"
                  +"<td><button class='ui button'>edit</button></td>"
                  +"<td><button class='ui button delete'>delete</button></td></tr>"
      $('tbody').append($userDetails)
    })
  }


  $.ajax({
    url: "http://167.71.45.243:4000/api/employes?api_key=ssvfsex",
    method: "GET",
    dataType:'json'
  }).done((data)=>{
    $('tbody .loader').hide()
    $getAllUsers(data)
    $data = data

  }).fail((err)=>{
    $('tbody').html('<td style="text-align:center" colspan="8">'+err.status+' '+err.statusText+'<td>')
  });




  // Delete & Update
  $('tbody').click(function(e){
    $target = $(e.target)

    if($target[0].innerText=='edit'){
      $('#save').hide()
      $('#update').show()
      $('.errorMsg').text("")

      //get the user index via its hidden field
      $index = $target.parent().siblings('.index').val()
      console.log($data[$index]);

      $('#nom').val($data[$index].nom)
       $('#prenom').val($data[$index].prenom)
       $('#email').val($data[$index].email)
       $('#status').val($data[$index].estMarie)
       $('#pays').val($data[$index].pays)
       $('#poste').val($data[$index].poste)


      // update users
      $('#update').click(function(e){
        e.preventDefault()
        $formValidation()

        $id = $target.parent().siblings('._id').val()
        if($('#status').val()=='true'){
          $status = true
        }else{$status=false}

        if($formValidation()){
          $('tbody').html('<td class="loader" style="text-align:center" colspan="7">Updating ...<td>')

          $.ajax({
            url: "http://167.71.45.243:4000/api/employes/"+$id+"?api_key=ssvfsex",
            method: "PUT",
            data:{
              nom: $('#nom').val(),
              prenom: $('#prenom').val(),
              email:$('#email').val(),
              estMarie: $status,
              pays: $('#pays').val(),
              poste: $('#poste').val()
            }
          }).done((res)=>{
            // console.log(res);

            location.reload()
            $clearInputs()
          }).fail((err)=>{
            $('tbody').html('<td  style="text-align:center" colspan="8">'+err.status+' '+err.statusText+'<td>')
          })
        }else {
          e.preventDefault()
          $('.errorMsg').text("*Veuillez remplir les champs obligatoires")
        }
      })
    }
  })
})
