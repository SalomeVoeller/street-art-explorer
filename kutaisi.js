const bounds = L.latLngBounds(
    [42.15, 42.55],
    [42.40, 42.85]
);

const map = L.map('map', {
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
    minZoom: 11
}).setView([42.2679, 42.6946], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
map.setMaxBounds(bounds);
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
const shortAddress =
    data[0].display_name.split(",")[1].trim() + " " +
    data[0].display_name.split(",")[0].trim();

const newSpot = {
    
    address: shortAddress,
    photo: "",
    status: "Active",
    description: "",
    artist: "",
    title: "",
    lat: lat,
    lng: lng
};

console.log(newSpot);

map.setView([newSpot.lat, newSpot.lng], 16);

L.marker([newSpot.lat, newSpot.lng])
    .addTo(map)
    .bindPopup(
        "<b>New Street Art Spot</b><br>" +
        newSpot.address +
        "<br>Status: " + newSpot.status
    )
    .openPopup();
});
});