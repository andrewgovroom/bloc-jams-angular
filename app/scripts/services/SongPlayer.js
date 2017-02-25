(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();
          /**
 * @desc Buzz object audio file
 * @type {Object}
 */
         var currentBuzzObject = null;
        
                 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */  
                 
         var setSong = function(song) {
            if (currentBuzzObject) {
                    currentBuzzObject.stop();
                    SongPlayer.currentSong.playing = null;
                }

                currentBuzzObject = new buzz.sound(song.audioUrl, {
                        formats: ['mp3'],
                        preload: true
                });

             SongPlayer.currentSong = song;
         };
         
 
         
  /**
 * @function playSong
 * @desc Plays currently playing currentBuzzObject object and sets song.playing equal to true
 * @param {Object} song
 */         
         var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;
            }
         
         
    /**
 * @function stopSong
 * @desc Stop currently playing currentBuzzObject object and sets song.playing equal to null
 * @param {Object} song
 */         
         var stopSong = function(song){
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
            }       
         
         
         /**
* @desc Gets song index of currently playing song
* @type {Object}
*/ 
         var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
        };                
         
         
 /**
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */
         
         SongPlayer.currentSong = null; 
         
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
                 
  /**        
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */        
         
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
         };
         
    /**        
 * @function previous
 * @desc previous song
 * @param {Object} song
 */           
         
          SongPlayer.previous = function() {
              
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;
               if (currentSongIndex < 0) {
                   stopSong(song);
               
                 } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
          
          
            };
         
         
           /**        
 * @function next
 * @desc next song
 * @param {Object} song
 */           
         
          SongPlayer.next = function() {
              
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;
               if (currentSongIndex >= currentAlbum.songs.length) {
                   stopSong(song);
               
                 } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
                }
          
          
            };
         
         
         
              
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();