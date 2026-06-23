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
const supabaseUrl = "https://aejefukbifnyolukauol.supabase.co";
const supabaseKey = "sb_publishable_r1k5crvDt1xB4niYbAVeCA_Ud2JMl2e";

const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);
async function testSupabase() {

    const { data, error } = await supabaseClient
        .from("spots")
        .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);
}
async function loadSpots() {
    const { data, error } = await supabaseClient
        .from("spots")
        .select("*")
        .eq("city", "Munich");

    if (error) {
        console.log(error);
        return;
    }

    data.forEach(function (spot) {
        const marker = L.marker([spot.lat, spot.lng])
            .addTo(map);

        marker.bindTooltip(
            spot.address + "<br>" +
            "<img src='" + spot.photo_url + "' width='120'>"
        );

        marker.bindPopup(
            "<b>Street Art Spot</b><br>" +
            spot.address +
            "<br>Status: " + spot.status +
            "<br><br><img src='" + spot.photo_url + "' width='200'>"
        );
    });
}
loadSpots(); 
testSupabase();
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

saveSpotButton.addEventListener("click", async function () {
const status = document.getElementById("spotStatus").value;
const description = document.getElementById("spotDescription").value;
const photo = document.getElementById("spotPhoto").files[0];
if (!photo) {
    alert("Please select a photo");
    return;
}

const cleanFileName = photo.name
    .replaceAll(" ", "_")
    .replaceAll("ö", "oe")
    .replaceAll("ä", "ae")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss");

const fileName = Date.now() + "_" + cleanFileName;

const { data: uploadData, error: uploadError } = await supabaseClient.storage
    .from("street-art-photos")
    .upload(fileName, photo);

console.log(uploadData);
console.log(uploadError);

 const publicUrl = supabaseClient.storage
    .from("street-art-photos")
    .getPublicUrl(uploadData.path).data.publicUrl;

console.log(publicUrl);   
const savedSpot = {
    city: "Munich",
    address: newSpot.address,
    status: status,
    description: description,
    lat: newSpot.lat,
    lng: newSpot.lng,
    photo_url: publicUrl
};
const { data: insertData, error: insertError } = await supabaseClient
    .from("spots")
    .insert([savedSpot]);
if (insertError) {
    alert("Spot could not be saved.");
    console.log(insertError);
    return;
}

map.closePopup();
const savedMarker = L.marker([savedSpot.lat, savedSpot.lng])
    .addTo(map);

savedMarker.bindTooltip(
    savedSpot.address + "<br>" +
    "<img src='" + savedSpot.photo_url + "' width='120'>"
);

savedMarker.bindPopup(
    "<b>Street Art Spot</b><br>" +
    savedSpot.address +
    "<br>Status: " + savedSpot.status +
    "<br><br><img src='" + savedSpot.photo_url + "' width='200'>"
);
console.log(insertData);
console.log(insertError);
});   
});
});