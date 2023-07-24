const resultc = document.getElementById("result")
const input = document.getElementById("input")
const err = document.getElementById("err")
let inputValue = null;
input.addEventListener('input', handlerFunction);
const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const regex = new RegExp(urlRegex)

const animation = [
	{
    transform: "translate(4px)"
  },
  {
    transform: "translate(-4px)"
  },
	{
    transform: "translate(4px)"
  },
];

const animationDuration = {
  duration: 250,
  iterations: 1,
};

function update() {
  document.querySelector('input[type=text]').style.setProperty("--c", "#f02d3a");
}
async function handlerFunction(event) {
  console.log('handlerFunction called'); // check if this message is logged when the user types into the input field
  let inputValue = event.target.value;
	inputValue = inputValue
  console.log(inputValue)
	console.log(inputValue)
	const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
	const options = {
		method: 'POST',
		headers: {
			'content-type': '...',
			'X-RapidAPI-Key': '...',
			'X-RapidAPI-Host': '...'
		},
		body: new URLSearchParams({
			url: inputValue
		})
	};
	if(regex.test(inputValue) == true){
		input.style.outlineColor = "#b8b8ff"
		input.style.backgroundColor = "	hsl(240, 100%, 86%, 0.3)"
		input.style.color = "#b8b8ff"
		try {
			const response = await fetch(url, options);
			const result = await response.json();
			const trueR = (result.result_url);
			err.innerHTML = ""
			resultc.innerHTML = `${trueR}`
		} catch (error) {
			console.error(error);
		}
	}
	else if(regex.test(inputValue) == false){
		input.animate(animation, animationDuration)
		err.animate(animation, animationDuration)
		err.innerHTML = "Must be a valid URL"
		resultc.innerHTML = ""
		input.style.outlineColor = "#f02d3a"
		input.style.backgroundColor = "	hsl(356, 87%, 56%, 0.3)"
		input.style.color = "#f02d3a"
		err.style.color = "#f02d3a"
		update()
	}
}
