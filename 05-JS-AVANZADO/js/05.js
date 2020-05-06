/**Clases y prtotipes */

function Playlist(nombre) {
    this.nombre = nombre;
}
Playlist.prototype.play = function() {
    console.log(`Reproduciendo la playlist ${this.nombre}`);
}
Playlist.prototype.eliminar = function() {
    console.log(`Eliminando la playlist ${this.nombre}`);
}
const playList = new Playlist('Rock');
const playList2 = new Playlist('Daft punk');

playList.play();
playlist.eliminar()