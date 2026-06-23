

const munichBounds = [
    [48.0616, 11.3600],
    [48.2481, 11.7229]
];


const map = L.map('map', {
    maxBounds: munichBounds,
    maxBoundsViscosity: 1.0,
    minZoom: 11
}).setView([48.137154, 11.576124], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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
console.log(data[0]);
console.log(newSpot);

map.setView([newSpot.lat, newSpot.lng], 16);

L.marker([newSpot.lat, newSpot.lng])
    .addTo(map)
    .bindPopup(
        
        "<b>New Street Art Spot</b><br>" +
        newSpot.address +
        "Photo:<br>" +
        "<input id='spotPhoto' type='file'><br><br>" +

        "Status:<br>" +
        "<select id='spotStatus'>" +
        "<option>active</option>" +
        "<option>archived</option>" +
        "</select><br><br>" +

        "Description:<br>" +
        "<textarea id='spotDescription' rows='3'></textarea><br><br>" +

        "<button id='saveSpotButton'>Save Spot</button>"
    )
    .openPopup();
const saveSpotButton = document.getElementById("saveSpotButton");

saveSpotButton.addEventListener("click", function () {
const status = document.getElementById("spotStatus").value;
const description = document.getElementById("spotDescription").value;
const photo = document.getElementById("spotPhoto").files[0];
    const savedSpot = {
        address: newSpot.address,
        status: status,
        description: description,
        photo: photo
    };

    console.log(savedSpot);
});   
});
});