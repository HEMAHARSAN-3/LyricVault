import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Music, Clock, FileText, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { lyricsService } from '../services/lyricsService'

export function Home() {
  const { user } = useAuth()
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSongs() {
      if (!user) return
      try {
        const data = await lyricsService.getUserLyrics(user.uid)
        setSongs(data)
      } catch (error) {
        console.error('Error fetching songs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [user])

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <header className="flex items-center justify-between font-outfit">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text-primary mb-2">My Library</h1>
          <p className="text-interactive opacity-80 text-lg">Your personal collection of lyrics.</p>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
             <div key={i} className="card-base p-6 h-48 animate-pulse bg-border-subtle/20 flex flex-col justify-between">
                <div>
                   <div className="w-3/4 h-6 bg-border-subtle/50 rounded mb-3"></div>
                   <div className="w-1/2 h-4 bg-border-subtle/50 rounded"></div>
                </div>
                <div className="w-1/3 h-4 bg-border-subtle/50 rounded"></div>
             </div>
          ))}
        </div>
      ) : songs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center card-base mt-8">
            <FileText className="w-16 h-16 text-border-subtle mb-6" />
            <h3 className="text-2xl font-bold text-text-primary mb-2">No lyrics found</h3>
            <p className="text-interactive mb-8 max-w-md">You haven't added any lyrics yet. Start your collection by adding your first song.</p>
            <Link to="/add" className="px-6 py-3 bg-interactive text-bg-primary rounded-lg font-medium hover:bg-interactive-hover transition-colors focus-ring">
              Add First Lyric
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
          {songs.map(song => (
            <Link 
              key={song.id} 
              to={`/song/${song.id}`}
              className="card-base p-6 flex flex-col justify-between group h-48 focus-ring relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Music className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-text-primary mb-2 line-clamp-3 group-hover:underline decoration-2 underline-offset-4 leading-tight">{song.title}</h2>
              </div>
              <div className="relative z-10 flex items-center gap-2 mt-4 pt-4 border-t border-border-subtle/50 text-xs text-interactive/70 uppercase tracking-widest font-semibold">
                <Clock className="w-4 h-4" />
                <span>{song.createdAt ? new Date(song.createdAt).toLocaleDateString() : 'Recent'}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
