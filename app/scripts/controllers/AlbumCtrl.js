(function() {
    function AlbumCtrl($scope) {
        $scope.albumData = albumPicasso;
        $scope.song = albumPicasso.songs[0];
        
       
    };
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();