import Image from 'next/image';

export default function Song({ song }) {
  // all styling is with bootstrap 5.0
  // card class updated adding shadow-sm (bottom shadow to card)
  // card class updated adding h-100 (ensure all cards are the same height)
  // small tag containing artist name updated to text-muted
  // card updated adding badge to ui (if danceaability is greater the 0.6)
  // card updated adding  playlist_genre & playlist_subgenre to ui
  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        {song.album_cover_art_url && (
          <Image
            src={song.album_cover_art_url}
            alt={`Cover art of ${song.track_album_name}`}
            className="card-img-top"
            width={640}
            height={640}
          />
        )}

        <div className="card-body">
          <p className="card-text">{song.track_name}</p>
          
          <small className="text-muted d-flex justify-content-between">{song.track_artist} {song.danceability > 0.6 && (<small className="badge bg-success text-capitalize"> Danceable </small>)}</small> 
        </div>
         {song.playlist_genre && (<div className=" text-dark fw-light text-capitalize list-group-item border-end-0 border-start-0">{song.playlist_genre}</div>)}
          {song.playlist_subgenre && (<div className="text-dark fw-light text-capitalize list-group-item border-end-0 border-start-0">{song.playlist_subgenre}</div>)}
      </div>
      
    </div>
  );
}
