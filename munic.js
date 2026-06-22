

const munichBounds = [
    [48.0616, 11.3600],
    [48.2481, 11.7229]
];
const spot1 = {
    name: "Invader Munich",
    address: "Munich",
    lat: 48.1440,
    lng: 11.5580
};
const spot2 = {
    name: "Invader Munich 2",
    lat: 48.137160,
    lng: 11.576124
};

const map = L.map('map', {
    maxBounds: munichBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 11
}).setView([48.137154, 11.576124], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([spot1.lat, spot1.lng])
    .addTo(map)
    .bindPopup(spot1.name + "<br>" + spot1.address);

L.marker([spot2.lat, spot2.lng])
    .addTo(map)
    .bindPopup(spot1.name + "<br>" + spot1.address);
let searchMarker;

const searchButton = document.getElementById("searchButton");
const addSpotButton = document.getElementById("addSpotButton");
searchButton.addEventListener("click", function () {
    const address = document.getElementById("addressInput").value;

    const url = "https://nominatim.openstreetmap.org/search?format=json&q=" + address;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                console.log(data);
    console.log(data.length);
            if (data.length === 0) {
                alert("Address not found");
                return;
            }

            const lat = data[0].lat;
            const lng = data[0].lon;

            map.setView([lat, lng], 16);

            if (searchMarker) {
                map.removeLayer(searchMarker);
            }

            searchMarker = L.marker([lat, lng])
                .addTo(map)
                .bindPopup(data[0].display_name)
                .openPopup();
        });
});
addSpotButton.addEventListener("click", function () {
    const address = document.getElementById("addressInput").value;

    const url = "https://nominatim.openstreetmap.org/search?format=json&q=" + address;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length === 0) {
                alert("Address not found");
                return;
            }

            const lat = data[0].lat;
            const lng = data[0].lon;

            map.setView([lat, lng], 16);

            L.marker([lat, lng])
                .addTo(map)
                .bindPopup("New Street Art Spot<br>" + data[0].display_name)
                .openPopup();
        });
});