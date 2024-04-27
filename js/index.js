// Create the Guitar class
class Guitar {
  constructor(name) {
    this.name = name;
  }
}

// Create Guitar Service class and connect to API
class GuitarService {
  static url = 'https://662b33c4de35f91de157808d.mockapi.io/bushwahz-dev/guitar-api/brand';

  // Return all guitars from API
  static getAllGuitars() {
    return $.get(this.url);
  }

  // Get a guitar by ID
  static getGuitar(id) {
    return $.get(this.url + `/${id}`);
  }

  // Create guitar
  static createGuitar(guitar) {
    return $.post(this.url, guitar);
  }

  // Update a a guitar on the API
  static updateGuitar(guitar) {
    return $.ajax({
      url: this.url + `/${guitar._id}`, 
      dataType: 'json',
      data: JSON.stringify(guitar),
      contentType: 'application/json',
      type: 'PUT'
    });
  }

  // Delete a guitar
  static deleteGuitar(id) {
    return $.ajax({
      url: this.url + `/${id}`,
      type: 'DELETE'
    });
  }
}

// Create Guitar Request List class
class GuitarRequestList{
  static guitars;

  // Render all example guitars on initial list
  static getAllGuitars() {
    GuitarService.getAllGuitars().then(guitars => this.render(guitars));
  }

  // Create guitar method
  static createGuitar(name) {
    GuitarService.createGuitar(new Guitar(name))
      .then(() => {
        return GuitarService.getAllGuitars();
      })
      .then((guitars) => this.render(guitars));
  }

  // Delete guitar method
  static deleteGuitar(id) {
    GuitarService.deleteGuitar(id)
      .then(() => {
        return GuitarService.getAllGuitars();
      })
      .then((guitars) => this.render(guitars));
  }

  // Render API data to Bootstrap cards with html
  static render(guitars) {
    this.guitars = guitars;
    $('#app').empty();
    for (let guitar of guitars) {
      $('#app').prepend(
        `<div id="${guitar._id}" class="card">
          <div class="card-header">
            <h4>${guitar.name}</h4>
            <button class="btn btn-secondary" onclick="GuitarRequestList.deleteGuitar('${guitar._id}')">Delete</button>
          </div>
        </div><br>`
      );
    }
  }
}

// Create a new guitar on click of main button
$('#create-new-guitar').click(() => {
  GuitarRequestList.createGuitar($('#new-guitar-name').val());
  $('#new-guitar-name').val('');
});

// Run the app
GuitarRequestList.getAllGuitars();