let loadedAudios = {}

export const playAudio = async(fileName, config) => {
    const load = await import('audio-loader')
    const play = await import('audio-play')

    let filePath = `/audio/${fileName}`
    let audioFile;

    if (loadedAudios[filePath]) {
        audioFile = loadedAudios[filePath]
    } else {
        audioFile = await load.default(`/audio/${fileName}`)

        loadedAudios[filePath]
    }

    play.default(audioFile, {
        ...config,
        volume: window.vueStore.state.prefs.volume.master
    })

}