// ------------- Download from URL with JS -------------
// function downloadFile(url, name = 'file', type = 'text/plain') {
//   console.log('downloading....')
//   const anchor = document.createElement('a')
//   anchor.setAttribute('href', url)
//   anchor.setAttribute('download', name)
//   anchor.click()
// }

// ------------- Load JSON with pure JS -------------
// let filepath = 'sussex-emails.json'; 
// ====== async/await method ====== //
export default async function load (url) {
  const res = await fetch(url);
  return await res.json();
}
// load(filepath).then( data => console.log(data) );

// ====== XMLGttpRequest method ====== //
// function loadJSON(url, callback) {
//   var xobj = new XMLHttpRequest();
//   xobj.overrideMimeType("application/json");
//   xobj.open('GET', url, true);
//   xobj.onreadystatechange = () => {
//     if (xobj.readyState == 4 && xobj.status == "200") callback(xobj.responseText);
//   };
//   xobj.send(null);  
// }