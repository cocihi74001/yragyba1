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
      
    text = `Здраствуйте, хотели бы забронироться на тур. Нас ${data.people_count} человек.\nДата заезда - ${data.startDate}, дата выезда - ${data.endDate}.\nДней на катере - ${data.boat_count}. Количество электроспинингов - ${data.rod_count}. Часов морской прогулки - ${data.sea_hours_count}. ${document.querySelector('#island_check').checked ? "Тур до острова. " : ""}
    ${document.querySelector('#boat_check').checked ? "Доставка до катера. " : ""} ${document.querySelector('#eda_check').checked ? "Обед-ужин. " : ""}
    ${document.querySelector('#sauna_check').checked ? "Сауна. " : ""} ${document.querySelector('#aero_but').checked ? "Трансфер с аэропорта. " : "Трансфер с жд вокзала или с города"} Примерная стоимость тура - ${days_between(data.startDate, data.endDate) * (document.querySelector('#sauna_check').checked ? 12000: 8000) + data.rod_count*2500 + data.sea_hours_count*2500 + (data.people_count>4?3000:6000) + (data.boat_count*30000) + (document.querySelector('#boat_check').checked ? 500: 0)} рублей`
    // make the url
    const action = "https://wa.me/" + phone + "?text=" + encodeURIComponent(text);
    console.log(action)

	 window.open(action, "_blank");;
  });
});
function days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(new Date(date1) - new Date(date2));

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}