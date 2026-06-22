
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