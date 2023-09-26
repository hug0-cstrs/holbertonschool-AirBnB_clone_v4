$(document).ready(function () {
    const nameAmenity = [];
    $('input:checkbox').click(function () {
        if ($(this).is(":checked")) {
            nameAmenity.push($(this).attr('data-name'));
        } else {
            const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
            nameAmenity.splice(nameIndex, 1);
        }
        $('.amenities h4').text(nameAmenity.join(', '));
    });
    $.get("http://0.0.0.0:5001/api/v1/status/", data => {
        if (data.status == "OK") {
            $('div#api_status').addClass("available");
        } else {
            $('div#api_status').removeClass("available");
        }
    });

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      headers: {
          'Content-type': 'application/json'
      },
      success: function (data) {
        data.forEach(function (place) {
          const article = $('<article>');
          article.html(
            `<div class="title_box">
              <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
              </div>
              <div class="number_rooms">
                ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
              </div>
              <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}
              </div>
            </div>
            <div class="description">${place.description}</div>`
          );
          $('section.places').append(article);
        });
      }
    })
});
