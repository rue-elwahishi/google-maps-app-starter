var map;
var markers = [];
var infoWindow;
var locationSelect;
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.06338, lng: -118.35808 },
    zoom: 8,
  });
  infoWindow = new google.maps.InfoWindow();
  // displayStores();
  // setOnClickListenter();
  // showStoreMarkers();
}

function searchStores() {
  foundStores = [];
  var zipCode = document.getElementById("zip-code-input").value;
  if (zipCode) {
    stores.forEach(function (store, index) {
      var postal = store.address.postalCode.slice(0, 5);
      if (postal === zipCode) {
        foundStores.push(store);
      }
    });
  }
  displayStores(foundStores);
  showStoreMarkers(foundStores);
  setOnClickListenter();
}

function setOnClickListenter() {
  var elements = document.querySelectorAll(".store-container");
  console.log(elements);
  elements.forEach(function (elem, index) {
    elem.addEventListener("click", function () {
      new google.maps.event.trigger(markers[index], "click");
    });
  });
}
function displayStores(stores) {
  var storeHTML;
  stores.forEach(function (store, index) {
    storeHTML += `<div class="store-container">
    <div class="store-container-background">
      <div class="store-info-container">
        <div class="store-address">
          <span> ${store.addressLines[0]}</span>
          <span>
            ${store.addressLines[1]}
          </span>
        </div>

        <div class="store-phone-number"> ${store.phoneNumber}</div>
      </div>
      <div class="store-number-container">
        <div class="store-number">${index + 1}</div>
      </div>
    </div>
  </div>`;
  });
  document.querySelector(".stores-list").innerHTML = storeHTML;
}
function showStoreMarkers(stores) {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude
    );
    var name = store.name;
    var address = store.addressLines[0];
    createMarker(latlng, address, name, index);
    bounds.extend(latlng);
  });
  map.fitBounds(bounds);
}

function createMarker(latlng, address, name, index) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: `${index + 1}`,
  });
  google.maps.event.addListener(marker, "click", function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}
