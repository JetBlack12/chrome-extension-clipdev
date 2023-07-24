const resultc = document.getElementById("result")
const input = document.getElementById("input")
const btn = document.getElementById("btn")
const err = document.getElementById("err")
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
		try {
			const response = await fetch(url, options);
			const result = await response.json();
			const trueR = (result.result_url);
			console.log(trueR)
			if(trueR == undefined){
				input.animate(animation, animationDuration)
				err.animate(animation, animationDuration)
				err.innerHTML = "Please wait a minute."
				resultc.value = ""
				btn.style.visibility = "hidden"
				input.style.outlineColor = "#f02d3a"
				input.style.backgroundColor = "	hsl(356, 87%, 56%, 0.3)"
				input.style.color = "#f02d3a"
				err.style.color = "#f02d3a"
				update()
			}
			else if(trueR != "undefined"){
				resultc.value = `${trueR}`
				err.innerHTML = ""
				btn.style.visibility = "visible"
				input.style.outlineColor = "#52b788"
				input.style.backgroundColor = "	hsl(152, 41%, 52%, 0.3)"
				input.style.color = "#52b788"
			}

			btn.addEventListener("click", function(){
				resultc.select();
				document.execCommand("copy")
			})
			

		} catch (error) {
			console.error(error);
		}
	}
	else if(regex.test(inputValue) == false){
		input.animate(animation, animationDuration)
		err.animate(animation, animationDuration)
		err.innerHTML = "Must be a valid URL"
		resultc.value = ""
		btn.style.visibility = "hidden"
		input.style.outlineColor = "#f02d3a"
		input.style.backgroundColor = "	hsl(356, 87%, 56%, 0.3)"
		input.style.color = "#f02d3a"
		err.style.color = "#f02d3a"
		update()
	}
}
