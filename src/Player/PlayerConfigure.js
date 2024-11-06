class PlayerConfigure {
    height = 0;
    width = 0;
    audioPath= "";
    coverPath = "";
    title = "";
    subTitle = "";

    coverRotatingCycle = 50000;

    constructor(audioPath) {
        this.audioPath = audioPath
    }
}

export default PlayerConfigure;
