class PlayerConfigure {
    audioPath= "";
    coverPath = "";

    coverRotatingCycle = 50000;
    BottomLyricsCount =  2;
    TopLyricsCount =  2;

    title = "";
    subTitle = "";
    lyricsText = "";

    constructor(audioPath) {
        this.audioPath = audioPath
    }
}

export default PlayerConfigure;
