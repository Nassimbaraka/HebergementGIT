
const pokemon = 'blastoise';

function poundsToKg(poundsWeight) {
  return poundsWeight / 2.2046;
}

const specificationsWeight = document.querySelector('#specifications-weight');

window.onload = function () {


  fetchName();
  type();
  image();
  categoriepok();


//   evolution(chain);
 
// async function(pokemon){
// document.querySelector('evolution>div')
// .appendChild(<p>pokemon.species.name</p>);
// if (pokemon.evolues_to.length > 0){
//   for (const iterator of pokemon.evolues_to){
//     evolution(iterator);
//   }
// }
// }
//5 * fact(5-1)
//4 * fact(4-1)
//3 * fact(3-1)
//2 * fact(2-1)
//1


}

  const poundsWeight = parseInt(specificationsWeight.textContent);
  console.log({ poundsWeight });
  const kgWeight = Math.round(poundsToKg(poundsWeight) * 100) / 100;
  console.log({ kgWeight });
  specificationsWeight.textContent = `${kgWeight}`;


async function fetchName() {

  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();
  const h1 = document.querySelector('h1');
  h1.textContent = data.name;
  const span = document.createElement('span');

  span.textContent = '#' + data.game_indices[0].game_index;
  h1.appendChild(span);
  // h1.innerHTML = ${data.name} <span>#${data.game_indices[0].game_index}</span>;
}

async function type() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();

  for (const iterator of data.types) {
    const ul = document.querySelector('.type-list');
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add(iterator.type.name);
    btn.textContent = iterator.type.name;
    ul.appendChild(li);
    li.appendChild(btn);
    faiblesse(iterator.type.name);
  }
  for (let i = 0; i < data.stats.length; i++) {

    const classnumber =Math.round((data.stats[i].base_stat*15)/100)
    // console.log(classnumber);
    const classname= data.stats[i].stat.name+ "-" + classnumber
    console.log(classname);
    document.querySelector(".stats").classList.add(classname)
  }
  
  
  }


async function image() {

  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon);
  const data = await response.json();
  const image = document.querySelector(".w-100");
  image.src = data.sprites.other['official-artwork'].front_default;

  const weight = document.querySelector('#specifications-weight');
  weight.textContent= Math.round(poundsToKg(data.weight)) + " kg ";
  console.log(weight);
  
  const height = document.querySelector("strong");
  height.textContent= data.height + '"';
  console.log(height);

  const ability = document.querySelector('#ability');
  ability.textContent = data.abilities[1].ability.name;

}

async function categoriepok(){
  const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon);
  const data = await response.json();
  console.log(data);
  
  const categorie = data.genera[3].genus;
  document.querySelector('.categorie').textContent=categorie
  console.log(categorie);


  const description = data.flavor_text_entries[40].flavor_text
console.log(description);
document.querySelector("#description").textContent=description

const gender = data.gender_rate
if (gender==-1){
  document.querySelector(".bi").textContent="no genre"
}
if (gender == '0'){ 
document.querySelector(".bi").textContent="♂️ "
}
if (gender == 1){ 
document.querySelector(".bi").textContent="♀️"
}
else{
document.querySelector(".bi").textContent="♂️ ♀️ "
}


for (let i = 0; i < data.stats.length; i++) {

  const classnumber =Math.round((data.stats[i].base_stat*15)/100)
  // console.log(classnumber);
  const classname= data.stats[i].stat.name+ "-" + classnumber
  console.log(classname);
  document.querySelector(".stats").classList.add(classname)
}


}

async function faiblesse(qsdfghjkl) {
  const response = await fetch('https://pokeapi.co/api/v2/type/' + qsdfghjkl);
  const data = await response.json();

  for (const iterator of data.damage_relations.double_damage_from) {
    const ul = document.querySelectorAll('.type-list')[1];
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add(iterator.name);
    btn.textContent =  iterator.name;
    ul.appendChild(li);
    li.appendChild(btn);
  }
}
