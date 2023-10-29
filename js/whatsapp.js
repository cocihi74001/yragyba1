$(function() {
  $('.send-message-whatsapp').on('click', 'button', function(e) {
    e.preventDefault();
    if(document.activeElement.id!="send_wa")
      return;
    const $form = $(".send-message-whatsapp");

    const phone = '79113071066';

    // get object i.e {key: 'value'} of form
    let data = {}
    $form.serializeArray().forEach(v => data[v.name] = v.value)

    // make the ?text= payload, 
    // - could use .filter() here too if you dont want empty values
    text = [
      data.people_count,
      data.email,
      data.wpp,
      data.cep,
      data.rua,
      data.bairro,
      data.complemento
    ].join(' - ') // change to what you want sep to be
    text = 'Здраствуйте, хотели бы забронироться на тур. Нас ${people_count}'
    // make the url
    const action = "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
    console.log(action)

	 window.open(action, "_blank");;
  });
});