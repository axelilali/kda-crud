$(function(){
  $('#update').hide()

  //loader
  $('tbody').html('<tr class="loader"><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td></tr>'+
                  '<tr class="loader"><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td></tr>'+
                  '<tr class="loader"><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td><td><span></span> </td></tr>')

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
    $userDetails ="<tr><input type='hidden' value='"+user._id+"'><td>"+user.nom+"</td>"
                  +"<td>"+user.prenom+"</td>"
                  +"<td>"+user.email+"</td>"
                  +"<td>"+user.poste+"</td>"
                  +"<td>"+user.numeroTelephone[0]+"</td>"
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

  }).fail((err)=>{

    $('tbody').html('<td style="text-align:center" colspan="8">'+err.status+' '+err.statusText+'<td>')
    
  });
})
