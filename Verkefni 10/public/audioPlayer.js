
console.log('Hello')
const callButton = document.getElementById('callButton')

const onClick = async () => {
    const audio = document.getElementById('audio')

    setTimeout(() => {
        audio.play()


    },500)

}

callButton.addEventListener('click', onClick)

