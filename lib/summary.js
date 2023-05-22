class Summary {
    
    constructor() {
        this.filesCreated = 0;
        this.foldersCreated = 0;
        this.filesChanged = 0;
        this.filesSkipped = 0;
        this.filesIgnored = 0;
    }

    incrementFilesCreated(amount) {
        this.filesCreated += amount;
    }

    incrementFoldersCreated(amount) {
        this.foldersCreated += amount;
    }
    
    incrementFilesChanged(amount) {
        this.filesChanged += amount;
    }

    incrementFilesSkipped(amount) {
        this.filesSkipped += amount;
    }

    incrementFilesIgnored(amount) {
        this.filesIgnored += amount;
    }
}

module.exports = { Summary };