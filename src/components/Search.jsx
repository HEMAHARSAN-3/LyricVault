import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search as SearchIcon, Music, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { lyricsService } from '../services/lyricsService'

export function Search() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [allLyrics, setAllLyrics] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAllUserLyrics() {
      if (!user) return
      try {
        const data = await lyricsService.getUserLyrics(user.uid)
        setAllLyrics(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching lyrics for search:', err)
        setError('Failed to load lyrics for searching.')
        setLoading(false)
      }
    }
    fetchAllUserLyrics()
  }, [user])

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const filtered = allLyrics.filter(lyric => 
      lyric.title.toLowerCase().includes(query.toLowerCase()) ||
      lyric.lyricsText.toLowerCase().includes(query.toLowerCase())
    )
    setResults(filtered)
  }, [query, allLyrics])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary mb-2">Search</h1>
        <p className="text-interactive opacity-80 text-lg mb-8">Find lyrics in your personal collection.</p>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-interactive/50 group-focus-within:text-interactive transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 md:py-5 border-2 border-border-subtle rounded-2xl bg-bg-primary text-text-primary placeholder-interactive/40 focus:outline-none focus:border-text-primary focus:ring-0 transition-colors text-lg font-medium"
            placeholder="Search by title or lyrics content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </header>

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center p-12">
             <Loader2 className="w-8 h-8 animate-spin text-interactive" />
          </div>
        ) : error ? (
           <div className="p-4 bg-interactive text-bg-primary rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
           </div>
        ) : query.length > 0 && results.length === 0 ? (
          <div className="text-center p-16 card-base">
            <SearchIcon className="w-12 h-12 text-border-subtle mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">No results found</h3>
            <p className="text-interactive">We couldn't find anything matching "{query}"</p>
          </div>
        ) : query.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-interactive/60 uppercase tracking-wider mb-4 px-1">
               {results.length} {results.length === 1 ? 'Result' : 'Results'} Found
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {results.map((lyric) => (
                  <Link
                    key={lyric.id}
                    to={`/song/${lyric.id}`}
                    className="card-base p-5 flex items-center gap-6 group focus-ring relative overflow-hidden"
                  >
                     <div className="w-16 h-16 rounded-lg bg-bg-secondary flex items-center justify-center flex-shrink-0 border border-border-subtle group-hover:border-interactive transition-colors">
                        <Music className="w-8 h-8 text-interactive/50 group-hover:text-interactive transition-colors" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-text-primary truncate group-hover:underline decoration-2 underline-offset-4">{lyric.title}</h2>
                        <p className="text-interactive font-medium truncate opacity-60">
                           {lyric.lyricsText.substring(0, 40)}...
                        </p>
                     </div>
                  </Link>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
