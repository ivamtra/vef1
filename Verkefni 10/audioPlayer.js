const callButton = document.getElementById('callButton')

const onClick = () => {
    const audio = document.getElementById('audio')

    setTimeout(() => {
        audio.play()


    },500)


}

callButton.addEventListener('click', onClick)

