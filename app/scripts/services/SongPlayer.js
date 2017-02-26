(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();
          /**
 * @desc Buzz object audio file
 * @type {Object}
 */
         var currentBuzzObject = null;
         
         
 /**
* @desc Default Buzz object volume
* @type {Integer}
*/
         
         var currentVolume = 80;
         
         
         
        
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

                SongPlayer.setVolume(currentVolume);
             
             
                currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
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
         
  /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
        SongPlayer.currentTime = null;        
         
         
         
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
         
 /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
        SongPlayer.setCurrentTime = function(time) {
            
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };         
         
    
          SongPlayer.volume = null;
         
          /**
 * @function setVolume
 * @desc Set Volume
 * @param {Number} int
 */
        SongPlayer.setVolume = function(setVolume) {
            
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(setVolume);
            }
            SongPlayer.volume = currentVolume;

        };         
         
         
         
         
              
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();