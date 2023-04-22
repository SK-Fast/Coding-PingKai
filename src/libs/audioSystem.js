let loadedAudios = {}

export const playAudio = async(fileName, config) => {
    const load = await import('audio-loader')
    const play = await import('audio-play')

    let filePath = `/audio/${fileName}`
    let audioFile;

    if (loadedAudios[filePath]) {
        audioFile = loadedAudios[filePath]
    } else {
        const aC = new window.AudioContext()

        audioFile = await load.default(aC, filePath)

        loadedAudios[filePath] = audioFile
    }

    play.default(audioFile, {
        ...config,
        volume: window.vueStore.state.prefs.volume.master
    })

}