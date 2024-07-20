export class SoundPlayer {
	public static playMove() {
		return this.play('move.mp3');
	}

	public static playCapture() {
		return this.play('capture.mp3');
	}

	private static play(filename: string) {
		const audio = new Audio(`static/sounds/${filename}`);
		audio.play();
	}
}
