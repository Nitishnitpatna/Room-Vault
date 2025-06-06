
    mapboxgl.accessToken = mapToken

// const n = coordinates.length;
// let lan;
// let lat;
// const mid = (n/2);
// if(n%2!==0){
//     lan = coordinates.slice(0,mid)
//     lat = coordinates.slice(mid+1,n)
// }

// let left = coordinates.slice(0,mid);
// if(n%2===0){
//     if(left%2!==0){
//       lan = coordinates.slice(0,mid-1);
//       lat = coordinates.slice(mid,n);
//     }else{
//         lan = coordinates.slice(0,mid);
//         lat = coordinates.slice(mid+1,n);
//     }
    
// }
    const map = new mapboxgl.Map({
        container: 'map',//Container ID
        center:listing.geometry.coordinates , //[lng,lat]
        zoom:9
    });

// [lan,lat]
    // console.log(coordinates[0]);
// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({color:"red"})
    .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`${listing.title}<h4>Exact location will we provided</h4>`))
    .addTo(map);